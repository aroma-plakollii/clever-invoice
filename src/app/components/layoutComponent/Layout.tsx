'use client';
import { useState } from "react";
import { TopNav } from "@/app/components/layoutComponent/TopNav";
import { SideNav } from "@/app/components/layoutComponent/SideNav";

interface LayoutProps {
    children: any
}

export const Layout: React.FC<LayoutProps> = (props) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    return (
        <div className="grid grid-cols-layout grid-rows-layout min-h-screen">
            <header className="top-nav-mobile lg:top-nav">
                <TopNav setIsSidebarOpen={setIsSidebarOpen} />
            </header>
            <div className={`${isSidebarOpen ? "fixed w-screen h-screen shadow-2xl z-50" : "w-0 z-50"} lg:rounded-2xl lg:w-[17rem] lg:h-[98%] lg:relative lg:side-nav`}>
                <SideNav isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
            </div>
            <main className="lg:content p-4">
                <div className="px-0 sm:px-4 rounded-lg dark:border-gray-700 mx-auto mt-2">
                    {props.children}
                </div>
            </main>
        </div>
    )
}