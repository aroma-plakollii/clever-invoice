import { API_URL } from "@/app/config";
import { Product, ProductForm, ProductPromise } from "@/app/types/product";
import {ClientPromise} from "@/app/types/clients";

export const productGetSingle = async (idProduct: number, headers: any): Promise<ProductPromise> => {
    try {
        const res = await fetch(`${API_URL}/products/${idProduct}`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch product.');
    }
};

export const productGetAll = async (headers: any): Promise<ProductPromise> => {
    try {
        const res = await fetch(`${API_URL}/products`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch products.');
    }
};

export const productGetAllPaged = async (page: number, headers: any): Promise<ProductPromise> => {
    try {
        const res = await fetch(`${API_URL}/products/paged/${20}/${page}`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch products.');
    }
};

export const productCreate = async (data: Product, headers: any): Promise<ProductPromise> => {
    try {
        const res = await fetch(`${API_URL}/products/create`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to create product.');
    }
};

export const productUpdate = async (idProduct: number, data: Product, headers: any): Promise<ProductPromise> => {
    try {
        const res = await fetch(`${API_URL}/products/${idProduct}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(data)
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to update product.');
    }
};

export const productDelete = async (idProduct: number | undefined, headers: any): Promise<ProductPromise> => {
    try {
        const res = await fetch(`${API_URL}/products/${idProduct}`, {
            method: 'DELETE',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to delete product.');
    }
};

export const getCreateForm = async (headers: any): Promise<ProductForm> => {
    try {
        const res = await fetch(`${API_URL}/products/create`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch product create form.');
    }
};

export const getUpdateForm = async (headers: any): Promise<ProductForm> => {
    try {
        const res = await fetch(`${API_URL}/products/update`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch product update form.');
    }
};

export const productGetAllByUser = async (idProduct: number, headers: any): Promise<ProductPromise> => {
    try {
        const res = await fetch(`${API_URL}/products/user/${idProduct}`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch products.');
    }
};

export const productGetAllByUserPaged = async (idProduct: number, data: any, headers: any): Promise<ProductPromise> => {
    try {
        const res = await fetch(`${API_URL}/products/user/paged/${idProduct}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch products.');
    }
};