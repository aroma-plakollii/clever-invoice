import { User } from "@/app/types/user";
import {MembershipPackage} from "@/app/types/membershipPackage";

export interface Membership {
    idMembership?: number;
    date?: Date;
    idMembershipPackage?: MembershipPackage;
    idUser?: User;
    createdAt?: Date;
    updatedAt?: Date;
}