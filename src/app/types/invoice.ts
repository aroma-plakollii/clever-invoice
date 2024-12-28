import {User} from "@/app/types/user";
import {Client} from "@/app/types/clients";
import {Product} from "@/app/types/product";

export interface Invoice {
    idInvoice?: number;
    invoiceNumber?: string;
    name?: string;
    totalPrice?: number;
    discount?: number;
    paymentStatus?: string;
    dueDatePayment?: Date;
    invoiceDetails?: InvoiceDetails[];
    idUser?: User;
    idClient?: Client;
    idProduct?: Product;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface InvoicePromise {
    success?: boolean
    status?: number;
    message?: string;
    invoice?: Invoice;
    users?: User[];
    clients?: Client[];
    products: Product[],
    invoices?: Invoice[];
    totalPages: number;
}

export interface InvoiceForm {
    success: boolean;
    status: number;
    operation: string;
    users: User[];
    clients?: Client[];
    products: Product[],
}

export interface InvoiceError{
    name?: boolean;
    totalPrice?: boolean;
    quantity?: boolean;
    paymentStatus?: boolean;
    dueDatePayment?: boolean;
    invoiceDetails?: boolean;
    idUser?: boolean;
    idClient?: boolean;
    idProduct?: boolean;
}

export interface InvoiceDetails{
    id: number;
    productId: number | string | undefined;
    productName: string | undefined;
    description: string | undefined;
    quantity: number | string | undefined;
    price: number | string | undefined;
}