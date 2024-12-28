'use client';
import { useParams } from "next/navigation";
import { StoreProvider } from "@/app/store/StoreProvider";
import { ResetPasswordForm } from "@/app/components/forgotPasswordComponents/ResetPasswordForm";

const ResetPassword = () => {
    const { idUser } = useParams()

    return (
        <StoreProvider>
            <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="m-auto shadow-2xl rounded-xl w-full sm:w-8/12 md:w-7/12 xl:w-5/12 p-7 sm:p-10">
                    <div className="mx-auto max-w-2xl">
                        <h2 className="text-2xl font-bold tracking-tight text-gray-950 sm:text-3xl">Reset Password</h2>
                    </div>
                    <ResetPasswordForm idUser={idUser} />
                </div>
            </div>
        </StoreProvider>
    )
}

export default ResetPassword;