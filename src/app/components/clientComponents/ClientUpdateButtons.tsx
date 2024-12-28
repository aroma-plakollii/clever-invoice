'use client';
import { useRouter } from "next/navigation";
import { clientUpdate } from "@/app/api/clientService";
import { Client, ClientError } from "@/app/types/clients";
import Link from "next/link";

interface ClientUpdateButtonsProps{
    client: Client | undefined;
    errors: ClientError;
    setErrors: React.Dispatch<React.SetStateAction<any>>;
    setLoading: React.Dispatch<React.SetStateAction<any>>;
    headers: Record<string, string>;
}

export const ClientUpdateButtons : React.FC<ClientUpdateButtonsProps> = (props) => {
    const router = useRouter();
    const id = Number(props.client?.idClient);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        props.setLoading(true);
        const isEmailValid = props.client?.email ? emailRegex.test(props.client.email) : false;

        const updatedErrors = {
            firstName: !props.client?.firstName,
            lastName: !props.client?.lastName,
            email: !props.client?.email || !isEmailValid,
            phone: !props.client?.phone,
            emailErrorMessage: !isEmailValid ? 'Invalid email format. Please enter a valid email.' : '',
        };

        props.setErrors(updatedErrors);

        if (Object.values(updatedErrors).some(error => error)) {
            props.setLoading(false);
            return;
        }

        const clientData = {
            firstName: props.client?.firstName,
            lastName: props.client?.lastName,
            email: props.client?.email,
            phone: props.client?.phone,
            idUser: props.client?.idUser
        };

        try {
            const res = await clientUpdate(id, clientData, props.headers);

            if(res){
                router.push('/clients');
            }
        }catch (error){
            console.error('Client update failed', error)
        }
    }

    return (
        <div className="flex flex-col sm:flex-row sm:justify-end md:flex md:flex-col xl:flex-row xl:justify-end">
            <Link href={"/clients"} onClick={() => props.setLoading(true)}
                  className="order-1 sm:order-none md:order-1 xl:order-none w-full sm:w-3/12 md:w-full xl:w-3/12 mr-0 sm:mr-2 md:mr-0 xl:mr-2">
                <button
                    className="w-full py-2 rounded-md bg-gray-400 hover:bg-gray-500 text-sm font-medium text-white">
                    Cancel
                </button>
            </Link>
            <button
                onClick={onSubmit}
                type="submit"
                className="w-full sm:w-3/12 md:w-full xl:w-3/12 rounded-md bg-black hover:bg-gray-900 px-7 py-2 mb-2 sm:mb-0 md:mb-2 xl:mb-0 text-sm font-medium text-white">
                Edit
            </button>
        </div>
    )
}