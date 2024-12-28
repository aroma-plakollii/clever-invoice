'use client';
import { IoReorderFourOutline } from "react-icons/io5";
import React, { useEffect, useState } from 'react';
import { useDispatch,useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { setSettings } from "@/app/features/settings/settingSlice";
import { useAuth } from "@/app/hooks/useAuth";
import { useHeaders } from "@/app/hooks/useHeaders";
import { settingGetAllByUser } from "@/app/api/settingService";
import { Setting } from "@/app/types/setting";
import SideNavLink from "@/app/components/layoutComponent/SideNavLink";
import Image from 'next/image';
import Link from "next/link";

interface SideNavProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: any;
}

export const SideNav: React.FC<SideNavProps> = (props) => {
    const { user } = useAuth();
    const headers = useHeaders();
    const dispatch = useDispatch();
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSettings = async () => {
            const settingsResponse = await settingGetAllByUser(user.idUser, headers);

            dispatch(setSettings(settingsResponse.settings as Setting[]));
            if (settingsResponse.settings) {
                const base64Image = settingsResponse.settings[0].image;
                setLoading(false);
                if (!base64Image.startsWith("data:image")) {
                    setImage(`data:image/png;base64,${base64Image}`);
                } else {
                    setImage(base64Image);
                }
            }
        };

        getSettings();
    }, [dispatch, headers, user.idUser]);


    const toggleSidebar = (e: React.MouseEvent) => {
        e.preventDefault();
        props.setIsSidebarOpen(false);
    };

    return (
        <aside
            className={`overflow-y-auto fixed w-full md:w-64 h-screen lg:h-[98%] lg:mx-3 my-0 lg:my-1.5 bg-white transition-transform duration-100 ease-in-out ${props.isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:rounded-2xl shadow-none md:shadow-2xl lg:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
            aria-label="Sidebar"
        >
            <div className="flex justify-end px-5 pt-5 mb-1 lg:hidden">
                <IoReorderFourOutline
                    onClick={toggleSidebar}
                    className="text-gray-600 bg-white h-8 w-8 flex-none rounded-full"
                />
            </div>
            <div className="flex justify-center">
                <Link href="/dashboard">
                    {loading ? (
                        <div className="h-32 w-32 lg:mt-4 bg-gray-200 animate-pulse rounded-[5px]"></div>
                    ) : (
                        image && <Image src={image} alt="img" height={128} width={128} className="lg:mt-4" />
                    )}
                </Link>
            </div>
            <div className="pb-4 pt-6 overflow-y-auto bg-white rounded-t-none rounded-2xl dark:bg-gray-800">
                <SideNavLink />
            </div>
        </aside>
    );
};