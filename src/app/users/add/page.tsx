import { Roles } from "@/app/enums/roles";
import AppContainer from "@/app/components/routeComponents/AppContainer";
import { UserCreateForm } from "@/app/components/userComponents/UserCreateForm";

const AddUser = () => {

    return (
        <AppContainer requiredRoles={[Roles.ADMIN]}>
            <UserCreateForm />
        </AppContainer>
    )
}

export default AddUser;