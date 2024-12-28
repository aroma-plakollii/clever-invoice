'use client';
import { Roles } from "@/app/enums/roles";
import { useParams } from "next/navigation";
import AppContainer from "@/app/components/routeComponents/AppContainer";
import { UserUpdateForm } from "@/app/components/userComponents/UserUpdateForm";

const EditUser = () => {
    const { idUser } = useParams()

    return (
        <AppContainer requiredRoles={[Roles.ADMIN, Roles.CLIENT]}>
            <UserUpdateForm idUser={idUser}/>
        </AppContainer>
    )
}

export default EditUser;