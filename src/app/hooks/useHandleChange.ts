import { ChangeEvent, Dispatch, SetStateAction } from 'react';

export const handleChange = <T>(
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>,
    setState: Dispatch<SetStateAction<T>>
) => {
    const { name, value } = e.target;

    setState((prevState) => ({
        ...prevState,
        [name]: value,
    }));
};