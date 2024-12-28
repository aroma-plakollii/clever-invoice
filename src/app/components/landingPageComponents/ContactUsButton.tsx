'use client';

import {registerUser, sendContactUsEmail} from "@/app/api/userService";
import Link from "next/link";
import {User, UserError} from "@/app/types/user";
import {Contact, ContactError} from "@/app/types/contact";
import {useState} from "react";

interface ContactUsButtonProps{
    contact: Contact | undefined;
    errors: ContactError;
    setErrors: React.Dispatch<React.SetStateAction<any>>;
    setLoading: React.Dispatch<React.SetStateAction<any>>;
    headers: Record<string, string>;
}

export const ContactUsButton : React.FC<ContactUsButtonProps> = (props) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        props.setLoading(true);
        const isEmailValid = props.contact?.email ? emailRegex.test(props.contact.email) : false;

        const updatedErrors = {
            firstName: !props.contact?.firstName,
            lastName: !props.contact?.lastName,
            email: !props.contact?.email || !isEmailValid,
            role: !props.contact?.message,
            emailErrorMessage: !isEmailValid ? 'Invalid email format. Please enter a valid email.' : '',
        };

        props.setErrors(updatedErrors);

        if (Object.values(updatedErrors).some(error => error)) {
            props.setLoading(false);
            return;
        }

        const contactData = {
            firstName: props.contact?.firstName,
            lastName: props.contact?.lastName,
            email: props.contact?.email,
            message: props.contact?.message
        };

        try {
            const res = await sendContactUsEmail(contactData, props.headers);

            if(res){
                setSubmitted(true);
                setTimeout(() => {
                    setSubmitted(false);
                }, 1000);
            }
        }catch (error){
            console.error('Email sending failed', error);
        }
    }

    return (
        <div className="flex flex-col sm:flex-row sm:justify-end">
            <button
                onClick={onSubmit}
                type="submit"
                className="w-full sm:w-6/12 xl:w-3/12 h-10 rounded-md bg-black hover:bg-gray-900 px-7 mb-2 sm:mb-0 text-sm font-medium text-white">
                {submitting ? (
                    <span>Send</span>
                ) : submitted ? (
                    <span>&#10003;</span>
                ) : (
                    <span>Send</span>
                )}
            </button>
        </div>
    )
}