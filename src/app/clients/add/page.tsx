import { Roles } from "@/app/enums/roles";
import AppContainer from "@/app/components/routeComponents/AppContainer";
import { ClientCreateForm } from "@/app/components/clientComponents/ClientCreateForm";

const AddClient = () => {

    return (
        <AppContainer requiredRoles={[Roles.ADMIN, Roles.CLIENT]}>
            <ClientCreateForm />
        </AppContainer>
    )
}

export default AddClient;