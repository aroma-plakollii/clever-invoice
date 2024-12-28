'use client';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useHeaders } from "@/app/hooks/useHeaders";
import { handleChange } from "@/app/hooks/useHandleChange";
import { handleErrors } from "@/app/hooks/useHandleErrors";
import { userCreateFormGet } from "@/app/api/userService";
import { Role } from "@/app/types/role";
import { User, UserError } from "@/app/types/user";
import { SignUpUserButton } from "@/app/components/signUpComponents/SignUpUserButton";
import {FormLoader} from "@/app/components/loaderComponents/FormLoader";

export const SignUpUserForm = () => {
    const headers = useHeaders();
    const signUpData = useSelector((state: RootState) => state.signUp);
    const [user, setUser] = useState<User>(() => signUpData.user || ({} as User));
    const [role, setRole] = useState<Role>();
    const [confirmPassword, setConfirmPassword] = useState<string>(signUpData.user?.password || '');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState<UserError>({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        role: false,
        confirmPassword: false,
        emailErrorMessage: '',
        passwordErrorMessage: '',
    });

    useEffect(() => {
        const getUserCreateForm = async () => {
            const userCreateFormResponse = await userCreateFormGet(headers);
            const clientRole = userCreateFormResponse.roles?.find(
                (role: any) => role.name === 'client'
            );

            if (clientRole) {
                setRole(clientRole);
                setLoading(false);
            }
        };

        getUserCreateForm();
    }, [headers]);

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleChange(e, setUser);
        handleErrors(e, setErrors);
    };

    return (
        <>
            {loading ? (
                <FormLoader type="signup" />
            ) : (
                <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
                    <div
                        className="m-auto shadow-2xl rounded-xl w-full sm:w-8/12 md:w-7/12 xl:w-5/12 pl-7 pb-7 sm:pl-10 sm:pb-10"
                    >
                        <div className="flex flex-col sm:flex-row sm:justify-between">
                            <h2 className="order-1 sm:order-none text-2xl mt-6 sm:mt-10 font-bold tracking-tight text-gray-950 sm:text-3xl">Personal
                                Details</h2>
                            {signUpData &&
                                <span
                                    className="self-end sm:self-start justify-center inline-flex rounded-tl-none rounded-br-none items-center h-11 rounded-xl bg-black w-6/12 sm:w-4/12 text-sm font-medium text-white">
                                {signUpData?.membership?.idMembershipPackage?.name}
                            </span>}
                        </div>
                        <form action="#" method="POST" className="mt-7 sm:mt-9 pr-7 sm:pr-10">
                            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                                <div className="lg:col-span-1 col-span-2">
                                    <label htmlFor="firstName"
                                           className={`block text-sm font-semibold leading-6 ${errors.firstName ? 'text-red-600' : 'text-gray-700'}`}>
                                        First name
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            id="firstName"
                                            name="firstName"
                                            type="text"
                                            value={user?.firstName}
                                            onChange={onInputChange}
                                            autoComplete="firstName"
                                            className={`block w-full bg-white rounded-md border-none px-3.5 py-2 text-gray-700 shadow-sm ring-1 ring-inset placeholder:text-gray-600 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                                                errors.firstName ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-gray-300'
                                            }`}
                                        />
                                    </div>
                                </div>
                                <div className="lg:col-span-1 col-span-2">
                                    <label htmlFor="lastName"
                                           className={`block text-sm font-semibold leading-6  ${errors.lastName ? 'text-red-600' : 'text-gray-700'}`}>
                                        Last name
                                    </label>
                                    <div className="mt-2.5">
                                        <input
                                            id="lastName"
                                            name="lastName"
                                            type="text"
                                            value={user?.lastName}
                                            onChange={onInputChange}
                                            autoComplete="lastName"
                                            className={`block w-full bg-white rounded-md border-none px-3.5 py-2 text-gray-700 shadow-sm ring-1 ring-inset placeholder:text-gray-600 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                                                errors.lastName ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-gray-300'
                                            }`}
                                        />
                                    </div>
                                </div>
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
                                            value={user?.email}
                                            onChange={onInputChange}
                                            autoComplete="email"
                                            className={`w-full bg-white rounded-md border-none px-3.5 py-2 text-gray-700 shadow-sm ring-1 ring-inset placeholder:text-gray-600 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                                                errors.email ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-gray-300'
                                            }`}
                                        />
                                        <p className="text-xs text-red-600 mt-1.5">{errors.emailErrorMessage}</p>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="password"
                                           className={`block text-sm font-semibold leading-6 ${errors.password ? 'text-red-600' : 'text-gray-700'}`}>
                                        Password
                                    </label>
                                    <div className="relative mt-2.5">
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? 'text' : 'password'}
                                            value={user?.password}
                                            onChange={onInputChange}
                                            className={`w-full bg-white rounded-md border-none px-3.5 py-2 text-gray-700 shadow-sm ring-1 ring-inset placeholder:text-gray-600 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                                                errors.password ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-gray-300'
                                            }`}
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                aria-label="toggle password visibility"
                                                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                            >
                                                {showPassword ? <EyeSlashIcon className="h-5 w-5"/> :
                                                    <EyeIcon className="h-5 w-5"/>}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <label htmlFor="confirmPassword"
                                           className={`block text-sm font-semibold leading-6 ${errors.confirmPassword ? 'text-red-600' : 'text-gray-700'}`}>
                                        Repeat Password
                                    </label>
                                    <div className="relative mt-2.5">
                                        <input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            value={confirmPassword}
                                            onChange={(e) => {
                                                setConfirmPassword(e.target.value);
                                                setErrors({...errors, confirmPassword: !e.target.value ? true : false});
                                            }}
                                            className={`w-full bg-white rounded-md border-none px-3.5 py-2 text-gray-700 shadow-sm ring-1 ring-inset placeholder:text-gray-600 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                                                errors.confirmPassword ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-gray-300'
                                            }`}
                                        />
                                        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                aria-label="toggle password visibility"
                                                className="text-gray-400 hover:text-gray-500 focus:outline-none"
                                            >
                                                {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5"/> :
                                                    <EyeIcon className="h-5 w-5"/>}
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-xs text-red-600 mt-1.5">{errors.passwordErrorMessage}</p>
                                </div>
                                <div className="col-span-2">
                                    <SignUpUserButton setLoading={setLoading} user={user} role={role}
                                                      confirmPassword={confirmPassword} errors={errors}
                                                      setErrors={setErrors}/>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};