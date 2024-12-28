'use client';
import { useRouter } from "next/navigation";
import { settingCreate } from "@/app/api/settingService";
import { User } from "@/app/types/user";
import { Setting, SettingError } from "@/app/types/setting";
import Link from "next/link";

interface SettingCreateButtonsProps{
    setting: Setting | undefined;
    image: File | undefined | null;
    user: User | undefined;
    errors: SettingError;
    setErrors: React.Dispatch<React.SetStateAction<any>>;
    setLoading: React.Dispatch<React.SetStateAction<any>>;
    headers: Record<string, string>;
    inputFields: any[];
    setInputFields: React.Dispatch<React.SetStateAction<any>>;
    inputFieldsErrors: any[];
    setInputFieldsErrors: React.Dispatch<React.SetStateAction<any[]>>;
}

export const SettingCreateButtons : React.FC<SettingCreateButtonsProps> = (props) => {
    const router = useRouter();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const accountNumberRegex = /^[0-9]{8,20}$/;
    const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/;
    const swiftCodeRegex = /^[A-Z0-9]{8,11}$/;

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        props.setLoading(true);

        const isEmailValid = props.setting?.email ? emailRegex.test(props.setting.email) : false;
        const isAccountNumberValid = props.setting?.accountNumber ? accountNumberRegex.test(props.setting.accountNumber) : false;
        const isIbanValid = props.setting?.iban ? ibanRegex.test(props.setting.iban) : false;
        const isSwiftCodeValid = props.setting?.swiftCode ? swiftCodeRegex.test(props.setting.swiftCode) : false;

        const inputFieldsErrors = props.inputFields?.map((field: any) => {
            const isLabelFilled = Boolean(field.label);
            const isValueFilled = Boolean(field.value);

            return {
                label: isValueFilled && !isLabelFilled,
                value: isLabelFilled && !isValueFilled,
            };
        }) || [];

        props.setInputFieldsErrors(inputFieldsErrors);

        const hasInputFieldsErrors = inputFieldsErrors.some((fieldError: any) => {
            return Object.values(fieldError).some(error => error);
        });

        const updatedErrors = {
            name: !props.setting?.name,
            email: !props.setting?.email || !isEmailValid,
            phone: !props.setting?.phone,
            accountNumber: props.setting?.accountNumber ? !isAccountNumberValid : false,
            iban: props.setting?.iban ? !isIbanValid : false,
            swiftCode: props.setting?.swiftCode ? !isSwiftCodeValid : false,
            emailErrorMessage: !isEmailValid ? 'Invalid email format. Please enter a valid email.' : '',
            accountNumberErrorMessage: !isAccountNumberValid && props.setting?.accountNumber ? 'Invalid account number format. Please enter a valid account number.' : '',
            ibanErrorMessage: !isIbanValid && props.setting?.iban ? 'Invalid IBAN format. Please enter a valid IBAN.' : '',
            swiftCodeErrorMessage: !isSwiftCodeValid && props.setting?.swiftCode ? 'Invalid SWIFT code format. Please enter a valid SWIFT code.' : '',
        };

        props.setErrors(updatedErrors);

        const hasMainErrors = Object.values(updatedErrors).some(error => error);
        if (hasMainErrors || hasInputFieldsErrors) {
            props.setLoading(false);
            return;
        }

        try {
            if (props.inputFields) {
                const details = props.inputFields.reduce((acc, { label, value }) => {
                    if (label && value) {
                        acc[label] = value;
                    }
                    return acc;
                }, {});

                const formData = new FormData();
                formData.append('name', props.setting?.name || '');
                formData.append('email', props.setting?.email || '');
                formData.append('phone', props.setting?.phone || '');
                formData.append('address', props.setting?.address || '');
                formData.append('city', props.setting?.city || '');
                formData.append('accountNumber', props.setting?.accountNumber || '');
                formData.append('iban', props.setting?.iban || '');
                formData.append('swiftCode', props.setting?.swiftCode || '');
                formData.append('taxNumber', props.setting?.taxNumber || '');
                formData.append('tax', String(props.setting?.tax || '')); // Convert tax to string
                formData.append('customFields', JSON.stringify(details) || '');
                formData.append('idUser', JSON.stringify(props.user) || '');
                if (props.image) {
                    formData.append('image', props.image);
                }

                const res = await settingCreate(formData, props.headers);

                if (res) {
                    router.push('/settings');
                }
            }
        } catch (error) {
            console.error('Setting creation failed', error);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row sm:justify-end">
            <Link href={"/settings"} onClick={() => props.setLoading(true)}
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