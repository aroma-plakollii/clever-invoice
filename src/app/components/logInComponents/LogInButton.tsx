'use client';
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useAuth } from "@/app/hooks/useAuth";
import { useHeaders } from "@/app/hooks/useHeaders";
import { LoginCredentials, LogInError } from "@/app/types/auth";
import { login } from "@/app/features/users/authSlice";
import { logInUser } from "@/app/api/authService";
import {setGlobal} from "next/dist/trace";

interface LogInButtonProps{
    email: string | undefined;
    password: string | undefined;
    errors: LogInError;
    setErrors: React.Dispatch<React.SetStateAction<any>>;
    setLoading: React.Dispatch<React.SetStateAction<any>>;
}
export const LogInButton: React.FC<LogInButtonProps> = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { isAuthenticated } = useAuth();
    const headers = useHeaders();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    useEffect(() => {
        if (isAuthenticated) {
            router.replace('/dashboard');
        }
    }, [isAuthenticated, router]);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        props.setLoading(true);
        const isEmailValid = props.email ? emailRegex.test(props.email) : false;

        const updatedErrors = {
            email: !props.email || !isEmailValid,
            password: !props.password,
            emailErrorMessage: !isEmailValid ? 'Invalid email format. Please enter a valid email.' : '',
        };

        props.setErrors(updatedErrors);

        if (Object.values(updatedErrors).some(error => error)) {
            props.setLoading(false);
            return;
        }

        const userData: LoginCredentials = {
            email: props.email,
            password: props.password,
        };

        try {
            const res = await logInUser(userData, headers);
            if(res.status === 400){
                props.setErrors({
                    ...props.errors,
                    errorMessage: res.message
                });
                props.setLoading(false);
                return;
            }

            if (res.user && res.token) {
                dispatch(login({
                    user: res.user,
                    token: res.token,
                }));
                router.push('/dashboard');
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    }

    return (
        <button
            type="submit"
            className="block w-full text-center rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            onClick={onSubmit}
        >
            Log in
        </button>
    )
}