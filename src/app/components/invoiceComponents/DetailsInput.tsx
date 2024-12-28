import {Invoice, InvoiceDetails} from "@/app/types/invoice";
import {FaPlus} from "react-icons/fa6";
import {IoMdTrash} from "react-icons/io";
import {Setting} from "@/app/types/setting";
import {ChangeEvent, useEffect, useState} from "react";

interface DetailsInputProps {
    inputFields: any[];
    setInputFields: React.Dispatch<React.SetStateAction<any>>;
    setInvoice: React.Dispatch<React.SetStateAction<Invoice | undefined>>; // Allow undefined
    invoice: Invoice | undefined;
    inputFieldsErrors: any[];
    setInputFieldsErrors: React.Dispatch<React.SetStateAction<any[]>>;
    setting: Setting | undefined;
    onInputChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => void;
}

export const DetailsInput: React.FC<DetailsInputProps> = (props) => {
    const { invoice, setting, inputFields, inputFieldsErrors, setInputFields, setInputFieldsErrors, onInputChange, setInvoice } = props;

    const [subtotal, setSubtotal] = useState(0);
    const [taxAmount, setTaxAmount] = useState(0);
    const [total, setTotal] = useState(0);
    const [showDiscount, setShowDiscount] = useState(!!invoice?.discount);

    useEffect(() => {
        if (invoice) {
            const taxRate = setting?.tax || 0;
            const discountRate = invoice?.discount || 0;

            const newSubtotal = inputFields.reduce((sum, field) => {
                const quantity = parseFloat(field.quantity) || 0;
                const price = parseFloat(field.price) || 0;
                return sum + quantity * price;
            }, 0);

            let discountedSubtotal = newSubtotal;
            if (discountRate > 0) {
                const discountAmount = newSubtotal * (discountRate / 100);
                discountedSubtotal = newSubtotal - discountAmount;
            }

            const newTaxAmount = discountedSubtotal * (taxRate / 100);
            const newTotal = discountedSubtotal + newTaxAmount;

            // Avoid redundant updates
            if (subtotal !== discountedSubtotal) setSubtotal(discountedSubtotal);
            if (taxAmount !== newTaxAmount) setTaxAmount(newTaxAmount);
            if (total !== newTotal) setTotal(newTotal);

            // Update the invoice only if totalPrice has changed
            if (invoice.totalPrice !== newTotal) {
                setInvoice((prevInvoice) => ({
                    ...prevInvoice,
                    totalPrice: newTotal,
                }));
            }
        }
    }, [subtotal, taxAmount, total, setInvoice, setting?.tax, invoice, inputFields]);

    const handleAddInput = () => {
        const newField: InvoiceDetails = {
            id: inputFields.length + 1,
            productId: '',
            productName: '',
            description: '',
            quantity: '',
            price: '',
        };
        setInputFields([...inputFields, newField]);
        setInputFieldsErrors([...inputFieldsErrors, { productName: false, description: false, quantity: false, price: false }]);
    };

    const handleInputChange = (index: number, field: keyof InvoiceDetails, value: any) => {
        const updatedFields = [...inputFields];
        updatedFields[index][field] = value;
        setInputFields(updatedFields);

        const updatedErrors = Array.isArray(inputFieldsErrors) ? [...inputFieldsErrors] : [];
        const isSetFilled = updatedFields[index].productName || updatedFields[index].description || updatedFields[index].quantity || updatedFields[index].price;

        if (isSetFilled) {
            updatedErrors[index] = {
                ...updatedErrors[index],
                [field]: !value,
            };
        } else {
            updatedErrors[index] = {
                productName: false,
                description: false,
                quantity: false,
                price: false,
            };
        }

        setInputFieldsErrors(updatedErrors);
    };

    const handleDeleteInput = (index: number) => {
        if (inputFields.length === 1) {
            const updatedFields = [...inputFields];
            updatedFields[index] = {
                ...updatedFields[index],
                productName: '',
                description: '',
                quantity: '',
                price: '',
            };
            setInputFields(updatedFields);
        } else {
            const updatedFields = inputFields.filter((_, i) => i !== index).map((field, i) => ({ ...field, id: i + 1 }));
            setInputFields(updatedFields);
            const updatedErrors = inputFieldsErrors.filter((_, i) => i !== index);
            setInputFieldsErrors(updatedErrors);
        }
    };

    return (
        <>
            <div className="overflow-x-auto w-full">
                <table className="mt-5 w-[40rem] sm:w-full">
                    <thead>
                    <tr className="border-b-2 border-gray-200">
                        <th className="p-2 text-sm text-left w-[5%]">Id</th>
                        <th className="p-2 text-sm text-left w-[20%]">Product</th>
                        <th className="p-2 text-sm text-left w-[40%]">Description</th>
                        <th className="p-2 text-sm text-left w-[15%]">Quantity</th>
                        <th className="p-2 text-sm text-left w-[15%]">Price</th>
                        <th className="p-2 text-sm text-left w-[5%]"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {inputFields.map((field, index) => (
                        <tr key={index} className="border-b-2 border-gray-200">
                            <td className="p-1.5 text-sm w-[5%]">{index + 1}</td>
                            <td className="p-1.5 w-[20%]">
                                <input
                                    type="text"
                                    placeholder="Product"
                                    value={field.productName}
                                    onChange={(e) => handleInputChange(index, 'productName', e.target.value)}
                                    className={`p-1 text-sm border ${inputFieldsErrors?.[index]?.productName ? 'border-red-500' : 'border-gray-300'} rounded-sm w-full`}
                                />
                            </td>
                            <td className="p-1.5 w-[45%]">
                                <input
                                    type="text"
                                    placeholder="Description"
                                    value={field.description}
                                    onChange={(e) => handleInputChange(index, 'description', e.target.value)}
                                    className={`p-1 text-sm border ${inputFieldsErrors?.[index]?.description ? 'border-red-500' : 'border-gray-300'} rounded-sm w-full`}
                                />
                            </td>
                            <td className="p-1.5 w-[15%]">
                                <input
                                    type="text"
                                    placeholder="Quantity"
                                    value={field.quantity}
                                    onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
                                    className={`p-1 text-sm border ${inputFieldsErrors?.[index]?.quantity ? 'border-red-500' : 'border-gray-300'} rounded-sm w-full`}
                                />
                            </td>
                            <td className="p-1.5 w-[15%]">
                                <input
                                    type="text"
                                    placeholder="Price"
                                    value={field.price}
                                    onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                                    className={`p-1 text-sm border ${inputFieldsErrors?.[index]?.price ? 'border-red-500' : 'border-gray-300'} rounded-sm w-full`}
                                />
                            </td>
                            <td className="p-1.5 w-[5%]">
                                <IoMdTrash
                                    onClick={() => handleDeleteInput(index)}
                                    className="text-lg cursor-pointer text-red-600"
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <button
                type="button"
                onClick={handleAddInput}
                className="mt-3 inline-flex items-center px-3 py-1.5 border border-gray-200 text-xs sm:text-sm font-medium rounded-md shadow-sm text-black bg-gray-100 hover:bg-gray-200"
            >
                <FaPlus className="mr-2 text-white bg-black rounded-full p-[0.09rem] sm:p-0.5 text-sm sm:text-base mb-[0.13rem] sm:mb-0" />
                Add item
            </button>
            <div className="mt-5">
                <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>${taxAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                </div>
            </div>
        </>
    );
};