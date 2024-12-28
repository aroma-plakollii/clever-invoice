'use client';
import { useRouter } from "next/navigation";
import { invoiceCreate } from "@/app/api/invoiceService";
import { User } from "@/app/types/user";
import { Invoice, InvoiceError } from "@/app/types/invoice";
import Link from "next/link";

interface InvoiceCreateButtonsProps{
    invoice: Invoice | undefined;
    user: User | undefined;
    idClient: string | string[];
    errors: InvoiceError;
    setErrors: React.Dispatch<React.SetStateAction<any>>;
    setLoading: React.Dispatch<React.SetStateAction<any>>;
    headers: Record<string, string>;
    inputFields: any[];
    setInputFields: React.Dispatch<React.SetStateAction<any>>;
    inputFieldsErrors: any[];
    setInputFieldsErrors: React.Dispatch<React.SetStateAction<any[]>>;
}

export const InvoiceCreateButtons : React.FC<InvoiceCreateButtonsProps> = (props) => {
    const router = useRouter();

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        props.setLoading(true);
        let foundFirstFilledField = false;

        const inputFieldsErrors = props.inputFields?.map((field: any, index: number) => {
            const isSetFilled = field.productName || field.description || field.quantity || field.price;

            if (!foundFirstFilledField) {
                foundFirstFilledField = true;
                return {
                    productName: !field.productName,
                    description: !field.description,
                    quantity: !field.quantity,
                    price: !field.price,
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
        if (hasMainErrors || hasInputFieldsErrors) {
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
                    paymentStatus: props.invoice?.paymentStatus ? props.invoice.paymentStatus : 'unpaid',
                    dueDatePayment: props.invoice?.dueDatePayment,
                    invoiceDetails: filteredInputFields,
                    idUser: props.user,
                    idClient: props.invoice?.idClient,
                    idProduct: props.invoice?.idProduct,
                };

                console.log(invoiceData);

                const res = await invoiceCreate(invoiceData, props.headers);
                if (res) {
                    router.push(`/clients/edit/${props.idClient}`);
                }
            }
        } catch (error) {
            console.error('Invoice creation failed', error);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row sm:justify-end">
            <Link href={`/clients/edit/${props.idClient}`} onClick={() => props.setLoading(true)}
                  className="order-1 sm:order-none w-full sm:w-3/12 xl:w-2/12 mr-0 sm:mr-2">
                <button
                    className="w-full py-2 rounded-md bg-gray-400 hover:bg-gray-500 text-sm font-medium text-white">
                    Cancel
                </button>
            </Link>
            <button
                onClick={onSubmit}
                type="submit"
                className="w-full sm:w-3/12 xl:w-2/12 rounded-md bg-black hover:bg-black-900 px-7 py-2 mb-2 sm:mb-0 text-sm font-medium text-white">
                Add
            </button>
        </div>
    )
}