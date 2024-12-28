import Image from 'next/image';
import { RefObject } from 'react';

interface BannerProps {
    scrollToSection: (ref: RefObject<HTMLElement>) => void;
    refs: {
        bannerRef: RefObject<HTMLElement>;
        featuresRef: RefObject<HTMLElement>;
        pricingRef: RefObject<HTMLElement>;
        aboutUsRef: RefObject<HTMLElement>;
        contactUsRef: RefObject<HTMLElement>;
    };
}

export const Banner: React.FC<BannerProps> = ({ scrollToSection, refs }) => {
    return (
        <div className="h-[30rem] sm:h-[35rem] md:h-[25rem] lg:h-[37rem] grid grid-cols-8 md:grid-rows-5 md:gap-5 px-5">
            <div className="col-span-8 md:col-span-4 md:row-span-5 place-items-center place-self-center mt-12 mb-4 md:mb-0 md:mt-0">
                <h1 className="text-2xl sm:text-3xl md:text-2xl lg:text-3xl xl:text-5xl font-bold text-center">Create Professional Invoices in Seconds</h1>
                <p className="my-5 text-center text-sm">Effortlessly manage clients and products, and generate invoices instantly.</p>
                <button onClick={() => scrollToSection(refs.pricingRef)} className="text-sm lg:text-base bg-black border-2 border-black text-white rounded-lg py-2 px-3 hover:bg-white hover:text-black hover:font-semibold">See plans and pricing</button>
            </div>
            <div className="col-span-8 md:col-span-4 md:row-span-5 place-items-center md:place-self-center">
                <Image src="/dashboardView.png" alt="Dashboard view" layout="responsive" width={1200} height={800}/>
            </div>
        </div>
    )
}