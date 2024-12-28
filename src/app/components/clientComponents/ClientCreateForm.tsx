'use client';
import { ChangeEvent, useState } from "react";
import { useAuth } from "@/app/hooks/useAuth";
import { handleChange } from "@/app/hooks/useHandleChange";
import { handleErrors } from "@/app/hooks/useHandleErrors";
import { useHeaders } from "@/app/hooks/useHeaders";
import { Client, ClientError } from "@/app/types/clients";
import { ClientCreateButtons } from "@/app/components/clientComponents/ClientCreateButtons";
import {DashboardFormLoader} from "@/app/components/loaderComponents/DashboardFormLoader";

export const ClientCreateForm = () => {
    const headers = useHeaders();
    const { user } = useAuth();
    const [client, setClient] = useState<Client>();
    const [loading, setLoading]= useState<boolean>(false);
    const [errors, setErrors] = useState<ClientError>({
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        emailErrorMessage: '',
    });

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleChange(e, setClient);
        handleErrors(e, setErrors);
    };

    return (
        <>
            {loading ? <DashboardFormLoader type={'client'} /> : (
                    <form action="#" method="POST"
                          className="mx-auto mt-2 lg:mt-4 w-12/12 lg:w-9/12 py-7 px-5 sm:px-6 shadow-2xl rounded-2xl">
                        <h1 className="text-xl font-bold mb-5">Add Client</h1>
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
                                <label htmlFor="phone"
                                       className={`block text-sm font-semibold leading-6  ${errors.phone ? 'text-red-600' : 'text-gray-900'}`}>
                                    Phone
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        onChange={onInputChange}
                                        autoComplete="phone"
                                        className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 ring-1 ring-inset shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                                            errors.phone ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-blue-600'
                                        }`}
                                    />
                                </div>
                            </div>
                            <div className="col-span-2">
                                <ClientCreateButtons setLoading={setLoading} client={client} user={user} errors={errors} setErrors={setErrors}
                                                     headers={headers}/>
                            </div>
                        </div>
                    </form>
                )
            }
        </>
    )
}