import {User} from "@/app/types/user";

export interface Client {
    idClient?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    idUser?: User;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ClientPromise {
    success?: boolean
    status?: number;
    message?: string;
    client?: Client;
    users?: User[];
    clients: Client[],
    totalPages: number;
}

export interface ClientForm {
    success: boolean;
    status: number;
    operation: string;
    users: User[];
}

export interface ClientError{
    firstName: boolean;
    lastName: boolean;
    email: boolean;
    phone: boolean;
    emailErrorMessage: string;
}