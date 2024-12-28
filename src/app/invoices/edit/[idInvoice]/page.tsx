'use client';
import { useParams } from "next/navigation";
import { Roles } from "@/app/enums/roles";
import AppContainer from "@/app/components/routeComponents/AppContainer";
import { InvoiceUpdateForm } from "@/app/components/invoiceComponents/InvoiceUpdateForm";

const EditInvoice = () => {
    const { idInvoice } = useParams();

    return (
        <AppContainer requiredRoles={[Roles.ADMIN, Roles.CLIENT]}>
            <InvoiceUpdateForm idInvoice={idInvoice}/>
        </AppContainer>
    )
}

export default EditInvoice;