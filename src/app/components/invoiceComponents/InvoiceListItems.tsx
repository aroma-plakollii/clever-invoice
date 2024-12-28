'use client';
import { MdEdit, MdReceiptLong  } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import dayjs from "dayjs";
import { Invoice } from "@/app/types/invoice";
import Link from "next/link";

interface InvoiceListItemsProps {
    invoices: Invoice[];
    idClient: string | string[];
    onDelete: (id: number | undefined) => void;
    setLoading: React.Dispatch<React.SetStateAction<any>>;
}

export const InvoiceListItems: React.FC<InvoiceListItemsProps> = (props) => {
    return (
        <>
            <tbody>
            {props.invoices.map((invoice: Invoice) => {
                return (
                    <tr key={invoice.idInvoice} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {invoice.idInvoice}
                        </th>
                        {Number(props.idClient) === 0 &&
                            <td className="px-3 py-4">
                                {invoice.invoiceNumber}
                            </td>
                        }
                        <td className="px-6 py-4">
                            {invoice.name}
                        </td>
                        <td className="px-6 py-4">
                            {invoice.totalPrice}€
                        </td>
                        {Number(props.idClient) === 0 &&
                            <td className="px-6 py-4">
                                {invoice.paymentStatus}
                            </td>
                        }
                        {Number(props.idClient) === 0 &&
                            <td className="px-6 py-4">
                                {dayjs(invoice.dueDatePayment).format("DD-MM-YYYY")}
                            </td>
                        }
                        {Number(props.idClient) === 0 &&
                            <td className="px-6 py-4">
                                {invoice.idClient?.firstName} {invoice.idClient?.lastName}
                            </td>
                        }
                        {Number(props.idClient) === 0 &&
                            <td className="px-6 py-4">
                                {invoice.idProduct?.name}
                            </td>
                        }
                        <td className={`px-6 py-4 place-self-end block ${Number(props.idClient) === 0 ? "xl:flex xl:justify-end xl:items-center xl:h-[5rem]" : "block md:block md:h-[7.5rem] xl:flex xl:justify-end xl:items-center xl:h-[3rem] sm:flex sm:justify-end sm:items-center sm:h-[3rem]"}`}>
                            <Link href={`/invoices/receipt/${invoice.idInvoice}`} onClick={() => props.setLoading(true)}>
                                <MdReceiptLong  className={`text-xl text-white rounded-xl bg-gray-700 hover:bg-gray-800 px-4 ring-1 ring-inset ring-cyan-700/10 w-[3.3rem] h-[1.7rem] mr-0 sm:mr-2 xl:mr-2 mb-1 xl:mb-0`} />
                            </Link>
                            <Link href={`/invoices/edit/${invoice.idInvoice}`} onClick={() => props.setLoading(true)}>
                                <MdEdit className={`text-xl text-black rounded-xl bg-black-50 hover:bg-gray-200 px-4 ring-1 ring-inset ring-cyan-700/10 w-[3.3rem] h-[1.7rem] mr-0 sm:mr-2 xl:mr-2 mb-1 xl:mb-0`} />
                            </Link>
                            <IoMdTrash onClick={() => props.onDelete(invoice.idInvoice)} className="text-xl text-red-700 cursor-pointer rounded-xl bg-red-50 hover:bg-red-100 px-4 py-1 ring-1 ring-inset ring-pink-700/10 w-[3.3rem] h-[1.7rem]" />
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </>
    )
}