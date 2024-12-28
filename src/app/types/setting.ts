import { User } from '@/app/types/user';

export interface Setting {
    idSetting?: number;
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    accountNumber?: string;
    iban?: string;
    swiftCode?: string;
    taxNumber?: string;
    tax?: number;
    customFields?: any;
    image?: any;
    idUser?: User;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface SettingError{
    name: boolean;
    email: boolean;
    phone: boolean;
    address: boolean;
    city: boolean;
    accountNumber: boolean;
    iban: boolean;
    swiftCode: boolean;
    taxNumber: boolean;
    tax: boolean;
    customFields: boolean;
    emailErrorMessage: string;
    ibanErrorMessage: string;
    accountNumberErrorMessage: string;
    swiftCodeErrorMessage: string;
}

export interface SettingForm {
    success: boolean;
    status: number;
    operation: string;
    users: User[];
}

export interface SettingPromise {
    success?: boolean
    status?: number;
    message?: string;
    setting?: Setting | undefined;
    users?: User[];
    settings?: Setting[],
    totalPages?: number;
}