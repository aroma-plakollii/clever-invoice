'use client';
import {EyeIcon, EyeSlashIcon} from "@heroicons/react/20/solid";
import { ChangeEvent, useState } from "react";
import { LogInError } from "@/app/types/auth";
import { handleErrors } from "@/app/hooks/useHandleErrors";
import { LogInButton } from "@/app/components/logInComponents/LogInButton";
import Link from "next/link";
import {FormLoader} from "@/app/components/loaderComponents/FormLoader";

export const LogInForm = () => {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<LogInError>({
        email: false,
        password: false,
        confirmPassword: false,
        emailErrorMessage: '',
        errorMessage: '',
    });

    return (
        <>
            {loading ? (
                <FormLoader type={"login"} />
            ) : (
                <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
                    <div className="m-auto shadow-2xl rounded-xl w-full sm:w-8/12 md:w-7/12 xl:w-5/12 p-7 sm:p-10">
                        <div className="mx-auto max-w-2xl">
                            <h2 className="text-2xl font-bold tracking-tight text-gray-950 text-center sm:text-3xl">
                                Log in
                            </h2>
                        </div>
                        <form action="#" method="POST" className="mt-6 sm:mt-9">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                <div className="col-span-2">
                                    <label
                                        htmlFor="email"
                                        className={`block text-sm font-semibold leading-6 ${
                                            errors.email ? 'text-red-600' : 'text-gray-700'
                                        }`}
                                    >
                                        Email
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                handleErrors(e, setErrors);
                                            }}
                                            value={email}
                                            autoComplete="email"
                                            className={`w-full bg-white rounded-md border-none px-3.5 py-2 text-gray-700 shadow-sm ring-1 ring-inset placeholder:text-gray-600 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                                                errors.email
                                                    ? 'ring-red-600 focus:ring-red-600'
                                                    : 'ring-gray-300 focus:ring-gray-300'
                                            }`}
                                        />
                                        <p className="text-xs text-red-600 mt-1.5">{errors.emailErrorMessage}</p>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <label
                                        htmlFor="password"
                                        className={`block text-sm font-semibold leading-6 ${
                                            errors.password ? 'text-red-600' : 'text-gray-900'
                                        }`}
                                    >
                                        Password
                                    </label>
                                    <div className="relative mt-2.5">
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={password}
                                            onChange={(e) => {
                                                setPassword(e.target.value);
                                                setErrors({
                                                    ...errors,
                                                    confirmPassword: !e.target.value,
                                                });
                                            }}
                                            className={`w-full bg-white rounded-md border-none px-3.5 py-2 text-gray-700 shadow-sm ring-1 ring-inset placeholder:text-gray-600 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                                                errors.password
                                                    ? 'ring-red-600 focus:ring-red-600'
                                                    : 'ring-gray-300 focus:ring-gray-300'
                                            }`}
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                aria-label="toggle password visibility"
                                                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                            >
                                                {showPassword ? (
                                                    <EyeSlashIcon className="h-5 w-5" />
                                                ) : (
                                                    <EyeIcon className="h-5 w-5" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-xs text-red-600 mt-2">{errors.errorMessage}</p>
                                    <div className="w-full text-right font">
                                        <Link
                                            href="/forgotPassword"
                                            className="text-xs sm:text-sm text-black font-bold underline mt-2.5"
                                        >
                                            Forgot Password?
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <LogInButton
                                        email={email}
                                        password={password}
                                        errors={errors}
                                        setErrors={setErrors}
                                        setLoading={setLoading}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}