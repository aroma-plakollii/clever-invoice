import { configureStore } from '@reduxjs/toolkit';
import signUpSlice from "@/app/features/users/signUpSlice";
import membershipPackageSlice from "@/app/features/membershipPackage/membershipPackageSlice";
import authSlice from "@/app/features/users/authSlice";
import userSlice from "@/app/features/users/userSlice";
import productSlice from "@/app/features/products/productSlice";
import clientSlice from "@/app/features/clients/clientSlice";
import settingSlice from "@/app/features/settings/settingSlice";
import invoiceSlice from "@/app/features/invoices/invoiceSlice";

export const store = configureStore({
    reducer: {
        signUp: signUpSlice,
        membershipPackages: membershipPackageSlice,
        auth: authSlice,
        users: userSlice,
        products: productSlice,
        clients: clientSlice,
        settings: settingSlice,
        invoices: invoiceSlice
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;