'use client';
import { useRouter } from "next/navigation";
import { useHeaders } from "@/app/hooks/useHeaders";
import { passwordReset } from "@/app/api/userService";
import { UserError } from "@/app/types/user";

interface ResetPasswordButtonProps{
    idUser: string | string[];
    password: string | undefined;
    confirmPassword: string | undefined;
    errors: UserError;
    setErrors: React.Dispatch<React.SetStateAction<any>>;
}
export const ResetPasswordButton: React.FC<ResetPasswordButtonProps> = (props) => {
    const router = useRouter();
    const headers = useHeaders();

    const checkErrors = () => {
        const updatedErrors = {
            password: !props.password || props.password !== props.confirmPassword,
            confirmPassword: !props.confirmPassword || props.password !== props.confirmPassword,
            passwordErrorMessage: props.password !== props.confirmPassword ? 'Passwords do not match. Please try again.' : '',
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
            idUser: props.idUser,
            password : props.password
        }

        try {
            const res = await passwordReset(data, headers);
            if(res.status === 404){
                props.setErrors({
                    ...props.errors,
                    emailErrorMessage: res.message
                });
                return;
            }

            router.push('/logIn');
        } catch (error) {
            console.error('Password Reset failed:', error);
        }
    }

    return (
        <button
            type="submit"
            className="block w-full text-center rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            onClick={onSubmit}
        >
            Reset
        </button>
    )
}