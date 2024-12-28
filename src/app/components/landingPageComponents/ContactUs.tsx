'use client';
import {useHeaders} from "@/app/hooks/useHeaders";
import {useAuth} from "@/app/hooks/useAuth";
import {ChangeEvent, useState} from "react";
import {Product, ProductError} from "@/app/types/product";
import {Contact, ContactError} from "@/app/types/contact";
import {handleChange} from "@/app/hooks/useHandleChange";
import {handleErrors} from "@/app/hooks/useHandleErrors";
import {ContactUsButton} from "@/app/components/landingPageComponents/ContactUsButton";

export const ContactUs = () => {
    const headers = useHeaders();
    const [contact, setContact] = useState<Contact>();
    const [loading, setLoading]= useState<boolean>(false);
    const [errors, setErrors] = useState<ContactError>({
        firstName: false,
        lastName: false,
        email: false,
        message: false,
        emailErrorMessage: ''
    });

    const onInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        handleChange(e, setContact);
        handleErrors(e, setErrors);
    };

    return (
        <form action="#" method="POST"
              className="mx-auto w-full py-7 px-5 sm:px-6 shadow-2xl rounded-2xl bg-white">
            <h1 className="text-xl font-bold mb-5">Contact Us</h1>
            <div className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                <div className="col-span-2 sm:col-span-1 lg:col-span-2 xl:col-span-1">
                    <label htmlFor="firstName"
                           className={`block text-sm font-semibold leading-6 ${errors.firstName ? 'text-red-600' : 'text-gray-900'}`}>
                        First Name
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
                <div className="col-span-2 sm:col-span-1 lg:col-span-2 xl:col-span-1">
                    <label htmlFor="lastName"
                           className={`block text-sm font-semibold leading-6 ${errors.lastName ? 'text-red-600' : 'text-gray-900'}`}>
                        Last Name
                    </label>
                    <div className="mt-2.5">
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            onChange={onInputChange}
                            autoComplete="lastName"
                            className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                                errors.lastName ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-blue-600'
                            }`}
                        />
                    </div>
                </div>
                <div className="col-span-2">
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
                <div className="col-span-2">
                    <label htmlFor="message"
                           className={`block text-sm font-semibold leading-6  ${errors.message ? 'text-red-600' : 'text-gray-900'}`}>
                        Message
                    </label>
                    <div className="mt-2.5">
                        <textarea onChange={onInputChange} id="message" name="message" rows={5}
                                  className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                  placeholder="Write your message here..."></textarea>
                    </div>
                </div>
                <div className="col-span-2">
                    <ContactUsButton setLoading={setLoading} contact={contact} errors={errors}
                                          setErrors={setErrors} headers={headers} />
                </div>
            </div>
        </form>
)
}