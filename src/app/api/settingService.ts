import { API_URL } from "@/app/config";
import { Setting, SettingForm, SettingPromise } from "@/app/types/setting";

export const settingGetSingle = async (idSetting: number, headers: any): Promise<SettingPromise> => {
    try {
        const res = await fetch(`${API_URL}/settings/${idSetting}`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch setting.');
    }
};

export const settingGetAll = async (headers: any): Promise<SettingPromise> => {
    try {
        const res = await fetch(`${API_URL}/settings`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch settings.');
    }
};

export const settingGetAllPaged = async (page: number, headers: any): Promise<SettingPromise> => {
    try {
        const res = await fetch(`${API_URL}/settings/paged/${20}/${page}`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch settings.');
    }
};

export const settingCreate = async (data: any, headers: any): Promise<SettingPromise> => {
    try {
        const res = await fetch(`${API_URL}/settings/create`, {
            method: 'POST',
            body: data
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to create setting.');
    }
};

export const settingUpdate = async (idSetting: number, data: any, headers: any): Promise<SettingPromise> => {
    try {
        const res = await fetch(`${API_URL}/settings/${idSetting}`, {
            method: 'PUT',
            body: data
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to update setting.');
    }
};

export const settingDelete = async (idSetting: number | undefined, headers: any): Promise<SettingPromise> => {
    try {
        const res = await fetch(`${API_URL}/settings/${idSetting}`, {
            method: 'DELETE',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to delete setting.');
    }
};

export const settingCreateFormGet = async (headers: any): Promise<SettingForm> => {
    try {
        const res = await fetch(`${API_URL}/settings/create`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch setting create form.');
    }
};

export const settingUpdateFormGet = async (headers: any): Promise<SettingForm> => {
    try {
        const res = await fetch(`${API_URL}/settings/update`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch setting update form.');
    }
};

export const settingGetAllByUser = async (idUser: number, headers: any): Promise<SettingPromise> => {
    try {
        const res = await fetch(`${API_URL}/settings/user/${idUser}`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch settings.');
    }
};

export const settingGetAllByUserPaged = async (idUser: number, data: any, headers: any): Promise<SettingPromise> => {
    try {
        const res = await fetch(`${API_URL}/settings/user/paged/${idUser}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data)
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch settings.');
    }
};