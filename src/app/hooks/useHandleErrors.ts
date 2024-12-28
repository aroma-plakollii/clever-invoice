import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export const handleErrors = <T extends Record<any, any>>(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>,
    setErrorState: Dispatch<SetStateAction<T>>
) => {
    const { name, value } = e.target;

    setErrorState((prevErrors) => ({
        ...prevErrors,
        [name]: value === '' ? true : false,
    }));
};