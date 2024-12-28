'use client';
import { useRouter } from "next/navigation";
import { registerUser } from "@/app/api/userService";
import { User, UserError } from "@/app/types/user";
import Link from "next/link";

interface UserCreateButtonsProps{
    user: User | undefined;
    confirmPassword: string;
    errors: UserError;
    setErrors: React.Dispatch<React.SetStateAction<any>>;
    setLoading: React.Dispatch<React.SetStateAction<any>>;
    headers: Record<string, string>;
}

export const UserCreateButtons : React.FC<UserCreateButtonsProps> = (props) => {
    const router = useRouter();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        props.setLoading(true);
        const isEmailValid = props.user?.email ? emailRegex.test(props.user.email) : false;

        const updatedErrors = {
            firstName: !props.user?.firstName,
            lastName: !props.user?.lastName,
            email: !props.user?.email || !isEmailValid,
            password: !props.user?.password || props.user?.password !== props.confirmPassword,
            confirmPassword: !props.confirmPassword || props.user?.password !== props.confirmPassword,
            role: !props.user?.idRole,
            emailErrorMessage: !isEmailValid ? 'Invalid email format. Please enter a valid email.' : '',
            passwordErrorMessage: props.user?.password !== props.confirmPassword ? 'Passwords do not match. Please try again.' : '',
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
            status: 'pending',
            idRole: props.user?.idRole
        };

        try {
            const res = await registerUser(userData, props.headers);

            if(res){
                router.push('/users');
            }
        }catch (error){
            console.error('User registration failed', error)
        }
    }

    return (
        <div className="flex flex-col sm:flex-row sm:justify-end">
            <Link href={"/users"} onClick={() => props.setLoading(true)}
                  className="order-1 sm:order-none w-full sm:w-3/12 xl:w-2/12 mr-0 sm:mr-2">
                <button
                    className="w-full py-2 rounded-md bg-gray-400 hover:bg-gray-500 text-sm font-medium text-white">
                    Cancel
                </button>
            </Link>
            <button
                onClick={onSubmit}
                type="submit"
                className="w-full sm:w-3/12 xl:w-2/12 rounded-md bg-black hover:bg-gray-900 px-7 py-2 mb-2 sm:mb-0 text-sm font-medium text-white">
                Add
            </button>
        </div>
    )
}