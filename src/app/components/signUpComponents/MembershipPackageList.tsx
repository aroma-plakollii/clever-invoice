'use client';
import { CheckIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useHeaders } from "@/app/hooks/useHeaders";
import { MembershipPackage } from "@/app/types/membershipPackage";
import { setMembershipPackages } from "@/app/features/membershipPackage/membershipPackageSlice";
import { membershipPackageGetAll } from "@/app/api/membershipPackageService";
import { SignUpMembershipButton } from "@/app/components/signUpComponents/SignUpMembershipButton";
import {MembershipLoader} from "@/app/components/loaderComponents/MembershipLoader";

const MembershipPackageList = () => {
    const dispatch = useDispatch();
    const membershipPackages = useSelector((state: RootState) => state.membershipPackages);
    const [loading, setLoading] = useState<boolean>(true);
    const headers = useHeaders();

    useEffect(() => {
        const getMembershipPackages = async () => {
            const membershipPackagesResponse: any = await membershipPackageGetAll(headers);

            if (membershipPackagesResponse){
                dispatch(setMembershipPackages(membershipPackagesResponse.membershipPackages as MembershipPackage[]));
                setLoading(false);
            }
        };

        getMembershipPackages();
    }, [dispatch, headers]);


    const classNames = (...classes: (string | false | null | undefined)[]): string => {
        return classes.filter(Boolean).join(' ');
    };

    return (
        <>
        {loading ? <MembershipLoader membershipPackages={membershipPackages} classNames={classNames} /> : (
            <div
            className="mx-auto grid max-w-md grid-cols-1 items-center gap-y-6 mt-10 lg:max-w-5xl lg:grid-cols-3">
            {membershipPackages.map((membershipPackage, tierIdx) => {
                const isEven = (tierIdx + 1) % 2 === 0;
                const features = ['25 products', 'Up to 10,000 subscribers', 'Advanced analytics', '24-hour support response time'];

                return (
                <div
                    key={membershipPackage.idMembershipPackage}
                    className={classNames(
                        isEven ? 'relative bg-black shadow-xl shadow-gray-950/60' : 'shadow-2xl lg:mx-0',
                        isEven
                            ? ''
                            : tierIdx === 0
                                ? 'rounded-t-3xl lg:rounded-b-none lg:rounded-bl-3xl lg:rounded-tr-none'
                                : 'lg:rounded-t-none lg:rounded-bl-none lg:rounded-tr-3xl',
                        'rounded-3xl ring-1 ring-gray-700/10',
                        tierIdx === 1 ? 'lg:p-11 p-8' : 'lg:p-7 p-8'
                    )}
                >
                    <div className="flex justify-between">
                        <h3
                            id={membershipPackage.idMembershipPackage?.toString()}
                            className={classNames(
                                isEven ? 'text-gray-300' : 'text-gray-400',
                                'text-base font-semibold leading-7',
                            )}
                        >
                            {membershipPackage.name}
                        </h3>
                        {isEven && <span
                            className="inline-flex items-center rounded-xl bg-gray-50 bg-opacity-25 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-emerald-700/20">Most popular</span>}
                    </div>
                    <p className="mt-4 flex items-baseline gap-x-2">
                        <span
                            className={classNames(
                                isEven ? 'text-white' : 'text-gray-950',
                                'text-5xl font-bold tracking-tight',
                            )}
                        >
                            {parseInt(membershipPackage.price?.toString() || '0')}€
                        </span>
                                            <span className={classNames(isEven ? 'text-gray-200' : 'text-gray-500', 'text-base')}>
                            / {membershipPackage.name}
                        </span>
                    </p>
                    <p className={classNames(isEven ? 'text-gray-100' : 'text-gray-600', 'mt-6 text-base leading-7')}>
                        The perfect plan if you`re just getting started with our product
                    </p>
                    <ul
                        role="list"
                        className={classNames(
                            isEven ? 'text-gray-100' : 'text-gray-600',
                            'mt-8 space-y-3 text-sm leading-6 sm:mt-10',
                        )}
                    >
                        {features.map((feature) => (
                            <li key={feature} className="flex gap-x-3">
                                <CheckIcon
                                    aria-hidden="true"
                                    className={classNames(isEven ? 'text-gray-400' : 'text-black', 'h-6 w-5 flex-none')}
                                />
                                {feature}
                            </li>
                        ))}
                    </ul>
                    <SignUpMembershipButton setLoading={setLoading} membershipPackage={membershipPackage} isEven={isEven}/>
            </div>
        )
    }
)}
</div>
)}
        </>
    )
}

export default MembershipPackageList;