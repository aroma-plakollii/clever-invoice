'use client';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { setInvoices } from "@/app/features/invoices/invoiceSlice";
import { useHeaders } from "@/app/hooks/useHeaders";
import { useAuth } from "@/app/hooks/useAuth";
import { invoiceDelete, invoiceGetAllByClientPaged, invoiceGetAllByUserPaged, invoiceGetAllPaged } from "@/app/api/invoiceService";
import { Invoice } from "@/app/types/invoice";
import { Pagination } from "@/app/components/paginationComponent/Pagination";
import { InvoiceListItems } from "@/app/components/invoiceComponents/InvoiceListItems";
import AlertConfirm from "@/app/components/alertComponents/AlertConfirm";
import Link from "next/link";
import {TableLoader} from "@/app/components/loaderComponents/TableLoader";

interface InvoiceTableProps{
    idClient: string | string[];
}

export const InvoiceTable: React.FC<InvoiceTableProps> = (props) => {
    const headers = useHeaders();
    const dispatch = useDispatch();
    const { user } = useAuth();
    const invoices = useSelector((state: RootState) => state.invoices);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const [alertOpen, setAlertOpen] = useState<boolean>(false);
    const [invoiceId, setInvoiceId] = useState<number | undefined>(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getInvoices = async () => {
            const pageData = {
                page: currentPage,
                itemsPerPage: 20
            };
            let invoicesResponse;

            if (Number(props.idClient) === 0) {
                invoicesResponse = user.idRole.name === 'admin'
                    ? await invoiceGetAllPaged(currentPage, headers)
                    : await invoiceGetAllByUserPaged(user.idUser, pageData, headers);
            } else {
                invoicesResponse = await invoiceGetAllByClientPaged(Number(props.idClient), pageData, headers);
            }

            if (invoicesResponse) {
                dispatch(setInvoices(invoicesResponse.invoices as Invoice[]));
                setTotalPages(invoicesResponse.totalPages);
                setLoading(false);
            }
        };

        getInvoices();
    }, [dispatch, currentPage, isDeleted, headers, props.idClient, user.idRole.name, user.idUser]);

    const onDelete = async (id: number | undefined) => {
        setAlertOpen(true);
        setInvoiceId(id);
    };

    const onCloseAlert = async (confirm: any) => {
        if (confirm === 'confirm') {
            const isDeleted = await invoiceDelete(invoiceId, headers);

            if (isDeleted) {
                setIsDeleted(true);
                setAlertOpen(false);
                setInvoiceId(0);
            }
        } else if (confirm === 'cancel') {
            setAlertOpen(false);
            setInvoiceId(0);
        }
    };

    return (
        <>
            <div className="relative">
                <div className={`${Number(props.idClient) === 0 ? "w-[97%]" : "w-full flex justify-between"} mx-auto mb-4`}>
                    <h1 className="text-xl font-bold mb-3 uppercase">Invoices</h1>
                    {Number(props.idClient) > 0 && (
                        <Link href={`/invoices/add/${props.idClient}`} onClick={() => setLoading(true)}>
                            <button className="inline-flex items-center rounded-md bg-black hover:bg-gray-900 px-7 py-2 text-sm font-medium text-white mb-3">
                                Add
                            </button>
                        </Link>
                    )}
                </div>
                {loading ? (
                    <TableLoader />
                ) : (
                    <>
                        {invoices.length === 0 ? (
                            <div className={`overflow-x-auto ${Number(props.idClient) === 0 ? "shadow-xl w-[98%] px-5" : "w-[95%]"} rounded-xl mx-auto py-5`}>
                                <p className="font-medium">No invoices</p>
                            </div>
                        ) : (
                            <div className={`overflow-x-auto ${Number(props.idClient) === 0 ? "shadow-xl w-[98%]" : "w-full shadow-xl md:shadow-none border border-gray-200"} rounded-xl mx-auto`}>
                                <table className="min-w-full text-sm text-left shadow-2xl rounded-2xl rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">Id</th>
                                        {Number(props.idClient) === 0 && <th scope="col" className="px-3 py-3">Invoice Number</th>}
                                        <th scope="col" className="px-6 py-3">Name</th>
                                        <th scope="col" className="px-6 py-3">Total Price</th>
                                        {Number(props.idClient) === 0 && <th scope="col" className="px-6 py-3">Payment Status</th>}
                                        {Number(props.idClient) === 0 && <th scope="col" className="px-6 py-3">Due Date Payment</th>}
                                        {Number(props.idClient) === 0 && <th scope="col" className="px-6 py-3">Client</th>}
                                        {Number(props.idClient) === 0 && <th scope="col" className="px-6 py-3">Product</th>}
                                        <th scope="col" className="px-6 py-3"></th>
                                    </tr>
                                    </thead>
                                    <InvoiceListItems setLoading={setLoading} idClient={props.idClient} invoices={invoices} onDelete={onDelete} />
                                </table>
                            </div>
                        )}
                    </>
                )}
                {invoices.length > 1 && (
                    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
                )}
            </div>
            {alertOpen && (
                <AlertConfirm
                    title="You are deleting the invoice"
                    message="Are you sure you want to delete the invoice?"
                    isOpen={alertOpen}
                    onClose={onCloseAlert}
                />
            )}
        </>
    );
};