'use client';
import { HiMiniUserCircle } from "react-icons/hi2";
import { IoReorderFourOutline } from "react-icons/io5";
import React, { useEffect, useRef, useState } from 'react';
import { AccountPopover } from "@/app/components/layoutComponent/AccountPopover";

interface TopNavProps {
    setIsSidebarOpen: (isOpen: boolean) => void;
}

export const TopNav: React.FC<TopNavProps> = (props) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const popoverRef = useRef<HTMLDivElement | null>(null);

    const handlePopover = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsPopoverOpen(!isPopoverOpen);
    };

    const toggleSidebar = (e: React.MouseEvent) => {
        e.preventDefault();
        props.setIsSidebarOpen(true);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (popoverRef.current && !(popoverRef.current as HTMLDivElement).contains(event.target as Node)) {
            setIsPopoverOpen(false);
        }
    };

    useEffect(() => {
        if (isPopoverOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isPopoverOpen]);

    return (
        <nav className="w-[95%] bg-black shadow-2xl shadow-gray-400 rounded-2xl mx-auto my-3 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <button
                            onClick={toggleSidebar}
                            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                            <span className="sr-only">Open sidebar</span>
                            <IoReorderFourOutline className="text-white bg-black h-7 w-7 flex-non rounded-full" />
                        </button>
                    </div>
                    <div className="flex items-center" onClick={handlePopover}>
                        <div className="relative flex items-center ms-3">
                            <div>
                                <button
                                    type="button"
                                    className="flex text-sm bg-black rounded-full focus:ring-2 focus:ring-white dark:focus:ring-gray-600"
                                    aria-expanded="false">
                                    <span className="sr-only">Open user menu</span>
                                    <HiMiniUserCircle className="text-white bg-black h-9 w-9 flex-non rounded-full" />
                                </button>
                            </div>
                            {isPopoverOpen && (
                                <div ref={popoverRef}>
                                    <AccountPopover />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};