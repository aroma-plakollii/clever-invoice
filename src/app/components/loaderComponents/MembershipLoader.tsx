import {MembershipPackage} from "@/app/types/membershipPackage";

interface MembershipLoaderProps{
    membershipPackages: MembershipPackage[] | undefined;
    classNames: any;
}

export const MembershipLoader: React.FC<MembershipLoaderProps> = (props) => {
    return(
        <div>
            <div
                className="mx-auto grid max-w-md grid-cols-1 items-center gap-y-6 mt-10 lg:max-w-5xl lg:grid-cols-3">
                { props.membershipPackages?.map((membershipPackage, tierIdx) => {
                    const isEven = (tierIdx + 1) % 2 === 0;
                    const features = ['25 products', 'Up to 10,000 subscribers', 'Advanced analytics', '24-hour support response time'];

                    return (
                        <div
                            key={membershipPackage.idMembershipPackage}
                            className={props.classNames(
                                isEven ? 'relative animate-pulse bg-gray-200 h-[32rem]' : 'animate-pulse bg-gray-100 h-[30rem] lg:mx-0',
                                isEven
                                    ? ''
                                    : tierIdx === 0
                                        ? 'rounded-t-3xl lg:rounded-b-none lg:rounded-bl-3xl lg:rounded-tr-none'
                                        : 'lg:rounded-t-none lg:rounded-bl-none lg:rounded-tr-3xl',
                                'rounded-3xl',
                                tierIdx === 1 ? 'lg:p-11 p-8' : 'lg:p-7 p-8'
                            )}
                        >
                        </div>
                    )}
                )}
            </div>
        </div>
    )
}