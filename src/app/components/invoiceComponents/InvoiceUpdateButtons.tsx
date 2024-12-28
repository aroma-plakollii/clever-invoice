'use client';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Invoice, InvoiceError } from "@/app/types/invoice";
import { invoiceUpdate } from "@/app/api/invoiceService";

interface InvoiceUpdateButtonsProps{
    invoice: Invoice | undefined;
    errors: InvoiceError;
    setErrors: React.Dispatch<React.SetStateAction<any>>;
    setLoading: React.Dispatch<React.SetStateAction<any>>;
    headers: Record<string, string>;
    inputFields: any[] | undefined;
    setInputFields: React.Dispatch<React.SetStateAction<any>>;
    inputFieldsErrors: any[];
    setInputFieldsErrors: React.Dispatch<React.SetStateAction<any[]>>;
    paymentStatus: string | undefined;
}

export const InvoiceUpdateButtons : React.FC<InvoiceUpdateButtonsProps> = (props) => {
    const router = useRouter();
    const id = Number(props.invoice?.idInvoice);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        props.setLoading(true);
        let foundFirstFilledField = false;

        const inputFieldsErrors = props.inputFields?.map((field: any) => {
            const isFieldFilled = field.productName || field.description || field.quantity || field.price;

            if (!foundFirstFilledField && isFieldFilled) {
                foundFirstFilledField = true;
            }

            if (foundFirstFilledField) {
                return {
                    productName: !field.productName && isFieldFilled,
                    description: !field.description && isFieldFilled,
                    quantity: !field.quantity && isFieldFilled,
                    price: !field.price && isFieldFilled,
                };
            }

            return {
                productName: false,
                description: false,
                quantity: false,
                price: false,
            };
        }) || [];

        props.setInputFieldsErrors(inputFieldsErrors);

        const hasInputFieldsErrors = inputFieldsErrors.some((fieldError: any) => {
            return Object.values(fieldError).some(error => error);
        });

        const updatedErrors = {
            name: !props.invoice?.name,
            totalPrice: !props.invoice?.totalPrice,
            dueDatePayment: !props.invoice?.dueDatePayment,
            idClient: !props.invoice?.idClient,
            idProduct: !props.invoice?.idProduct,
        };

        props.setErrors(updatedErrors);

        const hasMainErrors = Object.values(updatedErrors).some(error => error);
        if (hasMainErrors || hasInputFieldsErrors){
            props.setLoading(false);
            return;
        }

        try {
            if (props.inputFields) {
                const filteredInputFields = props.inputFields.filter(field => {
                    return field.productName || field.description || field.quantity || field.price;
                });

                const invoiceData = {
                    name: props.invoice?.name,
                    totalPrice: props.invoice?.totalPrice,
                    discount: props.invoice?.discount,
                    paymentStatus: props.invoice?.paymentStatus,
                    dueDatePayment: props.invoice?.dueDatePayment,
                    invoiceDetails: filteredInputFields,
                    idUser: props.invoice?.idUser,
                    idClient: props.invoice?.idClient,
                    idProduct: props.invoice?.idProduct,
                };

                const res = await invoiceUpdate(id, invoiceData, props.headers);

                if (res) {
                    router.push('/invoices');
                }
            }
        } catch (error) {
            console.error('Invoice update failed', error);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row sm:justify-end">
            <Link href={"/invoices"} onClick={() => props.setLoading(true)}
                  className={`order-1 sm:order-none w-full sm:w-3/12 xl:w-2/12 ${props.paymentStatus === "unpaid" ? "sm:mr-2" : "sm:mr-0"}`}>
                <button
                    className="w-full py-2 rounded-md bg-gray-400 hover:bg-gray-500 text-sm font-medium text-white">
                    Cancel
                </button>
            </Link>
            {props.paymentStatus === "unpaid" &&
                <button
                    onClick={onSubmit}
                    type="submit"
                    className="w-full sm:w-3/12 xl:w-2/12 rounded-md bg-black hover:bg-black-900 px-7 py-2 mb-2 sm:mb-0 text-sm font-medium text-white">
                    Edit
                </button>
            }
        </div>
    )
}