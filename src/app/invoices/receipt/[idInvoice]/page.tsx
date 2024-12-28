'use client';
import { useParams } from "next/navigation";
import { Roles } from "@/app/enums/roles";
import AppContainer from "@/app/components/routeComponents/AppContainer";
import { InvoiceReceiptLayout } from "@/app/components/invoiceReceiptComponent/InvoiceReceiptLayout";

const InvoiceReceipt = () => {
    const { idInvoice } = useParams();

    return (
        <AppContainer requiredRoles={[Roles.ADMIN, Roles.CLIENT]}>
            <InvoiceReceiptLayout idInvoice={idInvoice}/>
        </AppContainer>
    )
}

export default InvoiceReceipt;