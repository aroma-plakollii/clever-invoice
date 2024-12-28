import {User} from "@/app/types/user";

export interface LoginCredentials {
    email?: string;
    password?: string;
}

export interface LogInError{
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
    emailErrorMessage: string;
    errorMessage: string;
}

export interface Auth {
    isAuthenticated: boolean;
    user: User | null;
    token: string | null;
    status: number;
    message: string;
}