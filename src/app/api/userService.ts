import {API_URL } from "@/app/config";
import { SignUp } from "@/app/types/signUp";
import { ResetPassword, User, UserForm, UserPromise } from "@/app/types/user";
import { LoginCredentials } from "@/app/types/auth";

export const userSignUp = async (data: any, headers: any): Promise<UserPromise> => {
    try {
        const res = await fetch(`${API_URL}/users/signup`, {
            method: 'POST',
            body: data
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to signup user.');
    }
};

export const userGetSingle = async (idUser: number, headers: any): Promise<UserPromise> => {
    try {
        const res = await fetch(`${API_URL}/users/${idUser}`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch user.');
    }
};

export const userGetAll = async (headers: any): Promise<UserPromise> => {
    try {
        const res = await fetch(`${API_URL}/users`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch users.');
    }
};

export const userGetAllPaged = async (page: number, headers: any): Promise<UserPromise> => {
    try {
        const res = await fetch(`${API_URL}/users/paged/${20}/${page}`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch users.');
    }
};

export const registerUser = async (data: User, headers: any): Promise<UserPromise> => {
    try {
        const res = await fetch(`${API_URL}/users/register`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to create user.');
    }
};

export const userUpdate = async (idUser: number, data: User, headers: any): Promise<UserPromise> => {
    try {
        const res = await fetch(`${API_URL}/users/${idUser}`, {
            method: 'PUT',
            headers,
            body: JSON.stringify(data)
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to update user.');
    }
};

export const userDelete = async (idUser: number | undefined, headers: any): Promise<UserPromise> => {
    try {
        const res = await fetch(`${API_URL}/users/${idUser}`, {
            method: 'DELETE',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to delete user.');
    }
};

export const userCreateFormGet = async (headers: any): Promise<UserForm> => {
    try {
        const res = await fetch(`${API_URL}/users/create`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch user create form.');
    }
};

export const userUpdateFormGet = async (headers: any): Promise<UserForm> => {
    try {
        const res = await fetch(`${API_URL}/users/update`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch user update form.');
    }
};

export const resetPasswordEmailSend = async (data: LoginCredentials, headers: any): Promise<UserPromise> => {
    try {
        const res = await fetch(`${API_URL}/users/reset-password/email`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to send reset password email.');
    }
};

export const passwordReset = async (data: ResetPassword, headers: any): Promise<UserPromise> => {
    try {
        const res = await fetch(`${API_URL}/users/reset-password`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to reset password.');
    }
};

export const sendContactUsEmail = async (data: any, headers: any): Promise<any> => {
    try {
        const res = await fetch(`${API_URL}/users/contact-us`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to send email.');
    }
};