import { createSlice, PayloadAction}  from '@reduxjs/toolkit';
import {MembershipPackage} from "@/app/types/membershipPackage";

const initialState: MembershipPackage[] = [];

const membershipPackageSlice = createSlice({
    name: 'membershipPackages',
    initialState,
    reducers: {
        setMembershipPackages: (state, action: PayloadAction<MembershipPackage[]>) => {
            return action.payload;
        },
    }
});

export const {setMembershipPackages} = membershipPackageSlice.actions;

export default membershipPackageSlice.reducer;