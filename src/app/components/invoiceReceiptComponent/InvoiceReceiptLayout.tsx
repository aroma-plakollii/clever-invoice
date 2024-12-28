'use client';
import { IoArrowBack } from "react-icons/io5";
import { IoMdPrint } from "react-icons/io";
import { useEffect, useState } from "react";
import { useHeaders } from "@/app/hooks/useHeaders";
import { useAuth } from "@/app/hooks/useAuth";
import { invoiceGetSingle } from "@/app/api/invoiceService";
import { settingGetAllByUser } from "@/app/api/settingService";
import { Invoice } from "@/app/types/invoice";
import { Setting } from "@/app/types/setting";
import Link from "next/link";
import { InvoiceReceiptContent } from "@/app/components/invoiceReceiptComponent/InvoiceReceiptContent";
import {DashboardFormLoader} from "@/app/components/loaderComponents/DashboardFormLoader";

interface InvoiceReceiptProps{
    idInvoice: string | string[];
}

export const InvoiceReceiptLayout: React.FC<InvoiceReceiptProps> = (props) => {
    const { user } = useAuth();
    const headers = useHeaders();
    const [invoice, setInvoice] = useState<Invoice>();
    const [setting, setSetting] = useState<Setting>();
    const [image, setImage] = useState('');
    const [loading, setLoading]= useState<boolean>(true);
    const id = Number(props.idInvoice);

    useEffect( () => {
        const getInvoice = async () => {
            const invoiceGetSingleResponse = await invoiceGetSingle(id, headers);
            const settingsResponse =  await settingGetAllByUser(user.idUser, headers);

            if(invoiceGetSingleResponse){
                setInvoice(invoiceGetSingleResponse.invoice);
                setLoading(false);
            }

            if(settingsResponse.settings){
                setSetting(settingsResponse.settings[0]);
                const base64Image = settingsResponse.settings[0].image;

                if (!base64Image.startsWith("data:image")) {
                    setImage(`data:image/png;base64,${base64Image}`);
                } else {
                    setImage(base64Image);
                }
            }
        }

        getInvoice();
    }, [headers, id, user.idUser]);

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="mb-8">
            <div className="mx-auto px-4">
                <div className="space-y-4 shadow-2xl p-4 rounded-2xl z-0">
                    <div className="flex items-center justify-between space-x-4">
                        <div className="flex items-center space-x-2">
                            <Link href={"/invoices"}>
                                <button className="flex items-center text-base text-gray-600" onClick={() => setLoading(true)}>
                                    <IoArrowBack className="mr-2 text-gray-600 text-xl"/> Back
                                </button>
                            </Link>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button
                                className="mr-2 px-4 py-2 text-black text-xs bg-gray-200 rounded-lg"
                                onClick={handlePrint}
                            >
                                <IoMdPrint className="text-gray-500 w-5 h-5"/>
                            </button>
                        </div>
                    </div>
                </div>
                {loading ? <DashboardFormLoader type={'full-receipt'} /> : (
                    <div className="mt-10 mb-16 w-full">
                        <div className="xl:w-full w-[68rem] h-[63rem] px-7 py-4 shadow-2xl rounded-2xl">
                             <InvoiceReceiptContent id="printContent" invoice={invoice} setting={setting} image={image}/>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}