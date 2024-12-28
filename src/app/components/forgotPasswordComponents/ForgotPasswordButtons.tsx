'use client';
import { useRouter } from "next/navigation";
import { useHeaders } from "@/app/hooks/useHeaders";
import { resetPasswordEmailSend } from "@/app/api/userService";
import { LogInError } from "@/app/types/auth";
import Link from "next/link";

interface ForgotPasswordButtonProps{
    email: string | undefined;
    errors: LogInError;
    setErrors: React.Dispatch<React.SetStateAction<any>>;
}
export const ForgotPasswordButton: React.FC<ForgotPasswordButtonProps> = (props) => {
    const router = useRouter();
    const headers = useHeaders();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const checkErrors = () => {
        const isEmailValid = props.email ? emailRegex.test(props.email) : false;

        const updatedErrors = {
            email: !props.email || !isEmailValid,
            emailErrorMessage: isEmailValid ? '' : 'Invalid email format. Please enter a valid email.',
            errorMessage: '',
        };

        props.setErrors(updatedErrors);

        return Object.values(updatedErrors).some(error => error);
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (checkErrors()) {
            return;
        }

        const data = {
            email : props.email
        }

        try {
            const res = await resetPasswordEmailSend(data, headers);
            if(res.status === 404){
                props.setErrors({
                    ...props.errors,
                    errorMessage: res.message
                });
                return;
            }

            router.push('/logIn');
        } catch (error) {
            console.error('Login failed:', error);
        }
    }

    return (
        <div className="flex flex-col md:flex-row md:justify-between">
            <Link
                href={"/logIn"}
                className="order-1 md:order-none block w-full md:w-4/12 lg:w-3/12 text-center rounded-md bg-gray-300 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
                Back
            </Link>
            <button
                type="submit"
                className="block w-full mb-4 md:mb-0 md:w-4/12 lg:w-3/12 text-center rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                onClick={onSubmit}
            >
                Send
            </button>
        </div>
    )
}