import { Roles } from "@/app/enums/roles";
import AppContainer from "@/app/components/routeComponents/AppContainer";
import { ClientTable } from "@/app/components/clientComponents/ClientTable";

const ClientList = () => {
    return (
        <AppContainer requiredRoles={[Roles.ADMIN, Roles.CLIENT]}>
            <ClientTable />
        </AppContainer>
    )
}

export default ClientList;