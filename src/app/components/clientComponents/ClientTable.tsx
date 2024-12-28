'use client';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { setClients } from "@/app/features/clients/clientSlice";
import { useHeaders } from "@/app/hooks/useHeaders";
import { useAuth } from "@/app/hooks/useAuth";
import { clientDelete, clientGetAllByUserPaged, clientGetAllPaged } from "@/app/api/clientService";
import { Client } from "@/app/types/clients";
import { Pagination } from "@/app/components/paginationComponent/Pagination";
import { ClientListItems } from "@/app/components/clientComponents/ClientListItems";
import AlertConfirm from "@/app/components/alertComponents/AlertConfirm";
import Link from "next/link";
import {TableLoader} from "@/app/components/loaderComponents/TableLoader";

export const ClientTable = () => {
    const headers = useHeaders();
    const dispatch = useDispatch();
    const { user } = useAuth();
    const clients = useSelector((state: RootState) => state.clients);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const [alertOpen, setAlertOpen]= useState<boolean>(false);
    const [clientId, setClientId]= useState<number | undefined>(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading]= useState<boolean>(true);

    useEffect(() => {
        const getClients = async () => {
            const pageData = {
                page: currentPage,
                itemsPerPage: 20
            }
            const clientsResponse =  user.idRole.name === 'admin' ? await clientGetAllPaged(currentPage, headers) : await clientGetAllByUserPaged(user.idUser, pageData, headers);

            if(clientsResponse){
                dispatch(setClients(clientsResponse.clients as Client[]));
                setTotalPages(clientsResponse.totalPages);
                setLoading(false);
            }
        }

        getClients();
    }, [dispatch, currentPage, isDeleted, headers, user.idRole.name, user.idUser]);

    const onDelete = async (id: number | undefined) => {
        setAlertOpen(true);
        setClientId(id);
    };

    const onCloseAlert = async (confirm: any) => {
        if (confirm === 'confirm') {
            const isDeleted = await clientDelete(clientId, headers);

            if (isDeleted) {
                setIsDeleted(true);
                setAlertOpen(false);
                setClientId(0);
            }
        } else if(confirm === 'cancel'){
            setAlertOpen(false);
            setClientId(0);
        }
    }

    return (
        <>
            <div className="relative">
                <div className="w-[98%] mx-auto flex justify-between">
                    <h1 className="text-xl uppercase font-bold mb-3">Clients</h1>
                    <Link href={"/clients/add"} onClick={() => setLoading(true)}>
                        <button
                            className="inline-flex items-center rounded-md bg-black hover:bg-black-900 px-7 py-2 text-sm font-medium text-white mb-3">
                            Add
                        </button>
                    </Link>
                </div>
                {loading ? <TableLoader /> : (
                    <>
                        {clients.length === 0 ?
                            <div className={`overflow-x-auto shadow-xl w-[98%] p-5 rounded-xl mx-auto`}>
                                <p className="font-medium">No clients</p>
                            </div> : (
                                <div className="overflow-x-auto shadow-xl rounded-xl w-[98%] mx-auto">
                                    <table
                                        className="min-w-full text-sm text-left shadow-2xl rounded-2xl rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead
                                            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Id
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Phone
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                            </th>
                                        </tr>
                                        </thead>
                                        <ClientListItems setLoading={setLoading} clients={clients} onDelete={onDelete}/>
                                    </table>
                                </div>
                            )}
                    </>
                )}
                {clients.length > 1 && <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />}
            </div>
            {alertOpen && <AlertConfirm
                title={'You are deleting the client'}
                message={'Are you sure you want to delete the client?'}
                isOpen={alertOpen}
                onClose={onCloseAlert}
            />}
        </>
    )
}