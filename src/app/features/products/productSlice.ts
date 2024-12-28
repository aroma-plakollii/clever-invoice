import { createSlice, PayloadAction}  from '@reduxjs/toolkit';
import {Product} from "@/app/types/product";

const initialState: Product[] = [];

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            return action.payload;
        },
    }
});

export const {setProducts} = productSlice.actions;

export default productSlice.reducer;