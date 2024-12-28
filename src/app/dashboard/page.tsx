'use client';
import { Roles } from "@/app/enums/roles";
import AppContainer from "@/app/components/routeComponents/AppContainer";
import {DataCardClient} from "@/app/components/dashboardComponents/DataCardClient";
import {DataCardProduct} from "@/app/components/dashboardComponents/DataCardProduct";
import {DataCardInvoice} from "@/app/components/dashboardComponents/DataCardInvoice";
import {DataCardTotal} from "@/app/components/dashboardComponents/DataCardTotal";
import {InvoiceTotalBar} from "@/app/components/dashboardComponents/InvoiceTotalBar";
import {InvoiceTotalPie} from "@/app/components/dashboardComponents/InvoiceTotalPie";

const Dashboard = () => {
    return (
        <AppContainer requiredRoles={[Roles.ADMIN, Roles.CLIENT]}>
            <div className="grid gap-3 grid-cols-4 w-[99%] m-auto">
                <DataCardClient/>
                <DataCardProduct/>
                <DataCardInvoice/>
                <DataCardTotal/>
            </div>
            <div className="flex items-center mt-10 w-[98%] m-auto">
                <div className="w-[65%] mr-[5%]">
                    <InvoiceTotalBar />
                </div>
                <div className="w-[30%]">
                    <InvoiceTotalPie />
                </div>
            </div>
        </AppContainer>
    )
}

export default Dashboard;