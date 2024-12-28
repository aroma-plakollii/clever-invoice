import {FaFileInvoiceDollar, FaUsers} from "react-icons/fa";
import {RiShoppingBag3Fill} from "react-icons/ri";
import {MdDashboard} from "react-icons/md";

export const Features = () => {
    return (
        <div className="py-14 mx-8 border-t-2 border-b-2 border-gray-300 text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold mb-10 tracking-tighter">Why Clever Invoice?</h2>
            <div className="grid grid-cols-4 gap-6 px-6 sm:px-0 md:px-24 lg:px-0 xl:px-24">
                <div className="bg-black text-white rounded-xl text-center p-5 col-span-4 sm:col-span-2 lg:col-span-1">
                    <FaFileInvoiceDollar className="text-4xl w-full"/>
                    <p className="text-xl font-bold uppercase my-4">Automated Invoicing</p>
                    <p className="text-sm justify-text">Quickly generate invoices automatically, saving time and
                        reducing errors, so you can focus on growing
                        your business. Then, you can print them easily.</p>
                </div>
                <div className="bg-black text-white rounded-xl text-center p-5 col-span-4 sm:col-span-2 lg:col-span-1">
                    <FaUsers className="text-4xl w-full"/>
                    <p className="text-xl font-bold uppercase my-3">Simple Client Management</p>
                    <p className="text-sm justify-text">Effortlessly organize and manage your clients with an intuitive
                        interface, ensuring all their details
                        are just a click away.</p>
                </div>
                <div className="bg-black text-white rounded-xl text-center p-5 col-span-4 sm:col-span-2 lg:col-span-1">
                    <RiShoppingBag3Fill className="text-4xl w-full"/>
                    <p className="text-xl font-bold uppercase my-3">Product Catalog</p>
                    <p className="text-sm justify-text">Easily maintain and update your product offerings in one place,
                        complete with descriptions and
                        pricing.</p>
                </div>
                <div className="bg-black text-white rounded-xl text-center p-5 col-span-4 sm:col-span-2 lg:col-span-1">
                    <MdDashboard className="text-4xl w-full"/>
                    <p className="text-xl font-bold uppercase my-3">User-Friendly Interface</p>
                    <p className="text-sm justify-text">Enjoy a simple and intuitive interface that makes creating and
                        managing invoices easy and
                        understandable for everyone.</p>
                </div>
            </div>
        </div>
    )
}