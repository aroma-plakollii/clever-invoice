'use client';
import { ChangeEvent, useState } from "react";
import { handleChange } from "@/app/hooks/useHandleChange";
import { handleErrors } from "@/app/hooks/useHandleErrors";
import { useHeaders } from "@/app/hooks/useHeaders";
import { useAuth } from "@/app/hooks/useAuth";
import { Product, ProductError } from "@/app/types/product";
import { ProductCreateButtons } from "@/app/components/productComponents/ProductCreateButtons";
import {DashboardFormLoader} from "@/app/components/loaderComponents/DashboardFormLoader";

export const ProductCreateForm = () => {
    const headers = useHeaders();
    const { user } = useAuth();
    const [product, setProduct] = useState<Product>();
    const [loading, setLoading]= useState<boolean>(false);
    const [errors, setErrors] = useState<ProductError>({
        name: false,
        price: false,
        description: false,
    });

    const onInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
        handleChange(e, setProduct);
        handleErrors(e, setErrors);
    };

    return (
        <>
            {loading ? <DashboardFormLoader type={'product'} /> : (
                <form action="#" method="POST"
                      className="mx-auto mt-2 w-12/12 sm:w-11/12 lg:w-9/12 py-7 px-5 sm:px-6 shadow-2xl rounded-2xl lg:mt-4">
                    <h1 className="text-xl font-bold mb-5">Add Product</h1>
                    <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                        <div className="col-span-2 sm:col-span-1">
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
                                    autoComplete="product"
                                    className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                                        errors.name ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-blue-600'
                                    }`}
                                />
                            </div>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="price"
                                   className={`block text-sm font-semibold leading-6 ${errors.price ? 'text-red-600' : 'text-gray-900'}`}>
                                Price
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="price"
                                    name="price"
                                    type="text"
                                    onChange={onInputChange}
                                    autoComplete="price"
                                    className={`block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
                                        errors.price ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-blue-600'
                                    }`}
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <label htmlFor="description"
                                   className={`block text-sm font-semibold leading-6  ${errors.description ? 'text-red-600' : 'text-gray-900'}`}>
                                Description
                            </label>
                            <div className="mt-2.5">
                            <textarea onChange={onInputChange} id="description" name="description" rows={5}
                                      className="block p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                      placeholder="Write your description here..."></textarea>
                            </div>
                        </div>
                        <div className="col-span-2">
                            <ProductCreateButtons setLoading={setLoading} user={user} product={product} errors={errors} setErrors={setErrors}
                                                  headers={headers}/>
                        </div>
                    </div>
                </form>
            )}
        </>
    )
}