import { Roles } from "@/app/enums/roles";
import AppContainer from "@/app/components/routeComponents/AppContainer";
import { ProductCreateForm } from "@/app/components/productComponents/ProductCreateForm";

const AddProduct = () => {

    return (
        <AppContainer requiredRoles={[Roles.ADMIN, Roles.CLIENT]}>
            <ProductCreateForm />
        </AppContainer>
    )
}

export default AddProduct;