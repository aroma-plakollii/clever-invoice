'use client';
import { StoreProvider } from "@/app/store/StoreProvider";
import { LogInForm } from "@/app/components/logInComponents/LogInForm";

const LogIn = () => {
    return (
        <StoreProvider>
            <LogInForm />
        </StoreProvider>
    )
}

export default LogIn;