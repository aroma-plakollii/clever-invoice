import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { logout } from "@/app/features/users/authSlice";
import { useRouter } from "next/navigation";
import { useHeaders } from "@/app/hooks/useHeaders";
import { logoutUser } from "@/app/api/authService";
import Link from "next/link";

export const AccountPopover = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const headers = useHeaders();
    const authData = useSelector((state: RootState) => state.auth);

    const handleLogout = async () => {
        const res = await logoutUser(headers);

        if(!res.isAuthenticated){
            dispatch(logout());
            sessionStorage.removeItem('auth');
            router.push('/logIn');
        }
    }

    return (
        <div
            className="absolute z-50 mt-2 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded shadow-lg dark:bg-gray-700 dark:divide-gray-600"
            style={{ transform: 'translateX(-94%) translateY(10%)'}} >
            <div className="px-4 py-3" role="none">
                <p className="text-sm text-gray-950 dark:text-white underline" role="none">
                    {authData.user?.firstName || 'Guest'} {authData.user?.lastName || ''}
                </p>
                <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                   role="none">
                    {authData.user?.email || 'No email available'}
                </p>
            </div>
            <ul className="py-1" role="none">
                <li>
                    <Link href={"/dashboard"}
                       className="block px-4 py-2 text-sm text-gray-950 hover:bg-black hover:text-white dark:text-gray-300 dark:hover:bg-cyan-700 dark:hover:text-white"
                       role="menuitem">Dashboard</Link>
                </li>
                <li>
                    <a onClick={handleLogout}
                       className="cursor-pointer block px-4 py-2 text-sm text-gray-950 hover:bg-black hover:text-white dark:text-gray-300 dark:hover:bg-cyan-700 dark:hover:text-white"
                       role="menuitem">Sign out</a>
                </li>
            </ul>
        </div>
    )
}