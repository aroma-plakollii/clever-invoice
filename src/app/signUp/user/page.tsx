'use client';
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import usePageReload from "@/app/hooks/usePageReload";
import { StoreProvider } from "@/app/store/StoreProvider";
import {SignUpUserForm} from "@/app/components/signUpComponents/SignUpUserForm";

const UserSignUp = () => {
    const isReload = usePageReload();
    const router = useRouter();

    useEffect(() => {
        if (isReload) {
            router.push('/');
        }
    }, [isReload, router]);

    return (
        <StoreProvider>
           <SignUpUserForm />
        </StoreProvider>
    )
}

export default UserSignUp;
