'use client';
import { Roles } from "@/app/enums/roles";
import AppContainer from "@/app/components/routeComponents/AppContainer";
import { ProductTable } from "@/app/components/productComponents/ProductTable";

const ProductList = () => {
    return (
        <AppContainer requiredRoles={[Roles.ADMIN, Roles.CLIENT]}>
            <ProductTable />
        </AppContainer>
    )
}

export default ProductList;
