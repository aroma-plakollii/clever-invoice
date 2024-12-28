'use client';
import { useRouter } from "next/navigation";
import { clientCreate } from "@/app/api/clientService";
import { User } from "@/app/types/user";
import { Client, ClientError } from "@/app/types/clients";
import Link from "next/link";

interface ClientCreateButtonsProps{
    client: Client | undefined;
    user: User | undefined;
    errors: ClientError;
    setErrors: React.Dispatch<React.SetStateAction<any>>;
    setLoading: React.Dispatch<React.SetStateAction<any>>;
    headers: Record<string, string>;
}

export const ClientCreateButtons : React.FC<ClientCreateButtonsProps> = (props) => {
    const router = useRouter();
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
            idUser: props.user
        };

        try {
            const res = await clientCreate(clientData, props.headers);

            if(res){
                router.push('/clients');
            }
        }catch (error){
            console.error('Client creation failed', error)
        }
    }

    return (
        <div className="flex flex-col sm:flex-row sm:justify-end">
            <Link href={"/clients"} onClick={() => props.setLoading(true)}
                  className="order-1 sm:order-none w-full sm:w-3/12 xl:w-2/12 mr-0 sm:mr-2">
                <button
                    className="w-full py-2 rounded-md bg-gray-400 hover:bg-gray-500 text-sm font-medium text-white">
                    Cancel
                </button>
            </Link>
            <button
                onClick={onSubmit}
                type="submit"
                className="w-full sm:w-3/12 xl:w-2/12 rounded-md bg-black hover:bg-gray-900 px-7 py-2 mb-2 sm:mb-0 text-sm font-medium text-white">
                Add
            </button>
        </div>
    )
}