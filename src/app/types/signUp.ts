import { User } from "@/app/types/user";
import { Membership } from "@/app/types/membership";
import { Setting } from "@/app/types/setting";

export interface SignUp {
    user?: User;
    membership?: Membership;
    setting?: Setting;
}