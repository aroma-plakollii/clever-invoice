'use client';
import Link from "next/link";
import {RefObject, useState} from "react";
import {IoReorderFourOutline} from "react-icons/io5";

interface NavBarProps {
    scrollToSection: (ref: RefObject<HTMLElement>) => void;
    refs: {
        bannerRef: RefObject<HTMLElement>;
        featuresRef: RefObject<HTMLElement>;
        pricingRef: RefObject<HTMLElement>;
        aboutUsRef: RefObject<HTMLElement>;
        contactUsRef: RefObject<HTMLElement>;
    };
}
export const NavBar: React.FC<NavBarProps> = ({ scrollToSection, refs }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            {isMobileMenuOpen && (
                <div className="w-full h-screen bg-black p-4">
                    <div className="w-full flex justify-end">
                        <IoReorderFourOutline onClick={toggleMobileMenu}
                                              className={'text-white h-8 w-8 flex-non'}/>
                    </div>
                    <ul className="text-white flex flex-col gap-3 text-xl mt-3">
                        <li>
                            <a href="#" onClick={() => scrollToSection(refs.bannerRef)}
                               className="hover:underline">Home</a>
                        </li>
                        <li>
                            <a href="#" onClick={() => scrollToSection(refs.featuresRef)}
                               className="hover:underline">Features</a>
                        </li>
                        <li>
                            <a href="#" onClick={() => scrollToSection(refs.pricingRef)}
                               className="hover:underline">Pricing</a>
                        </li>
                        <li>
                            <a href="#" onClick={() => scrollToSection(refs.aboutUsRef)} className="hover:underline">About
                                Us</a>
                        </li>
                        <li>
                            <a href="#" onClick={() => scrollToSection(refs.contactUsRef)} className="hover:underline">Contact
                                Us</a>
                        </li>
                    </ul>
                </div>
            )}
            {!isMobileMenuOpen && (
                <header className="bg-black text-white flex justify-between items-center p-4">
                    <div className="sm:hidden inline">
                        <IoReorderFourOutline onClick={toggleMobileMenu} className={'text-white h-8 w-8 flex-non'}/>
                    </div>
                    <div className="hidden sm:inline">
                        <ul className="inline-flex gap-5">
                            <li>
                                <a href="#" onClick={() => scrollToSection(refs.bannerRef)}
                                   className="hover:underline">Home</a>
                            </li>
                            <li>
                                <a href="#" onClick={() => scrollToSection(refs.featuresRef)}
                                   className="hover:underline">Features</a>
                            </li>
                            <li>
                                <a href="#" onClick={() => scrollToSection(refs.pricingRef)}
                                   className="hover:underline">Pricing</a>
                            </li>
                            <li>
                                <a href="#" onClick={() => scrollToSection(refs.aboutUsRef)}
                                   className="hover:underline">About Us</a>
                            </li>
                            <li>
                                <a href="#" onClick={() => scrollToSection(refs.contactUsRef)}
                                   className="hover:underline">Contact Us</a>
                            </li>
                        </ul>
                    </div>
                    <div className="inline-flex gap-3">
                        <Link href={'/logIn'}
                              className="border-2 border-white rounded-lg py-1.5 px-4 text-sm hover:bg-white hover:text-black font-semibold">Log in</Link>
                        <a href="#" onClick={() => scrollToSection(refs.pricingRef)} className="bg-white border-2 text-black font-semibold rounded-lg py-1.5 px-4 text-sm hover:bg-black border-white hover:text-white">Get started</a>
                    </div>
                </header>
            )}
        </>
    )
}