'use client';
import Datepicker from "tailwind-datepicker-react";
import { ChangeEvent, useEffect, useState } from "react";
import { handleChange } from "@/app/hooks/useHandleChange";
import { handleErrors } from "@/app/hooks/useHandleErrors";
import { handleDateChange } from "@/app/hooks/useHandleDate";
import { useHeaders } from "@/app/hooks/useHeaders";
import { useAuth } from "@/app/hooks/useAuth";
import { invoiceGetSingle, InvoiceUpdateFormGet, InvoiceUpdateFormGetByUser } from "@/app/api/invoiceService";
import { Product } from "@/app/types/product";
import {Invoice, InvoiceDetails, InvoiceError, InvoiceForm} from "@/app/types/invoice";
import { Client } from "@/app/types/clients";
import { options } from "@/app/db/datepickerOptions";
import { InvoiceUpdateButtons } from "@/app/components/invoiceComponents/InvoiceUpdateButtons";
import {FaPlus} from "react-icons/fa6";
import {DetailsInput} from "@/app/components/invoiceComponents/DetailsInput";
import {Setting} from "@/app/types/setting";
import {settingGetAllByUser} from "@/app/api/settingService";
import {DashboardFormLoader} from "@/app/components/loaderComponents/DashboardFormLoader";

interface InvoiceUpdateFormProps{
    idInvoice: string | string[];
}

export const InvoiceUpdateForm: React.FC<InvoiceUpdateFormProps> = (props) => {
    const headers = useHeaders();
    const { user } = useAuth();
    const [invoice, setInvoice] = useState<Invoice>();
    const [setting, setSetting] = useState<Setting>();
    const [invoiceUpdateForm, setInvoiceUpdateForm] = useState<InvoiceForm | undefined>();
    const [inputFields, setInputFields] = useState<InvoiceDetails[]>([
        { id: 1, productId: "", productName: "", description: "", quantity: "", price: "" }
    ]);
    const [show, setShow] = useState<boolean>(false);
    const [inputFieldsErrors, setInputFieldsErrors] = useState<any[]>([{
        productName: false,
        description: false,
        price: false,
        quantity: false,
    }]);
    const [errors, setErrors] = useState<InvoiceError>({
        name: false,
        totalPrice: false,
        paymentStatus: false,
        dueDatePayment: false,
        invoiceDetails: false,
        idUser: false,
        idClient: false,
        idProduct: false
    });
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [paymentStatus, setPaymentStatus] = useState<string | undefined>();
    const [loading, setLoading]= useState<boolean>(true);
    const id = Number(props.idInvoice);

    useEffect( () => {
        const getInvoice = async () => {
            const invoiceGetSingleResponse = await invoiceGetSingle(id, headers);
            const settingsResponse =  await settingGetAllByUser(user.idUser, headers);
            const invoiceUpdateFormResponse = user.idRole.name === "admin" ? await InvoiceUpdateFormGet(headers) : await InvoiceUpdateFormGetByUser(user.idUser, headers);

            setInvoiceUpdateForm(invoiceUpdateFormResponse);
            if(invoiceGetSingleResponse){
                setPaymentStatus(invoiceGetSingleResponse.invoice?.paymentStatus)
                setInvoice(invoiceGetSingleResponse.invoice);
                setLoading(false);
            }

            if (invoiceGetSingleResponse.invoice?.invoiceDetails && invoiceGetSingleResponse.invoice?.invoiceDetails?.length > 0)
                                                                setInputFields(invoiceGetSingleResponse.invoice.invoiceDetails);

            if(settingsResponse.settings)
                setSetting(settingsResponse.settings[0]);
        }

        getInvoice();
    }, [headers, id, user.idRole.name, user.idUser]);

    const onInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        handleChange(e, setInvoice);
        handleErrors(e, setErrors);
        console.log(invoice?.idClient)
    };

    const onDateChange = (date: Date | null) => {
        handleDateChange(date, 'dueDatePayment', setInvoice);
    };

    const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        if (invoiceUpdateForm?.products) {
            const selectedProduct = invoiceUpdateForm?.products.find(
                (product: Product) => product.idProduct === Number(value)
            );

            if (selectedProduct) {
                setSelectedProduct(selectedProduct);
                setInvoice((prevInvoice) => ({
                    ...prevInvoice,
                    idProduct: selectedProduct,
                }));
            }
        }
    };

    const addProductToInvoice = () => {
        if (selectedProduct) {
            // Check if the last input field is empty
            const lastField = inputFields[inputFields.length - 1];
            const isLastFieldEmpty = !lastField.productName && !lastField.description && !lastField.quantity && !lastField.price;

            const newField: InvoiceDetails = {
                id: inputFields.length + 1,
                productId: selectedProduct.idProduct,
                productName: selectedProduct.name || "",
                description: selectedProduct.description || "",
                quantity: 1,
                price: typeof selectedProduct.price === "string" ? parseFloat(selectedProduct.price).toFixed(2) : selectedProduct.price?.toFixed(2),
            };

            if (isLastFieldEmpty) {
                const updatedFields = inputFields.slice(0, inputFields.length - 1);
                updatedFields.push({ ...newField, id: lastField.id });
                setInputFields(updatedFields);
            } else {
                setInputFields([...inputFields, newField]);
            }
        }
    };

    return (
        <>
            {loading ? <DashboardFormLoader type={'full'} /> : (
                <form action="#" method="POST"
                      className="mx-auto mt-2 w-full py-7 px-5 xl:p-7 shadow-2xl rounded-2xl sm:mt-6">
                    <h1 className="text-xl font-bold mb-5">Edit Invoice</h1>
                    <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-6 xl:grid-cols-7">
                        <div className="col-span-6 sm:col-span-3 xl:col-span-2">
                            <label htmlFor="name"
                                   className={`block text-sm font-semibold leading-6 ${errors.name ? 'text-red-600' : 'text-gray-900'}`}>
                                Name
                            </label>
                            <div className="mt-2.5">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={invoice?.name}
                                    onChange={onInputChange}
                                    autoComplete="name"
                                    className={`block w-full rounded-lg border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm sm:leading-6 ${
                                        errors.name ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-blue-600'
                                    }`}
                                />
                            </div>
                        </div>
                        <div className="col-span-6 sm:col-span-3 xl:col-span-2">
                            <label htmlFor="dueDatePayment"
                                   className={`block text-sm font-semibold leading-6 ${errors.dueDatePayment ? 'text-red-600' : 'text-gray-900'}`}>
                                Due Date Payment
                            </label>
                            <div className="mt-[0.60rem]">
                                <Datepicker
                                    value={invoice?.dueDatePayment ? new Date(invoice.dueDatePayment) : undefined}
                                    options={options} onChange={onDateChange} show={show}
                                    setShow={(value) => setShow(value)}/>
                            </div>
                        </div>
                        <div className="col-span-6 sm:col-span-3 xl:col-span-1 sm:mt-1">
                            <label htmlFor="paymentStatus"
                                   className={`block text-sm font-semibold leading-6 ${errors.paymentStatus ? 'text-red-600' : 'text-gray-900'}`}>
                                Payment Status
                            </label>
                            <label htmlFor="paymentStatus" className="flex items-center cursor-pointer mt-4">
                                <input
                                    id="paymentStatus"
                                    name="paymentStatus"
                                    type="checkbox"
                                    checked={invoice?.paymentStatus === 'paid'} // Assuming 'paid' is the value for a paid invoice
                                    onChange={(e) => {
                                        const status = e.target.checked ? 'paid' : 'unpaid'; // Set status based on checkbox
                                        setInvoice((prevInvoice) => ({
                                            ...prevInvoice,
                                            paymentStatus: status,
                                        }));
                                    }}
                                    className={`h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 ${
                                        errors.paymentStatus ? 'ring-red-600' : ''
                                    }`}
                                />
                                <span className="ml-2 text-sm font-semibold leading-6 text-gray-900">Paid</span>
                            </label>
                        </div>
                        <div className="col-span-6 sm:col-span-3 xl:col-span-2">
                            <label htmlFor="idProduct"
                                   className={`block text-sm font-semibold leading-6 ${errors.idProduct ? 'text-red-600' : 'text-gray-900'}`}>
                                Product
                            </label>
                            <div className="mt-[0.62rem]">
                                <select
                                    id="idProduct"
                                    name="idProduct"
                                    value={invoice?.idProduct?.idProduct || ''}
                                    onChange={onSelectChange}
                                    className={`w-full rounded-lg border-0 px-3.5 py-2 sm:py-3 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm sm:leading-6 ${
                                        errors.idProduct ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-blue-600'
                                    }`}
                                >
                                    <option value="">Select a product</option>
                                    {invoiceUpdateForm?.products && invoiceUpdateForm?.products.map((product: Product) => (
                                        <option key={product.idProduct} value={product.idProduct}>
                                            {product.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {invoice?.idProduct &&
                            <div className="col-span-6 xl:col-end-8 flex justify-end">
                                <button
                                    type="button"
                                    onClick={addProductToInvoice}
                                    className="inline-flex items-center px-4 py-2 border border-transparent text-xs sm:text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <FaPlus
                                        className="mr-2 text-black bg-white rounded-full p-[0.09rem] sm:p-0.5 text-sm sm:text-base"/>
                                    Add to Invoice
                                </button>
                            </div>
                        }
                        <div className="col-span-7 border-t border-gray-200">
                            <DetailsInput inputFields={inputFields} setInputFields={setInputFields}
                                          setInvoice={setInvoice} invoice={invoice}
                                          inputFieldsErrors={inputFieldsErrors}
                                          setInputFieldsErrors={setInputFieldsErrors} setting={setting}
                                          onInputChange={onInputChange}/>
                        </div>
                        {/*<div className="col-span-2">*/}
                        {/*    <label htmlFor="idClient"*/}
                        {/*           className={`block text-sm font-semibold leading-6 ${errors.idClient ? 'text-red-600' : 'text-gray-900'}`}>*/}
                        {/*        Client*/}
                        {/*    </label>*/}
                        {/*    <div className="mt-2.5">*/}
                        {/*        <select*/}
                        {/*            id="idClient"*/}
                        {/*            name="idClient"*/}
                        {/*            value={invoice?.idClient?.idClient}*/}
                        {/*            onChange={onInputChange}*/}
                        {/*            className={`w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${*/}
                        {/*                errors.idClient ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-blue-600'*/}
                        {/*            }`}*/}
                        {/*        >*/}
                        {/*            <option value="">Select a client</option>*/}
                        {/*            {invoiceUpdateForm?.clients && invoiceUpdateForm?.clients.map((client: Client) => (*/}
                        {/*                <option key={client.idClient} value={client.idClient}>*/}
                        {/*                    {client.firstName} {client.lastName}*/}
                        {/*                </option>*/}
                        {/*            ))}*/}
                        {/*        </select>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className="col-span-7">
                            <InvoiceUpdateButtons setLoading={setLoading} inputFieldsErrors={inputFieldsErrors}
                                                  setInputFieldsErrors={setInputFieldsErrors} invoice={invoice}
                                                  errors={errors}
                                                  setErrors={setErrors} headers={headers}
                                                  inputFields={inputFields} setInputFields={setInputFields}
                                                  paymentStatus={paymentStatus}
                            />
                        </div>
                    </div>
                </form>
            )}
        </>
    )
}