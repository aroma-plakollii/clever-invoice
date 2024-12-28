'use client';
import Link from 'next/link';
import {linksData} from "@/app/db/linkData";
import {useAuth} from "@/app/hooks/useAuth";
import React, { useEffect, useState } from 'react';
import {useHeaders} from "@/app/hooks/useHeaders";
import {settingGetAllByUser} from "@/app/api/settingService";
import {userGetSingle} from "@/app/api/userService";
import {SideNavLinkLoader} from "@/app/components/loaderComponents/SideNavLinkLoader";

const SideNavLink: React.FC = () => {
    const { user } = useAuth();
    const headers = useHeaders();
    const [idSetting, setIdSetting] = useState<number | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const links = linksData(user, idSetting);

    useEffect(() => {
        const getSettings = async () => {
            if (user.idRole.name === 'client') {
                const settingsResponse = await settingGetAllByUser(user.idUser, headers);
                const settings = settingsResponse?.settings ?? [];
                if (settings.length > 0 && settings[0].idSetting !== undefined) {
                    setIdSetting(settings[0].idSetting);
                }
            }
        };

        getSettings();
    }, [user, headers]);

    return (
        <ul className="space-y-2 font-medium">
            {links.map((link, index) => {
                return (
                    <>
                        {loading ? <SideNavLinkLoader /> : (
                            <li key={index}>
                                <Link href={link.href} onClick={() => setLoading(true)}
                                      className="flex items-center px-5 py-2 text-gray-600 dark:text-white hover:bg-black hover:text-white dark:hover:bg-gray-700 group">
                                    {link.icon}
                                    <span className="flex-1 ms-3 text-xl sm:text-base whitespace-nowrap">{link.title}</span>
                                </Link>
                            </li>
                        )}
                    </>
                );
            })}
        </ul>
    );
};

export default SideNavLink;