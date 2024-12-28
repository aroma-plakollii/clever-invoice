import { Dispatch, SetStateAction } from 'react';

export const handleDateChange = <T>(
    date: Date | null,
    name: string,
    setState: Dispatch<SetStateAction<T>>
) => {
    setState((prevState) => ({
        ...prevState,
        [name]: date,
    }));
};
