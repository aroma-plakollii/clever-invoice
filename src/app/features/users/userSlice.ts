import { createSlice, PayloadAction}  from '@reduxjs/toolkit';
import {User} from "@/app/types/user";

const initialState: User[] = [];

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[] | User>) => {
            if (Array.isArray(action.payload)) {
                return action.payload;
            } else {
                return [action.payload];
            }
        },
    }
});

export const {setUsers} = userSlice.actions;

export default userSlice.reducer;