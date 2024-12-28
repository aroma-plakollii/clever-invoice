'use client';
import { ChangeEvent, useEffect, useState } from "react";
import { handleChange } from "@/app/hooks/useHandleChange";
import { handleErrors } from "@/app/hooks/useHandleErrors";
import { useHeaders } from "@/app/hooks/useHeaders";
import { clientGetSingle } from "@/app/api/clientService";
import { Client, ClientError } from "@/app/types/clients";
import { ClientUpdateButtons } from "@/app/components/clientComponents/ClientUpdateButtons";
import { InvoiceTable } from "@/app/components/invoiceComponents/InvoiceTable";
import {DashboardFormLoader} from "@/app/components/loaderComponents/DashboardFormLoader";

interface ClientUpdateFormProps{
    idClient: string | string[];
}

export const ClientUpdateForm: React.FC<ClientUpdateFormProps> = (props) => {
    const headers = useHeaders();
    const [client, setClient] = useState<Client>();
    const [loading, setLoading]= useState<boolean>(true);
    const [errors, setErrors] = useState<ClientError>({
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        emailErrorMessage: '',
    });
    const id = Number(props.idClient);

    useEffect( () => {
        const getUserCreateForm = async () => {
            const clientGetSingleResponse = await clientGetSingle(id, headers);
            console.log("hi")
            if(clientGetSingleResponse){
                setClient(clientGetSingleResponse.client);
                setLoading(false);
            }
        }

        getUserCreateForm();
    }, [headers, id]);

    const onInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        handleChange(e, setClient);
        handleErrors(e, setErrors);
    };

    return (
        <>
            {loading ? <DashboardFormLoader type={'client-full'} /> : (
                <div className="block md:flex md:shadow-2xl rounded-2xl md:p-5">
                    <form action="#" method="POST"
                          className="mx-auto mt-2 w-12/12 md:w-9/12 lg:w-8/12 xl:w-[55%] md:mr-6 shadow-2xl md:shadow-none p-5 md:p-0 rounded-2xl">
                        <h1 className="text-xl font-bold mb-5">Edit Client</h1>
                        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                            <div className="md:col-span-2 sm:col-span-1">
                                <label htmlFor="firstName"
                                       className={`block text-sm font-semibold leading-6 ${errors.firstName ? 'text-red-600' : 'text-gray-900'}`}>
                                    First name
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        value={client?.firstName}
                                        onChange={onInputChange}
                                        autoComplete="firstName"
                                        className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                                            errors.firstName ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-blue-600'
                                        }`}
                                    />
                                </div>
                            </div>
                            <div className="md:col-span-2 sm:col-span-1">
                                <label htmlFor="lastName"
                                       className={`block text-sm font-semibold leading-6  ${errors.lastName ? 'text-red-600' : 'text-gray-900'}`}>
                                    Last name
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        value={client?.lastName}
                                        onChange={onInputChange}
                                        autoComplete="lastName"
                                        className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 ring-1 ring-inset shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                                            errors.lastName ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-blue-600'
                                        }`}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="email"
                                       className={`block text-sm font-semibold leading-6 ${errors.email ? 'text-red-600' : 'text-gray-900'}`}>
                                    Email
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={client?.email}
                                        onChange={onInputChange}
                                        autoComplete="email"
                                        className={`w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                                            errors.email ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-blue-600'
                                        }`}
                                    />
                                    <p className="text-xs text-red-600 mt-1.5">{errors.emailErrorMessage}</p>
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <label htmlFor="phone"
                                       className={`block text-sm font-semibold leading-6  ${errors.phone ? 'text-red-600' : 'text-gray-900'}`}>
                                    Phone
                                </label>
                                <div className="mt-2.5">
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="text"
                                        value={client?.phone}
                                        onChange={onInputChange}
                                        autoComplete="phone"
                                        className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 ring-1 ring-inset shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                                            errors.phone ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-blue-600'
                                        }`}
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-2">
                                <ClientUpdateButtons setLoading={setLoading} client={client} errors={errors} setErrors={setErrors}
                                                     headers={headers}/>
                            </div>
                        </div>
                    </form>
                    <div
                        className="mx-auto w-full lg:9/12 border-t md:border-t-0 border-gray-400 md:border-l md:pl-6 md:pt-0 md:mt-0 mt-8 pt-4">
                        <InvoiceTable idClient={props.idClient}/>
                    </div>
                </div>
            )}
        </>
    )
}