'use client';
import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { Client } from "@/app/types/clients";
import Link from "next/link";

interface ClientListItemsProps {
    clients: Client[];
    onDelete: (id: number | undefined) => void;
    setLoading: React.Dispatch<React.SetStateAction<any>>;
}

export const ClientListItems: React.FC<ClientListItemsProps> = (props) => {
    return (
        <>
            <tbody>
            {props.clients.map((client: Client) => {
                return (
                    <tr key={client.idClient} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {client.idClient}
                        </th>
                        <td className="px-6 py-4">
                            {client.firstName} {client.lastName}
                        </td>
                        <td className="px-6 py-4">
                            {client.email}
                        </td>
                        <td className="px-6 py-4">
                            {client.phone}
                        </td>
                        <td className="px-6 py-4 text-right block xl:flex xl:justify-end">
                            <Link href={`/clients/edit/${client.idClient}`} onClick={() => props.setLoading(true)}>
                                <MdEdit className="text-xl text-black rounded-xl bg-gray-50 hover:bg-gray-200 px-4 ring-1 ring-inset ring-cyan-700/10 w-[3.3rem] h-[1.7rem] mr-0 xl:mr-2 mb-1.5 xl:mb-0" />
                            </Link>
                            <IoMdTrash onClick={() => props.onDelete(client.idClient)} className="text-xl text-red-700 cursor-pointer rounded-xl bg-red-50 hover:bg-red-100 px-4 py-1 ring-1 ring-inset ring-pink-700/10 w-[3.3rem] h-[1.7rem]" />
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </>
    )
}