'use client';
import { useRouter } from "next/navigation";
import { userUpdate } from "@/app/api/userService";
import { User, UserError } from "@/app/types/user";
import Link from "next/link";
import {useEffect, useState} from "react";

interface UserUpdateButtonsProps{
    user: User | undefined;
    confirmPassword: string;
    showChangePassword: boolean;
    setShowChangePassword: React.Dispatch<React.SetStateAction<any>>;
    errors: UserError;
    setErrors: React.Dispatch<React.SetStateAction<any>>;
    setLoading: React.Dispatch<React.SetStateAction<any>>;
    headers: Record<string, string>;
}

export const UserUpdateButtons : React.FC<UserUpdateButtonsProps> = (props) => {
    const router = useRouter();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const id = Number(props.user?.idUser);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        props.setLoading(true);
        const isEmailValid = props.user?.email ? emailRegex.test(props.user.email) : false;

        const updatedErrors = {
            firstName: !props.user?.firstName,
            lastName: !props.user?.lastName,
            email: !props.user?.email || !isEmailValid,
            password: props.showChangePassword && (!props.user?.password),
            role: !props.user?.idRole,
            confirmPassword: props.showChangePassword && (!props.confirmPassword || props.user?.password !== props.confirmPassword),
            emailErrorMessage: !isEmailValid ? 'Invalid email format. Please enter a valid email.' : '',
            passwordErrorMessage: props.showChangePassword && (props.user?.password !== props.confirmPassword ? 'Passwords do not match. Please try again.' : ''),
        };

        props.setErrors(updatedErrors);

        if (Object.values(updatedErrors).some(error => error)) {
            props.setLoading(false);
            return;
        }

        const userData = {
            firstName: props.user?.firstName,
            lastName: props.user?.lastName,
            email: props.user?.email,
            password: props.user?.password,
            status: props.user?.status,
            idRole: props.user?.idRole
        };

        try {
            const res = await userUpdate(id, userData, props.headers);

            if(res && props.user?.idRole?.name === "client"){
                setSubmitted(true);
                setTimeout(() => {
                    setSubmitted(false);
                }, 1000);
                props.setLoading(false);
                props.setShowChangePassword(false);
            }
            if(res && props.user?.idRole?.name === "admin"){
                router.push('/users');
            }
        }catch (error){
            console.error('User registration failed', error)
        }
    }

    return (
        <div className="flex flex-col items-start sm:flex sm:flex-col sm:items-start xl:flex-row xl:justify-between xl:items-center">
            <p onClick={() => props.setShowChangePassword(!props.showChangePassword)}
               className="text-xs sm:text-sm text-black font-bold underline mt-2.5 mb-3 xl:mb-0 cursor-pointer">
                {props.showChangePassword ? 'Cancel password change' : 'Change password'}
            </p>
            <div className="flex flex-col sm:flex-row sm:justify-end w-full xl:w-8/12">
                {props.user?.idRole?.name === "admin" &&
                    <Link href={"/users"}  onClick={() => props.setLoading(true)}
                          className="order-1 sm:order-none w-full sm:w-6/12 xl:w-3/12 mr-0 sm:mr-2">
                        <button
                            className="w-full h-10 rounded-md bg-gray-400 hover:bg-gray-500 text-sm font-medium text-white">
                            Cancel
                        </button>
                    </Link>
                }
                <button
                    onClick={onSubmit}
                    type="submit"
                    className="w-full sm:w-6/12 xl:w-3/12 h-10 rounded-md bg-black hover:bg-gray-900 px-7 mb-2 sm:mb-0 text-sm font-medium text-white">
                    {submitting ? (
                        <span>Edit</span>
                    ) : submitted ? (
                        <span>&#10003;</span>
                    ) : (
                        <span>Edit</span>
                    )}
                </button>
            </div>
        </div>
    )
}