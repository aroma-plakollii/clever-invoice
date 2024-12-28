'use client';
import { Roles } from "@/app/enums/roles";
import { useParams } from "next/navigation";
import AppContainer from "@/app/components/routeComponents/AppContainer";
import { ClientUpdateForm } from "@/app/components/clientComponents/ClientUpdateForm";

const EditClient = () => {
    const { idClient } = useParams()

    return (
        <AppContainer requiredRoles={[Roles.ADMIN, Roles.CLIENT]}>
            <ClientUpdateForm idClient={idClient}/>
        </AppContainer>
    )
}

export default EditClient;