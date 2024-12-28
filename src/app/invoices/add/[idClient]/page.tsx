'use client';
import { useParams } from "next/navigation";
import { Roles } from "@/app/enums/roles";
import AppContainer from "@/app/components/routeComponents/AppContainer";
import { InvoiceCreateForm } from "@/app/components/invoiceComponents/InvoiceCreateForm";

const AddInvoice = () => {
    const { idClient } = useParams();

    return (
        <AppContainer requiredRoles={[Roles.ADMIN, Roles.CLIENT]}>
            <InvoiceCreateForm idClient={idClient} />
        </AppContainer>
    )
}

export default AddInvoice;