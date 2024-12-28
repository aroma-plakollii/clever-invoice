'use client';
import React, { useRef } from 'react';
import {NavBar} from "@/app/components/landingPageComponents/NavBar";
import MembershipPackageList from "@/app/components/signUpComponents/MembershipPackageList";
import {StoreProvider} from "@/app/store/StoreProvider";
import {Banner} from "@/app/components/landingPageComponents/Banner";
import {Features} from "@/app/components/landingPageComponents/Features";
import {AboutUs} from "@/app/components/landingPageComponents/AboutUs";
import {Footer} from "@/app/components/landingPageComponents/Footer";
import {ContactUs} from "@/app/components/landingPageComponents/ContactUs";

export const LandingPageLayout: React.FC = () => {
    const bannerRef = useRef(null);
    const featuresRef = useRef(null);
    const pricingRef = useRef(null);
    const aboutUsRef = useRef(null);
    const contactUsRef = useRef(null);

    const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const refs = {
        bannerRef,
        featuresRef,
        pricingRef,
        aboutUsRef,
        contactUsRef
    };

    return (
        <div>
            <NavBar scrollToSection={scrollToSection} refs={refs} />
            <main>
                <section ref={bannerRef}><Banner scrollToSection={scrollToSection} refs={refs} /></section>
                <section ref={featuresRef}><Features/></section>
                <StoreProvider>
                    <div ref={pricingRef} className="relative isolate bg-white px-6 py-14 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center lg:max-w-4xl">
                            <h2 className="text-base font-semibold leading-7 text-gray-400">Pricing</h2>
                            <p className="mt-2 text-2xl leading-9 sm:leading-10 sm:text-4xl font-bold tracking-tighter sm:tracking-tight text-gray-950 lg:text-5xl">
                                The perfect price for you, no matter who you are
                            </p>
                            <p className="mx-auto mt-4 max-w-sm lg:mt-6 sm:max-w-xl text-center text-sm leading-5 sm:text-base sm:leading-8 text-gray-500">
                                Simplify billing with automatic invoice generation. Choose a plan and save time.
                            </p>
                        </div>
                        <MembershipPackageList/>
                    </div>
                </StoreProvider>
                <div className="bg-gray-200 flex lg:flex-row flex-col items-center py-14 px-8 sm:px-16 gap-14">
                    <section ref={aboutUsRef} className="w-full lg:w-6/12 flex align-middle "><AboutUs/></section>
                    <hr className="lg:hidden block bg-white h-[2px] w-full" />
                    <section ref={contactUsRef} className="w-full md:w-8/12 lg:w-6/12"><ContactUs/></section>
                </div>
            </main>
            <Footer/>
        </div>
    )
}