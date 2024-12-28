'use client';
import { Roles } from "@/app/enums/roles";
import AppContainer from "@/app/components/routeComponents/AppContainer";
import { UserTable } from "@/app/components/userComponents/UserTable";

const UserList = () => {
    return (
        <AppContainer requiredRoles={[Roles.ADMIN]}>
           <UserTable />
        </AppContainer>
    )
}

export default UserList;