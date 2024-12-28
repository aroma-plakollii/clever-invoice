export interface Contact {
    firstName?: string;
    lastName?: string;
    email?: string;
    message?: string;
}

export interface ContactError {
    firstName?: boolean;
    lastName?: boolean;
    email?: boolean;
    message?: boolean;
    emailErrorMessage?: string;
}