import { createSlice, PayloadAction}  from '@reduxjs/toolkit';
import {Client} from "@/app/types/clients";

const initialState: Client[] = [];

const clientSlice = createSlice({
    name: 'clients',
    initialState,
    reducers: {
        setClients: (state, action: PayloadAction<Client[]>) => {
            return action.payload;
        },
    }
});

export const {setClients} = clientSlice.actions;

export default clientSlice.reducer;