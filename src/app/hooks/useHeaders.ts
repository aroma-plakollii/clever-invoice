import {Auth} from "@/app/types/auth";
import {useMemo} from "react";

export const useHeaders = () => {
    const headers = useMemo(() => {
        let baseHeaders: {
            'Content-Type': string;
            Authorization?: string;
        } = {
            'Content-Type': 'application/json',
        };

        if (typeof window !== 'undefined') {
            const storedData = sessionStorage.getItem('auth');
            const sessionAuthData: Auth = storedData ? JSON.parse(storedData) : null;
            const token = sessionAuthData ? sessionAuthData.token : '';

            baseHeaders = {
                ...baseHeaders,
                'Authorization': `Bearer ${token}`,
            };
        }

        return baseHeaders;
    }, []); // Empty array ensures headers are only recomputed if session changes

    return headers;
};