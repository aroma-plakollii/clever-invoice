'use client';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useHeaders } from "@/app/hooks/useHeaders";
import { useAuth } from "@/app/hooks/useAuth";
import { setUsers } from "@/app/features/users/userSlice";
import { userDelete, userGetAllPaged } from "@/app/api/userService";
import { User } from "@/app/types/user";
import { UserListItems } from "@/app/components/userComponents/UserListItems";
import { Pagination } from "@/app/components/paginationComponent/Pagination";
import AlertConfirm from "@/app/components/alertComponents/AlertConfirm";
import Link from "next/link";
import {TableLoader} from "@/app/components/loaderComponents/TableLoader";

export const UserTable = () => {
    const headers = useHeaders();
    const dispatch = useDispatch();
    const { user } = useAuth();
    const users = useSelector((state: RootState) => state.users);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const [alertOpen, setAlertOpen]= useState<boolean>(false);
    const [userId, setUserId]= useState<number | undefined>(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading]= useState<boolean>(true);

    useEffect(() => {
        const getUsers = async () => {
            const usersResponse = user.idRole.name === 'admin' ? await userGetAllPaged(currentPage, headers) : null;

            if(usersResponse){
                dispatch(setUsers(usersResponse.users as User[]));
                setTotalPages(usersResponse.totalPages);
                setLoading(false);
            }else {
                dispatch(setUsers(user as User));
                setLoading(false);
            }
        }

        getUsers();
    }, [dispatch, currentPage, isDeleted, headers, user]);

    const onDelete = async (id: number | undefined) => {
        setAlertOpen(true);
        setUserId(id);
    };

    const onCloseAlert = async (confirm: any) => {
        if (confirm === 'confirm') {
            const isDeleted = await userDelete(userId, headers);

            if (isDeleted) {
                setIsDeleted(true);
                setAlertOpen(false);
                setUserId(0);
            }
        } else if(confirm === 'cancel'){
            setAlertOpen(false);
            setUserId(0);
        }
    }

    return (
        <>
        <div className="relative">
            <div className="w-[95%] mx-auto flex justify-between">
                <h1 className="text-xl font-bold mb-3">{users.length === 1 ? "User" : "Users"}</h1>
                {user.idRole.name === 'admin' && <Link href={"/users/add"} onClick={() => setLoading(true)}>
                    <button
                        className="inline-flex items-center rounded-md bg-black hover:bg-gray-900 px-7 py-2 text-sm font-medium text-white mb-3">
                        Add
                    </button>
                </Link>}
            </div>
            {loading ? <TableLoader /> : (
                <>
                {users.length === 0 ?
                    <div className={`overflow-x-auto shadow-xl w-[98%] p-5 rounded-xl mx-auto`}>
                        <p className="font-medium">No users</p>
                    </div> : (
                        <div className="overflow-x-auto shadow-xl rounded-xl w-[95%] mx-auto">
                            <table
                                className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
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
                                        Role
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                    </th>
                                </tr>
                                </thead>
                                <UserListItems setLoading={setLoading} users={users} onDelete={onDelete}/>
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
                title={'You are deleting the user'}
                message={'Are you sure you want to delete the user?'}
                isOpen={alertOpen}
                onClose={onCloseAlert}
            />}
        </>
    )
}