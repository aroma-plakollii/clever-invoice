'use client';
import { ChangeEvent, useState } from "react";
import { handleErrors } from "@/app/hooks/useHandleErrors";
import { LogInError } from "@/app/types/auth";
import { ForgotPasswordButton } from "@/app/components/forgotPasswordComponents/ForgotPasswordButtons";

export const ForgotPasswordForm = () => {
    const [email, setEmail] = useState<string>();
    const [errors, setErrors] = useState<LogInError>({
        email: false,
        password: false,
        confirmPassword: false,
        emailErrorMessage: '',
        errorMessage: '',
    });

    return (
        <form action="#" method="POST" className="mt-6 sm:mt-9">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                <div className="col-span-2">
                    <label htmlFor="email"
                           className={`block text-sm font-semibold leading-6 ${errors.email ? 'text-red-600' : 'text-gray-700'}`}>
                        Email
                    </label>
                    <div className="mt-2.5">
                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setEmail(e.target.value);
                                handleErrors(e, setErrors);
                            }}
                            autoComplete="email"
                            className={`w-full bg-white rounded-md border-none px-3.5 py-2 text-gray-700 shadow-sm ring-1 ring-inset placeholder:text-gray-600 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                                errors.email ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-gray-300'
                            }`}
                        />
                        {errors.emailErrorMessage && <p className="text-xs text-red-600 mt-1.5">{errors.emailErrorMessage}</p>}
                        {errors.errorMessage && <p className="text-xs text-red-600 mt-1.5">{errors.errorMessage}</p>}
                    </div>
                </div>
                <div className="col-span-2">
                <ForgotPasswordButton email={email} errors={errors} setErrors={setErrors}/>
                </div>
            </div>
        </form>
    )
}