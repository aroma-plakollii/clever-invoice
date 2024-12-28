export interface MembershipPackage {
    idMembershipPackage?: number;
    name?: string;
    price?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface MembershipPackagePromise {
    success?: boolean;
    status?: number;
    message?: string;
    membershipPackages?: MembershipPackage[];
}