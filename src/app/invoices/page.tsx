'use client';
import { Roles } from "@/app/enums/roles";
import AppContainer from "@/app/components/routeComponents/AppContainer";
import { InvoiceTable } from "@/app/components/invoiceComponents/InvoiceTable";

const InvoiceList = () => {
    return (
        <AppContainer requiredRoles={[Roles.ADMIN, Roles.CLIENT]}>
            <InvoiceTable idClient={"0"} />
        </AppContainer>
    )
}

export default InvoiceList;