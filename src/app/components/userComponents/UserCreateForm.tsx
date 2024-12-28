'use client';
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { ChangeEvent, useEffect, useState } from "react";
import { handleChange } from "@/app/hooks/useHandleChange";
import { handleErrors } from "@/app/hooks/useHandleErrors";
import { useHeaders } from "@/app/hooks/useHeaders";
import { userCreateFormGet } from "@/app/api/userService";
import { User, UserError, UserForm}  from "@/app/types/user";
import { Role } from "@/app/types/role";
import { UserCreateButtons } from "@/app/components/userComponents/UserCreateButtons";
import {DashboardFormLoader} from "@/app/components/loaderComponents/DashboardFormLoader";

export const UserCreateForm = () => {
    const headers = useHeaders();
    const [user, setUser] = useState<User>();
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [userCreateForm, setUserCreateForm] = useState<UserForm>();
    const [loading, setLoading]= useState<boolean>(true);
    const [errors, setErrors] = useState<UserError>({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        confirmPassword: false,
        role: false,
        emailErrorMessage: '',
        passwordErrorMessage: '',
    });

    useEffect( () => {
        const getUserCreateForm = async () => {
            const userCreateFormResponse = await userCreateFormGet(headers);

            if(userCreateFormResponse){
                setUserCreateForm(userCreateFormResponse);
                setLoading(false);
            }
        }

        getUserCreateForm();
    }, [headers]);

    const onInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        handleChange(e, setUser);
        handleErrors(e, setErrors);
    };

    return (
        <>
            {loading ? <DashboardFormLoader type={'user'} /> : (
                <form action="#" method="POST"
                      className="mx-auto mt-2 w-full lg:w-9/12 py-7 px-5 sm:px-6 shadow-2xl rounded-2xl lg:mt-4">
                    <h1 className="text-xl font-bold mb-5">Add User</h1>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="firstName"
                                   className={`block text-sm font-semibold leading-6 ${errors.firstName ? 'text-red-600' : 'text-gray-900'}`}>
                                First name
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="firstName"
                                    className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                                        errors.firstName ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-blue-600'
                                    }`}
                                />
                            </div>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="lastName"
                                   className={`block text-sm font-semibold leading-6  ${errors.lastName ? 'text-red-600' : 'text-gray-900'}`}>
                                Last name
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="lastName"
                                    className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 ring-1 ring-inset shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                                        errors.lastName ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-blue-600'
                                    }`}
                                />
                            </div>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="idRole"
                                   className={`block text-sm font-semibold leading-6 ${errors.role ? 'text-red-600' : 'text-gray-900'}`}>
                                Role
                            </label>
                            <div className="mt-2.5">
                                <select
                                    id="idRole"
                                    name="idRole"
                                    value={user?.idRole?.idRole}
                                    onChange={onInputChange}
                                    className={`w-full rounded-md border-0 px-3.5 py-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                                        errors.role ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-blue-600'
                                    }`}
                                >
                                    <option value="">Select a role</option>
                                    {userCreateForm?.roles && userCreateForm?.roles.map((role: Role) => (
                                        <option key={role.idRole} value={role.idRole}>
                                            {role.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="email"
                                   className={`block text-sm font-semibold leading-6 ${errors.email ? 'text-red-600' : 'text-gray-900'}`}>
                                Email
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    onChange={onInputChange}
                                    autoComplete="email"
                                    className={`w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                                        errors.email ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-blue-600'
                                    }`}
                                />
                                <p className="text-xs text-red-600 mt-1.5">{errors.emailErrorMessage}</p>
                            </div>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="password"
                                   className={`block text-sm font-semibold leading-6 ${errors.password ? 'text-red-600' : 'text-gray-900'}`}>
                                Password
                            </label>
                            <div className="mt-2.5 relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={onInputChange}
                                    className={`w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                                        errors.password ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-blue-600'
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
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="confirmPassword"
                                   className={`block text-sm font-semibold leading-6 ${errors.confirmPassword ? 'text-red-600' : 'text-gray-900'}`}>
                                Repeat Password
                            </label>
                            <div className="mt-2.5 relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    onChange={(e) => {
                                        setConfirmPassword(e.target.value);
                                        setErrors({...errors, confirmPassword: !e.target.value ? true : false});
                                    }}
                                    className={`w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                                        errors.confirmPassword ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-blue-600'
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
                            <UserCreateButtons setLoading={setLoading} user={user} errors={errors} setErrors={setErrors}
                                               confirmPassword={confirmPassword} headers={headers}/>
                        </div>
                    </div>
                </form>
            )}
        </>
    )
}