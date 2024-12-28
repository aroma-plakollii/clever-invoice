import { Invoice } from "@/app/types/invoice";
import { Setting } from "@/app/types/setting";
import Image from 'next/image';
import dayjs from "dayjs";
import {useEffect, useState} from "react";

interface InvoiceTestProps {
    id: any,
    invoice: Invoice | undefined;
    setting: Setting | undefined;
    image: string;
}

export const InvoiceReceiptContent: React.FC<InvoiceTestProps> = (props) => {
    const [subtotal, setSubtotal] = useState(0);
    const [taxAmount, setTaxAmount] = useState(0);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const taxRate = props.setting?.tax || 0;
        const discountRate = props.invoice?.discount || 0;

        if (props.invoice?.invoiceDetails) {
            const newSubtotal = props.invoice.invoiceDetails.reduce((sum, field) => {
                const quantity = typeof field.quantity === 'string' ? parseFloat(field.quantity) : field.quantity || 0;
                const price = typeof field.price === 'string' ? parseFloat(field.price) : field.price || 0;
                return sum + (quantity * price);
            }, 0);

            let discountedSubtotal = newSubtotal;
            if (discountRate > 0) {
                const discountAmount = newSubtotal * (discountRate / 100);
                discountedSubtotal = newSubtotal - discountAmount;
            }

            const newTaxAmount = discountedSubtotal * (taxRate / 100);
            const newTotal = discountedSubtotal + newTaxAmount;

            setSubtotal(discountedSubtotal);
            setTaxAmount(newTaxAmount);
            setTotal(newTotal);
        }
    }, [props.invoice?.invoiceDetails, props.setting?.tax, props.invoice?.discount]);

    return (
        <div id={props.id} className="w-full m-auto">
            <div className="flex justify-between">
                <div>
                    <h1 className="text-3xl font-bold uppercase mt-4">Invoice</h1>
                    <p className="text-sm uppercase">{props.invoice?.invoiceNumber}</p>
                    <p className="text-sm">
                        Invoice date: <strong>{dayjs(props.invoice?.createdAt).format('DD.MM.YYYY')}</strong>
                        <br />
                        Due date: <strong>{dayjs(props.invoice?.dueDatePayment).format('DD.MM.YYYY')}</strong>
                    </p>
                </div>
                <div>
                    <Image
                        src={props.image}
                        alt="Lockup"
                        width={150}
                        height={40}
                        className="object-contain"
                    />
                </div>
            </div>
            <div className="border-t-2 border-gray-200 mt-6 pt-6 flex justify-between">
                <div>
                    <p className="text-sm">
                        {props.setting?.name}
                        <br />
                        {props.setting?.email}
                        <br />
                        {props.setting?.address}, {props.setting?.city}
                        <br />
                        {props.setting?.phone}
                        <br />
                        {props.setting?.customFields &&
                            Object.entries(props.setting.customFields).map(([key, value], index) => (
                                <span key={index}>
                                    <b className="capitalize">{key}</b>: {value !== undefined && value !== null ? String(value) : ''}
                                    <br />
                                </span>
                            ))}
                    </p>
                </div>
                <div>
                    <p className="text-sm">
                        {`${props.invoice?.idClient?.firstName} ${props.invoice?.idClient?.lastName}`}
                        <br />
                        {props.invoice?.idClient?.email}
                        <br />
                        {props.invoice?.idClient?.phone}
                    </p>
                </div>
            </div>
            {props.invoice?.invoiceDetails && props.invoice.invoiceDetails.length > 0 && (
                <table className="mt-20 w-full">
                    <thead>
                    <tr className="border-b-2 border-gray-200">
                        <th className="p-2 text-left w-[5%]">Id</th>
                        <th className="p-2 text-left w-[20%]">Product</th>
                        <th className="p-2 text-left w-[45%]">Description</th>
                        <th className="p-2 text-left w-[15%]">Quantity</th>
                        <th className="p-2 text-left w-[5%]">Price</th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.invoice?.invoiceDetails.map((invoiceDetail) => (
                        <tr key={invoiceDetail.id} className="border-b-2 border-gray-200">
                            <td className="p-2 w-[5%]">{invoiceDetail.id}</td>
                            <td className="p-2 w-[20%]">{invoiceDetail.productName}</td>
                            <td className="p-2 w-[45%]">{invoiceDetail.description}</td>
                            <td className="p-2 w-[15%]">{invoiceDetail.quantity}</td>
                            <td className="p-2 w-[5%] text-right">{Number(invoiceDetail.price).toFixed(2)}€</td>
                        </tr>
                    ))}
                    </tbody>
                    <tfoot>
                    <tr className="py-3">
                        <td colSpan={3} className="border-t border-gray-200"></td>
                        <td colSpan={2} className="p-2 border-t border-b-2 border-gray-200">
                            <div className="flex justify-between">
                                <span className="font-bold text-base mr-4">Sub Total:</span>
                                {subtotal.toFixed(2)}€
                            </div>
                        </td>
                    </tr>
                    <tr className="py-3">
                        <td colSpan={3}></td>
                        <td colSpan={2} className="p-2 border-b-2 border-gray-200">
                            <div className="flex justify-between">
                                <span className="font-bold text-base mr-4">Tax({props.setting?.tax}%):</span>
                                {taxAmount.toFixed(2)}€
                            </div>
                        </td>
                    </tr>
                    {props.invoice.discount ? (
                        <tr className="py-3">
                            <td colSpan={3}></td>
                            <td colSpan={2} className="p-2 border-b-2 border-gray-200">
                                <div className="flex justify-between">
                                    <span className="font-bold text-base mr-4">Discount:</span>
                                    -{props.invoice.discount}%
                                </div>
                            </td>
                        </tr>) : ""
                    }
                    <tr className="py-3">
                        <td colSpan={3}></td>
                        <td colSpan={2} className="p-2 border-b-2 border-gray-200">
                            <div className="flex justify-between">
                                <span className="font-bold text-base mr-4">Total:</span>
                                {total.toFixed(2)}€
                            </div>
                        </td>
                    </tr>
                    </tfoot>
                </table>
            )}
        </div>
    );
};
