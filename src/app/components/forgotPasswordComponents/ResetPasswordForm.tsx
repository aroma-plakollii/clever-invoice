'use client';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import { UserError } from "@/app/types/user";
import { ResetPasswordButton } from "@/app/components/forgotPasswordComponents/ResetPasswordButton";

interface ResetPasswordFormProps{
    idUser: string | string[];
}

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = (props) => {
    const [password, setPassword] = useState<string>();
    const [confirmPassword, setConfirmPassword] = useState<string>();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    return (
        <form action="#" method="POST" className="mt-6 sm:mt-9">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
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
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setErrors({...errors, password: !e.target.value ? true : false});
                            }}
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
                    {errors.passwordErrorMessage && <p className="text-xs text-red-600 mt-1.5">{errors.passwordErrorMessage}</p>}
                    {errors.emailErrorMessage && <p className="text-xs text-red-600 mt-1.5">{errors.emailErrorMessage}</p>}
                </div>
                <div className="col-span-2">
                    <ResetPasswordButton idUser={props.idUser} password={password} confirmPassword={confirmPassword} errors={errors} setErrors={setErrors} />
                </div>
            </div>
        </form>
    )
}