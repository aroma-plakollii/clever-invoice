'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/app/hooks/useAuth";
import NotFound from "@/app/not-found";

interface ProtectedRouteProps {
    children: React.ReactNode;
    requiredRoles?: string[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRoles = [] }) => {
    const router = useRouter();
    const { isAuthenticated, user } = useAuth();
    const [isMounted, setIsMounted] = useState(false);
    const [hasAccess, setHasAccess] = useState(true);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        if (isMounted) {
            if (!isAuthenticated) {
                router.replace('/logIn');
            } else if (requiredRoles.length > 0 && !requiredRoles.includes(user?.idRole.name)) {
                setHasAccess(false);
            }
        }
    }, [isMounted, isAuthenticated, user, requiredRoles, router]);

    if (!isMounted) {
        return null;
    }

    if (!isAuthenticated) {
        return null;
    }

    if (!hasAccess) {
        return <NotFound />;
    }

    return <>{children}</>;
};