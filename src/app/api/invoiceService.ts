import { API_URL } from "@/app/config";
import { Invoice, InvoiceForm, InvoicePromise } from "@/app/types/invoice";

export const invoiceGetSingle = async (idInvoice: number, headers: any): Promise<InvoicePromise> => {
    try {
        const res = await fetch(`${API_URL}/invoices/${idInvoice}`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch invoice.');
    }
};

export const invoiceGetAll = async (headers: any): Promise<InvoicePromise> => {
    try {
        const res = await fetch(`${API_URL}/invoices`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch invoices.');
    }
};

export const invoiceGetAllPaged = async (page: number, headers: any): Promise<InvoicePromise> => {
    try {
        const res = await fetch(`${API_URL}/invoices/paged/${20}/${page}`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch invoices.');
    }
};

export const invoiceCreate = async (data: Invoice, headers: any): Promise<InvoicePromise> => {
    try {
        const res = await fetch(`${API_URL}/invoices/create`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to create invoice.');
    }
};

export const invoiceUpdate = async (idInvoice: number, data: Invoice, headers: any): Promise<InvoicePromise> => {
    try {
        const res = await fetch(`${API_URL}/invoices/${idInvoice}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(data)
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to update invoice.');
    }
};

export const invoiceDelete = async (idInvoice: number | undefined, headers: any): Promise<InvoicePromise> => {
    try {
        const res = await fetch(`${API_URL}/invoices/${idInvoice}`, {
            method: 'DELETE',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to delete invoice.');
    }
};

export const InvoiceCreateFormGet = async (headers: any): Promise<InvoiceForm> => {
    try {
        const res = await fetch(`${API_URL}/invoices/create`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch invoice create form.');
    }
};

export const InvoiceUpdateFormGet = async (headers: any): Promise<InvoiceForm> => {
    try {
        const res = await fetch(`${API_URL}/invoices/update`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch invoice update form.');
    }
};

export const InvoiceCreateFormGetByUser = async (idUser: number, headers: any): Promise<InvoiceForm> => {
    try {
        const res = await fetch(`${API_URL}/invoices/create/${idUser}`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch invoice create form.');
    }
};

export const InvoiceUpdateFormGetByUser = async (idUser: number, headers: any): Promise<InvoiceForm> => {
    try {
        const res = await fetch(`${API_URL}/invoices/update/${idUser}`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch invoice update form.');
    }
};

export const invoiceGetAllByUser = async (idUser: number, headers: any): Promise<InvoicePromise> => {
    try {
        const res = await fetch(`${API_URL}/invoices/user/${idUser}`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch invoices.');
    }
};

export const invoiceGetAllByUserPaged = async (idUser: number, data: any, headers: any): Promise<InvoicePromise> => {
    try {
        const res = await fetch(`${API_URL}/invoices/user/paged/${idUser}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch invoices.');
    }
};

export const invoiceGetAllByClient = async (idClient: number, headers: any): Promise<InvoicePromise> => {
    try {
        const res = await fetch(`${API_URL}/invoices/client/${idClient}`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch invoices.');
    }
};

export const invoiceGetAllByClientPaged = async (idClient: number, data: any, headers: any): Promise<InvoicePromise> => {
    try {
        const res = await fetch(`${API_URL}/invoices/client/paged/${idClient}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch invoices.');
    }
};