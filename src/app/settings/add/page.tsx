'use client';
import {Roles} from "@/app/enums/roles";
import AppContainer from "@/app/components/routeComponents/AppContainer";
import { SettingCreateForm } from "@/app/components/settingComponents/SettingCreateForm";

const AddSetting = () => {

    return (
        <AppContainer requiredRoles={[Roles.ADMIN]}>
            <SettingCreateForm />
        </AppContainer>
    )
}

export default AddSetting;