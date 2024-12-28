import { Role } from '@/app/types/role';
import {Membership} from "@/app/types/membership";
import {Setting} from "@/app/types/setting";

export interface User {
    idUser?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    status?: string;
    idRole?: Role;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserForm {
    success: boolean;
    status: number;
    operation: string;
    roles: Role[];
}

export interface UserPromise {
    success?: boolean
    status?: number;
    message?: string;
    user?: User;
    membership?: Membership;
    setting?: Setting;
    roles?: Role[];
    users: User[],
    totalPages: number;
}

export interface UserError{
    firstName: boolean,
    lastName: boolean,
    email: boolean,
    password: boolean,
    role: boolean,
    confirmPassword: boolean,
    emailErrorMessage: string,
    passwordErrorMessage: string,
}

export interface ResetPassword {
    idUser: string | string[];
    password?: string;
}