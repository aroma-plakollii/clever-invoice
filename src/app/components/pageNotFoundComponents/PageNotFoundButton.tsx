'use client';
import { useAuth } from "@/app/hooks/useAuth";
import Link from "next/link";

export const PageNotFoundButton = () => {
    const { isAuthenticated } = useAuth();

    console.log(isAuthenticated)

    return (
        <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
                href={isAuthenticated ? "/dashboard" : "/"}
                className="rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
            >
                {isAuthenticated ? "Go back to dashboard" : "Go back to home"}
            </Link>
        </div>
    )
}