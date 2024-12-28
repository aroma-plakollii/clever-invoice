import { createSlice, PayloadAction}  from '@reduxjs/toolkit';
import {Auth} from "@/app/types/auth";
import {User} from "@/app/types/user";


const initialState: Auth = {
    isAuthenticated: false,
    user: null,
    token: null,
    status: 0,
    message: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<{
            user: User;
            token: string;
        }>) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
        },
        setAuthData: (state, action: PayloadAction<Auth>) => {
            state.isAuthenticated = true;
            state.user = action.payload.user;
            state.token = action.payload.token;
        }
    }
});

export const {login, logout, setAuthData} = authSlice.actions;

export default authSlice.reducer;