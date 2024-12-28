'use client'
import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { useAuth } from "@/app/hooks/useAuth";
import { Setting } from "@/app/types/setting";
import Link from "next/link";

interface SettingListItemsProps {
    settings: Setting[];
    onDelete: (id: number | undefined) => void;
    setLoading: React.Dispatch<React.SetStateAction<any>>;
}

export const SettingListItems: React.FC<SettingListItemsProps> = (props) => {
    const { user } = useAuth();
    return (
        <>
            <tbody>
            {props.settings.map((setting: Setting, index) => {
                return (
                    <tr key={setting.idSetting} className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700`}>
                        <th scope="row"
                            className={`${index === props.settings.length - 1 ? 'rounded-xl' : ''} px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white`}>
                            {setting.idSetting}
                        </th>
                        <td className="px-6 py-4">
                            {setting.name}
                        </td>
                        <td className="px-6 py-4">
                            {setting.email}
                        </td>
                        <td className="px-6 py-4">
                            {setting.phone}
                        </td>
                        <td className="px-6 py-4">
                            {setting.address} {setting.city}
                        </td>
                        <td className={`px-6 py-4 text-right block xl:flex xl:justify-end`}>
                            <Link href={`/settings/edit/${setting.idSetting}`} onClick={() => props.setLoading(true)}>
                                <MdEdit className="text-xl text-black rounded-xl bg-gray-50 hover:bg-gray-200 px-4 ring-1 ring-inset ring-cyan-700/10 w-[3.3rem] h-[1.7rem] mr-0 xl:mr-2 mb-1.5 xl:mb-0" />
                            </Link>
                            {user.idRole.name === "admin" &&
                                <IoMdTrash onClick={() => props.onDelete(setting.idSetting)} className="text-xl text-red-700 cursor-pointer rounded-xl bg-red-50 hover:bg-red-100 px-4 py-1 ring-1 ring-inset ring-pink-700/10 w-[3.3rem] h-[1.7rem]" />
                            }
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </>
    )
}