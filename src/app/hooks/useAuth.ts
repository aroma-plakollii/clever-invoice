import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/app/store/store";
import {Auth} from "@/app/types/auth";
import {setAuthData} from "@/app/features/users/authSlice";

export const useAuth = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const user = useSelector((state: RootState) => state.auth.user);

    if (isAuthenticated) {
        return { isAuthenticated, user };
    }

    if (typeof window !== 'undefined') {
        const storedData = sessionStorage.getItem('auth');
        if (storedData) {
            try {
                const sessionAuthData = JSON.parse(storedData);
                dispatch(setAuthData(sessionAuthData)); // Set auth data from session storage into Redux
                return { isAuthenticated: true, user: sessionAuthData.user };
            } catch (error) {
                console.error('Error parsing stored authentication data:', error);
            }
        }
    }

    return { isAuthenticated: false, user: null };
};