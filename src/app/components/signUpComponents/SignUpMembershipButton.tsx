'use client';
import { useDispatch } from "react-redux";
import { setMembership } from "@/app/features/users/signUpSlice";
import { MembershipPackage } from "@/app/types/membershipPackage";
import Link from "next/link";

interface SignUpMembershipButtonProps{
    membershipPackage: MembershipPackage;
    isEven: boolean;
    setLoading: React.Dispatch<React.SetStateAction<any>>;
}
export const SignUpMembershipButton : React.FC<SignUpMembershipButtonProps> = (props) => {
    const dispatch = useDispatch();

    const handleSetMembership = (membershipPackage: MembershipPackage) => () => {
        props.setLoading(true);
        const membershipData = {
            idMembershipPackage: membershipPackage,
            date: new Date(),
        };

        dispatch(setMembership(membershipData));
    };

    const classNames = (...classes: (string | false | null | undefined)[]): string => {
        return classes.filter(Boolean).join(' ');
    };

    return (
        <Link
            href={'/signUp/user'}
            aria-describedby={props.membershipPackage.idMembershipPackage?.toString()}
            className={classNames(
                props.isEven
                    ? 'bg-gray-600 text-white shadow-sm hover:bg-gray-500 focus-visible:outline-orange-500'
                    : 'text-gray-950 ring-1 ring-inset ring-gray-950 hover:ring-gray-900 hover:bg-black hover:text-white focus-visible:outline-gray-900',
                'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10',
            )}
            onClick={handleSetMembership(props.membershipPackage)}
        >
            Get started today
        </Link>
    )
}