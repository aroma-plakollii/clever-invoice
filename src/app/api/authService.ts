import {API_URL} from "@/app/config";
import {Auth, LoginCredentials} from "@/app/types/auth";
import {UserForm} from "@/app/types/user";

export const logInUser = async (credentials: LoginCredentials, headers: any): Promise<Auth> => {
    let storedAuth: Auth | null;
    const storedData = sessionStorage.getItem('auth');
    storedAuth = storedData ? JSON.parse(storedData) : null;

    if(storedAuth){
        return storedAuth;
    }

    try {
        const res = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers,
            body: JSON.stringify(credentials)
        });
        const result = await res.json();

        if (result.isAuthenticated) sessionStorage.setItem('auth', JSON.stringify(result));
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to signup user.');
    }
};

export const logoutUser = async (headers: any): Promise<Auth> => {
    try {
        const res = await fetch(`${API_URL}/logout`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to log out');
    }
}