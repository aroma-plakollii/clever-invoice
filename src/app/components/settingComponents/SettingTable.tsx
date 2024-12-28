'use client';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { setSettings } from "@/app/features/settings/settingSlice";
import { useHeaders } from "@/app/hooks/useHeaders";
import { useAuth } from "@/app/hooks/useAuth";
import { settingDelete, settingGetAllByUserPaged, settingGetAllPaged } from "@/app/api/settingService";
import { Setting } from "@/app/types/setting";
import { Pagination } from "@/app/components/paginationComponent/Pagination";
import { SettingListItems } from "@/app/components/settingComponents/SettingListItems";
import AlertConfirm from "@/app/components/alertComponents/AlertConfirm";
import Link from "next/link";
import {TableLoader} from "@/app/components/loaderComponents/TableLoader";
export const SettingTable = () => {
    const headers = useHeaders();
    const dispatch = useDispatch();
    const { user } = useAuth();
    const settings = useSelector((state: RootState) => state.settings);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const [alertOpen, setAlertOpen]= useState<boolean>(false);
    const [settingId, setSettingId]= useState<number | undefined>(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState<number | undefined>(1);
    const [loading, setLoading]= useState<boolean>(true);

    useEffect(() => {
        const getSettings = async () => {
            const pageData = {
                page: currentPage,
                itemsPerPage: 20
            }
            const settingsResponse =  user.idRole.name === 'admin' ? await settingGetAllPaged(currentPage, headers) : await settingGetAllByUserPaged(user.idUser, pageData, headers);

            if(settingsResponse){
                dispatch(setSettings(settingsResponse.settings as Setting[]));
                setTotalPages(settingsResponse.totalPages);
                setLoading(false);
            }
        }

        getSettings();
    }, [dispatch, currentPage, isDeleted, headers, user.idRole.name, user.idUser]);

    const onDelete = async (id: number | undefined) => {
        setAlertOpen(true);
        setSettingId(id);
    };

    const onCloseAlert = async (confirm: any) => {
        if (confirm === 'confirm') {
            const isDeleted = await settingDelete(settingId, headers);

            if (isDeleted) {
                setIsDeleted(true);
                setAlertOpen(false);
                setSettingId(0);
            }
        } else if(confirm === 'cancel'){
            setAlertOpen(false);
            setSettingId(0);
        }
    }

    return (
        <>
            <div className="relative">
                <div className="w-[98%] mx-auto flex justify-between">
                    <h1 className="text-xl uppercase font-bold">{user.idRole.name === 'admin' ? "Companies" : "Company Details"}</h1>
                    <Link href={"/settings/add"} onClick={() => setLoading(true)}>
                        {user.idRole.name === 'admin' && <button
                            className="inline-flex items-center rounded-md bg-black px-7 py-2 text-sm font-medium text-white mb-3 hover:bg-gray-900">
                            Add
                        </button>}
                    </Link>
                </div>
                {loading ? <TableLoader /> : (
                    <>
                    {settings.length === 0 ?
                        <div className={`overflow-x-auto shadow-xl w-[98%] p-5 rounded-xl mx-auto`}>
                            <p className="font-medium">No companies</p>
                        </div> : (
                            <div className="overflow-x-auto shadow-xl rounded-xl w-[98%] mx-auto">
                                <table
                                    className="w-full mx-auto text-sm text-left rounded-xl rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead
                                        className="text-xs text-gray-700 rounded-t-xl uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                    <tr className="rounded-t-xl">
                                        <th scope="col" className="px-6 py-3 rounded-ss-2xl">
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
                                            Address
                                        </th>
                                        <th scope="col" className="px-6 py-3 rounded-se-xl">
                                        </th>
                                    </tr>
                                    </thead>
                                    <SettingListItems setLoading={setLoading} settings={settings} onDelete={onDelete}/>
                                </table>
                            </div>
                        )}
                    </>
                )}
                {user.idRole.name === 'admin' && <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />}
            </div>
            {alertOpen && <AlertConfirm
                title={'You are deleting the company'}
                message={'Are you sure you want to delete the company?'}
                isOpen={alertOpen}
                onClose={onCloseAlert}
            />}
        </>
    )
}