import {API_URL} from "@/app/config";
import {MembershipPackagePromise} from "@/app/types/membershipPackage";

export const membershipPackageGetAll = async (headers: any): Promise<MembershipPackagePromise> => {
    try {
        const res = await fetch(`${API_URL}/membershipPackages`, {
            method: 'GET',
            headers
        });

        const result = await res.json();
        return result;
    } catch (error) {
        console.error('Error:', error);
        throw new Error('Failed to fetch membership packages.');
    }
};