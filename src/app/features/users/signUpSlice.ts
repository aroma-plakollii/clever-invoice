import { createSlice, PayloadAction }  from '@reduxjs/toolkit';
import { SignUp } from "@/app/types/signUp";
import { User } from "@/app/types/user";
import { Membership } from "@/app/types/membership";
import { Setting } from "@/app/types/setting";

const initialState: SignUp = {
    user: {},
    membership: {},
    setting: {}
};

const signUpSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
        setMembership: (state, action: PayloadAction<Membership>) => {
            state.membership = action.payload;
        },
        setSetting: (state, action: PayloadAction<Setting>) => {
            state.setting = action.payload;
        },
        resetSignUp: (state) => {
            state.user = {};
            state.membership = {};
            state.setting = {};
        }
    }
});

export const { setUser, setMembership, setSetting, resetSignUp } = signUpSlice.actions;
export default signUpSlice.reducer;