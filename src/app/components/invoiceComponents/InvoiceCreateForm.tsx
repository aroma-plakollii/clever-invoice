'use client';
import Datepicker from "tailwind-datepicker-react";
import {ChangeEvent, useEffect, useMemo, useRef, useState} from "react";
import { handleChange } from "@/app/hooks/useHandleChange";
import { handleErrors } from "@/app/hooks/useHandleErrors";
import { handleDateChange } from "@/app/hooks/useHandleDate";
import { useHeaders } from "@/app/hooks/useHeaders";
import { useAuth } from "@/app/hooks/useAuth";
import { InvoiceCreateFormGet, InvoiceCreateFormGetByUser } from "@/app/api/invoiceService";
import { clientGetSingle } from "@/app/api/clientService";
import {Invoice, InvoiceDetails, InvoiceError, InvoiceForm} from "@/app/types/invoice";
import { Product } from "@/app/types/product";
import { options } from "@/app/db/datepickerOptions";
import { InvoiceCreateButtons } from "@/app/components/invoiceComponents/InvoiceCreateButtons";
import {DetailsInput} from "@/app/components/invoiceComponents/DetailsInput";
import {FaPlus} from "react-icons/fa6";
import {settingGetAllByUser} from "@/app/api/settingService";
import {Setting} from "@/app/types/setting";
import {DashboardFormLoader} from "@/app/components/loaderComponents/DashboardFormLoader";

interface InvoiceCreateFormProps{
    idClient: string | string[];
}

export const InvoiceCreateForm: React.FC<InvoiceCreateFormProps> = (props) => {
    const headers = useHeaders();
    const { user } = useAuth();
    const memoizedHeaders = useMemo(() => headers, [headers]);
    const memoizedUser = useMemo(() => user, [user]);
    const [invoice, setInvoice] = useState<Invoice>();
    const [setting, setSetting] = useState<Setting>();
    const [invoiceCreateForm, setInvoiceCreateForm] = useState<InvoiceForm>();
    const [inputFields, setInputFields] = useState<InvoiceDetails[]>([]);
    const [inputFieldsErrors, setInputFieldsErrors] = useState<any[]>([{
        productName: false,
        description: false,
        price: false,
        quantity: false,
    }]);
    const [errors, setErrors] = useState<InvoiceError>({
        name: false,
        totalPrice: false,
        quantity: false,
        paymentStatus: false,
        dueDatePayment: false,
        invoiceDetails: false,
        idUser: false,
        idClient: false,
        idProduct: false
    });
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [show, setShow] = useState<boolean>(false);
    const [loading, setLoading]= useState<boolean>(true);

    useEffect(() => {
        const setFromLocalStorage = () =>{
            const savedInvoice = localStorage.getItem("invoice");
            if (savedInvoice) {
                try {
                    setInvoice(JSON.parse(savedInvoice));
                } catch (error) {
                    console.error("Error parsing invoice from localStorage:", error);
                }
            }

            const savedInputFields = localStorage.getItem("inputFields");

            if (savedInputFields) {
                try {
                    const parsedFields = JSON.parse(savedInputFields);
                    if (Array.isArray(parsedFields) && parsedFields.length > 0) {
                        setInputFields(parsedFields);
                        return;
                    }else{
                        console.log("made it here")
                        setInputFields([{ id: 1, productId: "", productName: "", description: "", quantity: "", price: "" }]);
                        return;
                    }
                } catch (error) {
                    console.error("Error parsing inputFields from localStorage:", error);
                }
            }
        }

        setFromLocalStorage();
    }, []);

    useEffect(() => {
        const getInvoiceCreateForm = async () => {
            try {
                const clientGetSingleResponse = await clientGetSingle(Number(props.idClient), memoizedHeaders);
                const settingsResponse = await settingGetAllByUser(memoizedUser.idUser, memoizedHeaders);
                const invoiceCreateFormResponse =
                    memoizedUser.idRole.name === "admin"
                        ? await InvoiceCreateFormGet(memoizedHeaders)
                        : await InvoiceCreateFormGetByUser(memoizedUser.idUser, memoizedHeaders);

                if (clientGetSingleResponse && settingsResponse.settings && invoiceCreateFormResponse) {
                    setInvoice((prevInvoice) => ({
                        ...prevInvoice,
                        idClient: clientGetSingleResponse.client,
                    }));
                    setInvoiceCreateForm(invoiceCreateFormResponse);
                    setSetting(settingsResponse.settings[0]);
                    setLoading(false);
                }
            } catch (error) {
                console.error("Error fetching invoice form data:", error);
            }
        };

        getInvoiceCreateForm();
    }, [props.idClient, memoizedHeaders, memoizedUser.idRole.name, memoizedUser.idUser]);

    useEffect(() => {
        if (invoice) localStorage.setItem("invoice", JSON.stringify(invoice));
    }, [invoice]);

    useEffect(() => {
        if (inputFields) localStorage.setItem("inputFields", JSON.stringify(inputFields));
    }, [inputFields]);

    const onInputChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        handleChange(e, setInvoice);
        handleErrors(e, setErrors);
    };

    const onDateChange = (date: Date | null) => {
        handleDateChange(date, 'dueDatePayment', setInvoice);
    };

    const onSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = event.target;
        if (invoiceCreateForm?.products) {
            const product = invoiceCreateForm.products.find(
                (product: Product) => product.idProduct === Number(value)
            );

            if (product) {
                setSelectedProduct(product);
                setInvoice((prevInvoice) => ({
                    ...prevInvoice,
                    idProduct: product,
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
                    <h1 className="text-xl font-bold mb-5">Add Invoice</h1>
                    <div className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-3">
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
                                    value={invoice?.name}
                                    onChange={onInputChange}
                                    autoComplete="name"
                                    className={`block w-full rounded-lg border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset text-sm sm:leading-6 ${
                                        errors.name ? 'ring-red-600 focus:ring-red-600' : 'ring-gray-300 focus:ring-blue-600'
                                    }`}
                                />
                            </div>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label htmlFor="dueDatePayment"
                                   className={`block text-sm font-semibold leading-6 ${errors.dueDatePayment ? 'text-red-600' : 'text-gray-900'}`}>
                                Due Date Payment
                            </label>
                            <div className="mt-[0.58rem]">
                                <Datepicker options={options} value={invoice?.dueDatePayment ? new Date(invoice.dueDatePayment) : undefined} onChange={onDateChange}
                                            show={show}
                                            setShow={(value) => setShow(value)}/>
                            </div>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
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
                                    {invoiceCreateForm?.products && invoiceCreateForm?.products.map((product: Product) => (
                                        <option key={product.idProduct} value={product.idProduct}>
                                            {product.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {invoice?.idProduct &&
                            <div className="col-span-2 sm:col-end-4 flex justify-end">
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
                        <div className="col-span-3 border-t border-gray-200">
                            <DetailsInput inputFields={inputFields} setInputFields={setInputFields}
                                          setInvoice={setInvoice} invoice={invoice}
                                          inputFieldsErrors={inputFieldsErrors}
                                          setInputFieldsErrors={setInputFieldsErrors} setting={setting}
                                          onInputChange={onInputChange}/>
                        </div>
                        <div className="col-span-3">
                            <InvoiceCreateButtons setLoading={setLoading} setInputFieldsErrors={setInputFieldsErrors}
                                                  inputFieldsErrors={inputFieldsErrors} invoice={invoice} user={user}
                                                  idClient={props.idClient} errors={errors}
                                                  setErrors={setErrors} headers={headers} inputFields={inputFields}
                                                  setInputFields={setInputFields}
                            />
                        </div>
                    </div>
                </form>
            )}
        </>
    )
}