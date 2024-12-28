import { StoreProvider } from "@/app/store/StoreProvider";
import { ProtectedRoute } from "@/app/components/routeComponents/ProtectedRoute";
import { Layout } from "@/app/components/layoutComponent/Layout";

interface AppContainerProps {
    children: React.ReactNode;
    requiredRoles?: string[];
}

const AppContainer: React.FC<AppContainerProps> = (props) => {
    return (
        <StoreProvider>
            <ProtectedRoute requiredRoles={props.requiredRoles}>
                <Layout>
                    { props.children }
                </Layout>
            </ProtectedRoute>
        </StoreProvider>
    );
};

export default AppContainer;