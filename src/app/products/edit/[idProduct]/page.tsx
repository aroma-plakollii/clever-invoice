'use client';
import { Roles } from "@/app/enums/roles";
import { useParams } from "next/navigation";
import AppContainer from "@/app/components/routeComponents/AppContainer";
import { ProductUpdateForm } from "@/app/components/productComponents/ProductUpdateForm";

const EditProduct = () => {
    const { idProduct } = useParams()

    return (
        <AppContainer requiredRoles={[Roles.ADMIN, Roles.CLIENT]}>
            <ProductUpdateForm idProduct={idProduct}/>
        </AppContainer>
    )
}

export default EditProduct;