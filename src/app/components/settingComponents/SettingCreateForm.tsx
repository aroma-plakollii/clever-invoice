'use client';
import {ChangeEvent, useEffect, useState} from "react";
import { handleChange } from "@/app/hooks/useHandleChange";
import { handleErrors } from "@/app/hooks/useHandleErrors";
import { useHeaders } from "@/app/hooks/useHeaders";
import { useAuth } from "@/app/hooks/useAuth";
import { Setting, SettingError } from "@/app/types/setting";
import { SettingCreateButtons } from "@/app/components/settingComponents/SettingCreateButtons";
import {CustomFields} from "@/app/components/settingComponents/CustomFields";
import {DashboardFormLoader} from "@/app/components/loaderComponents/DashboardFormLoader";

export const SettingCreateForm = () => {
    const headers = useHeaders();
    const { user } = useAuth();
    const [setting, setSetting] = useState<Setting>();
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading]= useState<boolean>(false);
    const [inputFields, setInputFields] = useState([
        {label: "", value: ""}
    ]);
    const [inputFieldsErrors, setInputFieldsErrors] = useState<any[]>([{
        label: false,
        value: false,
    }]);
    const [errors, setErrors] = useState<SettingError>({
        name: false,
        email: false,
        phone: false,
        address: false,
        city: false,
        accountNumber: false,
        iban: false,
        swiftCode: false,
        taxNumber: false,
        tax: false,
        customFields: false,
        emailErrorMessage: '',
        ibanErrorMessage: '',
        accountNumberErrorMessage: '',
        swiftCodeErrorMessage: '',
    });

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleChange(e, setSetting);
        handleErrors(e, setErrors);
    };

    const onImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files?.length) {
            const file = files[0];
            setImage(file);
            setImageUrl(URL.createObjectURL(file));
        }
    };

    return (
        <>
            {loading ? <DashboardFormLoader type={'full'} /> : (
                    <div className="flex items-start">
                        <form action="#" method="POST"
                              className="mx-auto mt-2 w-full p-5 xl:p-7 shadow-2xl rounded-2xl">
                            <h1 className="text-xl font-bold mb-5">Add Setting</h1>
                            <div className="grid gap-x-2 gap-y-6 grid-cols-7">
                                <div
                                    className="md:border-r md:border-gray-300 col-span-7 md:col-span-3 xl:col-span-4 grid grid-cols-2 gap-x-4 gap-y-4 md:pr-5">
                                    <div className="col-span-2 sm:col-span-1 md:col-span-2 xl:col-span-1">
                                        <label htmlFor="name"
                                               className={`block text-sm font-semibold leading-6 ${errors.name ? 'text-red-600' : 'text-gray-900'}`}>
                                            Name
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                id="name"
                                                name="name"
                                                type="text"
                                                onChange={onInputChange}
                                                autoComplete="name"
                                                className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                                                    errors.name ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-blue-600'
                                                }`}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2 sm:col-span-1 md:col-span-2 xl:col-span-1">
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
                                    <div className="col-span-2 sm:col-span-1 md:col-span-2 xl:col-span-1">
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
                                    <div className="col-span-2 sm:col-span-1 md:col-span-2 xl:col-span-1">
                                        <label htmlFor="address"
                                               className={`block text-sm font-semibold leading-6 ${errors.address ? 'text-red-600' : 'text-gray-900'}`}>
                                            Address
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                id="address"
                                                name="address"
                                                type="text"
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, setSetting)}
                                                className={`w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                                                    errors.address ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-blue-600'
                                                }`}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2 sm:col-span-1 md:col-span-2 xl:col-span-1">
                                        <label htmlFor="city"
                                               className={`block text-sm font-semibold leading-6 ${errors.city ? 'text-red-600' : 'text-gray-900'}`}>
                                            City
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                id="city"
                                                name="city"
                                                type="text"
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, setSetting)}
                                                className={`w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                                                    errors.city ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-blue-600'
                                                }`}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2 sm:col-span-1 md:col-span-2 xl:col-span-1">
                                        <label htmlFor="accountNumber"
                                               className={`block text-sm font-semibold leading-6 ${errors.accountNumber ? 'text-red-600' : 'text-gray-900'}`}>
                                            Account Number
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                id="accountNumber"
                                                name="accountNumber"
                                                type="text"
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, setSetting)}
                                                className={`w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                                                    errors.accountNumber ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-blue-600'
                                                }`}
                                            />
                                        </div>
                                        <p className="text-xs text-red-600 mt-1.5">{errors.accountNumberErrorMessage}</p>
                                    </div>
                                    <div className="col-span-2 sm:col-span-1 md:col-span-2 xl:col-span-1">
                                        <label htmlFor="iban"
                                               className={`block text-sm font-semibold leading-6 ${errors.iban ? 'text-red-600' : 'text-gray-900'}`}>
                                            Iban
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                id="iban"
                                                name="iban"
                                                type="text"
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, setSetting)}
                                                className={`w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                                                    errors.iban ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-blue-600'
                                                }`}
                                            />
                                        </div>
                                        <p className="text-xs text-red-600 mt-1.5">{errors.ibanErrorMessage}</p>
                                    </div>
                                    <div className="col-span-2 sm:col-span-1 md:col-span-2 xl:col-span-1">
                                        <label htmlFor="swiftCode"
                                               className={`block text-sm font-semibold leading-6 ${errors.swiftCode ? 'text-red-600' : 'text-gray-900'}`}>
                                            Swift Code
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                id="swiftCode"
                                                name="swiftCode"
                                                type="text"
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, setSetting)}
                                                className={`w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                                                    errors.swiftCode ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-blue-600'
                                                }`}
                                            />
                                            <p className="text-xs text-red-600 mt-1.5">{errors.swiftCodeErrorMessage}</p>
                                        </div>
                                    </div>
                                    <div className="col-span-2 sm:col-span-1 md:col-span-2 xl:col-span-1">
                                        <label htmlFor="taxNumber"
                                               className={`block text-sm font-semibold leading-6 ${errors.taxNumber ? 'text-red-600' : 'text-gray-900'}`}>
                                            Tax Number
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                id="taxNumber"
                                                name="taxNumber"
                                                type="text"
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, setSetting)}
                                                className={`w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                                                    errors.taxNumber ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-blue-600'
                                                }`}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2 sm:col-span-1 md:col-span-2 xl:col-span-1">
                                        <label htmlFor="tax"
                                               className={`block text-sm font-semibold leading-6 ${errors.tax ? 'text-red-600' : 'text-gray-900'}`}>
                                            Tax(%)
                                        </label>
                                        <div className="mt-2.5">
                                            <input
                                                id="tax"
                                                name="tax"
                                                type="text"
                                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, setSetting)}
                                                className={`w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                                                    errors.tax ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-blue-600'
                                                }`}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <div className="flex items-center justify-center w-full">
                                            <label
                                                htmlFor="dropzone-file"
                                                className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                                style={{
                                                    backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center'
                                                }}
                                            >
                                                <div
                                                    className={`${imageUrl && "absolute inset-0 bg-black opacity-50 rounded-lg"}`}></div>
                                                <div
                                                    className="flex flex-col items-center justify-center pt-5 pb-6 relative">
                                                    <svg
                                                        className={`w-8 h-8 mb-4 ${imageUrl ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="none"
                                                        viewBox="0 0 20 16"
                                                    >
                                                        <path
                                                            stroke="currentColor"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth="2"
                                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                        />
                                                    </svg>
                                                    <p className={`mb-2 text-sm ${imageUrl ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                                                        <span className="font-semibold">Click to upload</span> or drag and
                                                        drop
                                                    </p>
                                                    <p className={`text-xs ${imageUrl ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                                                        SVG, PNG, JPG, or GIF (MAX. 800x400px)
                                                    </p>
                                                </div>
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    id="dropzone-file"
                                                    name="image"
                                                    onChange={onImageChange}
                                                    accept="image/*"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-7 md:col-span-4 xl:col-span-3">
                                    <CustomFields setInputFieldsErrors={setInputFieldsErrors}
                                                  inputFieldsErrors={inputFieldsErrors}
                                                  inputFields={inputFields} setInputFields={setInputFields}/>
                                </div>
                                <div className="col-span-7">
                                    <SettingCreateButtons setLoading={setLoading} setting={setting} image={image} user={user} errors={errors}
                                                          setErrors={setErrors} headers={headers} inputFields={inputFields}
                                                          setInputFields={setInputFields}
                                                          setInputFieldsErrors={setInputFieldsErrors}
                                                          inputFieldsErrors={inputFieldsErrors}
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                )
            }
        </>
    )
}