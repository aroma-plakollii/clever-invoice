'use client';
import {useEffect} from "react";
import { useRouter } from "next/navigation";
import usePageReload from "@/app/hooks/usePageReload";
import { StoreProvider } from "@/app/store/StoreProvider";
import { SignUpSettingForm } from "@/app/components/signUpComponents/SignUpSettingForm";

const SettingSignUp = () => {
    const isReload = usePageReload();
    const router = useRouter();

    useEffect(() => {
        if (isReload) {
            router.push('/');
        }
    }, [isReload, router]);

    return (
        <StoreProvider>
            <SignUpSettingForm/>
        </StoreProvider>
    )
}

export default SettingSignUp;