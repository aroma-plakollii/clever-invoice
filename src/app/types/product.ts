import {User} from "@/app/types/user";

export interface Product {
    idProduct?: number;
    name?: string;
    description?: string;
    price?: number | string;
    idUser?: User;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface ProductPromise {
    success?: boolean
    status?: number;
    message?: string;
    product?: Product;
    users?: User[];
    products: Product[],
    totalPages: number;
}

export interface ProductForm {
    success: boolean;
    status: number;
    operation: string;
    users: User[];
}

export interface ProductError{
    name: boolean;
    description: boolean;
    price: boolean;
}