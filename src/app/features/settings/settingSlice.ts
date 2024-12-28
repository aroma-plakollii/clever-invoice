import { createSlice, PayloadAction}  from '@reduxjs/toolkit';
import {Setting} from "@/app/types/setting";

const initialState: Setting[] = [];

const settingSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setSettings: (state, action: PayloadAction<Setting[]>) => {
            return action.payload;
        },
    }
});

export const {setSettings} = settingSlice.actions;

export default settingSlice.reducer;