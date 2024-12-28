import { createSlice, PayloadAction}  from '@reduxjs/toolkit';
import {Client} from "@/app/types/clients";
import {Invoice} from "@/app/types/invoice";

const initialState: Invoice[] = [];

const invoiceSlice = createSlice({
    name: 'invoices',
    initialState,
    reducers: {
        setInvoices: (state, action: PayloadAction<Invoice[]>) => {
            return action.payload;
        },
    }
});

export const {setInvoices} = invoiceSlice.actions;

export default invoiceSlice.reducer;