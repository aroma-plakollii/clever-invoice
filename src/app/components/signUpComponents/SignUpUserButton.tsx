'use client';
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from 'next/navigation';
import { setUser } from "@/app/features/users/signUpSlice";
import { User, UserError } from "@/app/types/user";
import { Role } from "@/app/types/role";

interface SignUpUserButtonProps{
    user: User | undefined;
    role: Role | undefined;
    confirmPassword: string;
    errors: UserError;
    setErrors: React.Dispatch<React.SetStateAction<any>>;
    setLoading: React.Dispatch<React.SetStateAction<any>>;
}
export const SignUpUserButton: React.FC<SignUpUserButtonProps> = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        props.setLoading(true);
        const isEmailValid = props.user?.email ? emailRegex.test(props.user.email) : false;

        const updatedErrors = {
            firstName: !props.user?.firstName,
            lastName: !props.user?.lastName,
            email: !props.user?.email || !isEmailValid,
            password: !props.user?.password || props.user?.password !== props.confirmPassword,
            confirmPassword: !props.confirmPassword || props.user?.password !== props.confirmPassword,
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
            idRole: props.role
        };

        dispatch(setUser(userData));

        router.push('/signUp/setting');
    }

    return (
        <div className="flex flex-col md:flex-row md:justify-between">
            <Link
                href={"/"}
                onClick={() => props.setLoading(true)}
                className="order-1 md:order-none block w-full md:w-4/12 lg:w-3/12 text-center rounded-md bg-gray-300 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
                Back
            </Link>
            <button
                type="submit"
                className="block w-full mb-4 md:mb-0 md:w-4/12 lg:w-3/12 text-center rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                onClick={onSubmit}
            >
                Continue
            </button>
        </div>
    )
}