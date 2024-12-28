import { API_URL } from "@/app/config";
import {Client, ClientForm, ClientPromise} from "@/app/types/clients";

export const clientGetSingle = async (idClient: number, headers: any): Promise<ClientPromise> => {
    try {
        const res = await fetch(`${API_URL}/clients/${idClient}`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch client.');
    }
};

export const clientGetAll = async (headers: any): Promise<ClientPromise> => {
    try {
        const res = await fetch(`${API_URL}/clients`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch clients.');
    }
};

export const clientGetAllPaged = async (page: number, headers: any): Promise<ClientPromise> => {
    try {
        const res = await fetch(`${API_URL}/clients/paged/${20}/${page}`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch clients.');
    }
};

export const clientCreate = async (data: Client, headers: any): Promise<ClientPromise> => {
    try {
        const res = await fetch(`${API_URL}/clients/create`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to create client.');
    }
};

export const clientUpdate = async (idClient: number, data: Client, headers: any): Promise<ClientPromise> => {
    try {
        const res = await fetch(`${API_URL}/clients/${idClient}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(data)
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to update client.');
    }
};

export const clientDelete = async (idClient: number | undefined, headers: any): Promise<ClientPromise> => {
    try {
        const res = await fetch(`${API_URL}/clients/${idClient}`, {
            method: 'DELETE',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to delete client.');
    }
};

export const getCreateForm = async (headers: any): Promise<ClientForm> => {
    try {
        const res = await fetch(`${API_URL}/clients/create`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch client create form.');
    }
};

export const getUpdateForm = async (headers: any): Promise<ClientForm> => {
    try {
        const res = await fetch(`${API_URL}/clients/update`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch client update form.');
    }
};

export const clientGetAllByUser = async (idUser: number, headers: any): Promise<ClientPromise> => {
    try {
        const res = await fetch(`${API_URL}/clients/user/${idUser}`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch clients.');
    }
};

export const clientGetAllByUserPaged = async (idUser: number, data: any, headers: any): Promise<ClientPromise> => {
    try {
        const res = await fetch(`${API_URL}/clients/user/paged/${idUser}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch clients.');
    }
};