import { FaChartPie, FaUsers, FaFileInvoiceDollar, FaUser } from 'react-icons/fa';
import { IoStatsChart } from 'react-icons/io5';
import { RiShoppingBag3Fill } from 'react-icons/ri'
import {User} from "@/app/types/user";

export const linksData = (user: User, idSetting: number | null) => [
    {
        href: "/dashboard",
        title: "Dashboard",
        icon: <FaChartPie className={'h-7 w-7 sm:h-6 sm:w-6'} aria-hidden="true" />,
    },
    {
        href: user.idRole?.name === 'admin' ? "/settings" : `/settings/edit/${idSetting}`,
        title: user.idRole?.name === 'admin' ? 'Companies' : 'Company Details',
        icon: <IoStatsChart className={'h-7 w-7 sm:h-6 sm:w-6'} aria-hidden="true" />,
    },
    {
        href: "/clients",
        title: "Clients",
        icon: <FaUsers className={'h-7 w-7 sm:h-6 sm:w-6'} aria-hidden="true" />,
    },
    {
        href: "/products",
        title: "Products",
        icon: <RiShoppingBag3Fill className={'h-7 w-7 sm:h-6 sm:w-6'} aria-hidden="true" />,
    },
    {
        href: "/invoices",
        title: "Invoices",
        icon: <FaFileInvoiceDollar className={'h-7 w-7 sm:h-6 sm:w-6'} aria-hidden="true" />,
    },
    {
        href: user.idRole?.name === 'admin' ? "/users" : `/users/edit/${user.idUser}`,
        title: user.idRole?.name === 'admin' ? 'Users' : 'User',
        icon: <FaUser className={'h-7 w-7 sm:h-6 sm:w-6'} aria-hidden="true" />,
    },
];