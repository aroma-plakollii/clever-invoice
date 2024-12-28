'use client';
import { Roles } from "@/app/enums/roles";
import AppContainer from "@/app/components/routeComponents/AppContainer";
import { useParams } from "next/navigation";
import { SettingUpdateForm } from "@/app/components/settingComponents/SettingUpdateForm";

const EditProduct = () => {
    const { idSetting } = useParams()

    return (
        <AppContainer requiredRoles={[Roles.ADMIN, Roles.CLIENT]}>
            <SettingUpdateForm idSetting={idSetting}/>
        </AppContainer>
    )
}

export default EditProduct;