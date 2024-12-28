import { Roles } from "@/app/enums/roles";
import AppContainer from "@/app/components/routeComponents/AppContainer";
import { SettingTable } from "@/app/components/settingComponents/SettingTable";

const SettingList = () => {
    return (
        <AppContainer requiredRoles={[Roles.ADMIN]}>
            <SettingTable />
        </AppContainer>
    )
}

export default SettingList;