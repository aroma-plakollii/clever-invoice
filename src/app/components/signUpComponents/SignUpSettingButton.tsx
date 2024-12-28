import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { useRouter } from "next/navigation";
import { useHeaders } from "@/app/hooks/useHeaders";
import { setSetting } from "@/app/features/users/signUpSlice";
import { userSignUp } from "@/app/api/userService";
import { Setting, SettingError } from "@/app/types/setting";
import {SignUp} from "@/app/types/signUp";

interface SignUpSettingButtonProps{
    setting: Setting | undefined;
    image: File | undefined | null;
    errors: SettingError;
    setErrors: React.Dispatch<React.SetStateAction<any>>;
    setLoading: React.Dispatch<React.SetStateAction<any>>;
}
export const SignUpSettingButton : React.FC<SignUpSettingButtonProps> = (props) => {
    const router = useRouter();
    const headers = useHeaders();
    const dispatch = useDispatch();
    const signUpData = useSelector((state: RootState) => state.signUp);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const accountNumberRegex = /^[0-9]{8,20}$/;
    const ibanRegex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/;
    const swiftCodeRegex = /^[A-Z0-9]{8,11}$/;

    const saveSettingData = (e: React.FormEvent) => {
        e.preventDefault();
        props.setLoading(true);
        const settingData = {
            name: props.setting?.name,
            email: props.setting?.email,
            phone: props.setting?.phone,
            address: props.setting?.address,
            city: props.setting?.address,
            accountNumber: props.setting?.accountNumber,
            iban: props.setting?.iban,
            swiftCode: props.setting?.swiftCode,
            taxNumber: props.setting?.taxNumber,
        };

        dispatch(setSetting(settingData));

        router.push('/signUp/user');
    }

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // props.setLoading(true);
        const isEmailValid = props.setting?.email ? emailRegex.test(props.setting.email) : false;
        const isAccountNumberValid = props.setting?.accountNumber ? accountNumberRegex.test(props.setting.accountNumber) : false;
        const isIbanValid = props.setting?.iban ? ibanRegex.test(props.setting.iban) : false;
        const isSwiftCodeValid = props.setting?.swiftCode ? swiftCodeRegex.test(props.setting.swiftCode) : false;

        const updatedErrors = {
            name: !props.setting?.name,
            email: !props.setting?.email || !isEmailValid,
            phone: !props.setting?.phone,
            accountNumber: props.setting?.accountNumber ? !isAccountNumberValid : false,
            iban: props.setting?.iban ? !isIbanValid : false,
            swiftCode: props.setting?.swiftCode ? !isSwiftCodeValid : false,
            emailErrorMessage: !isEmailValid ? 'Invalid email format. Please enter a valid email.' : '',
            accountNumberErrorMessage: !isAccountNumberValid && props.setting?.accountNumber ? 'Invalid account number format. Please enter a valid account number.' : '',
            ibanErrorMessage: !isIbanValid && props.setting?.iban ? 'Invalid iban format. Please enter a valid iban.' : '',
            swiftCodeErrorMessage: !isSwiftCodeValid && props.setting?.swiftCode ? 'Invalid swift code format. Please enter a valid swift code.' : '',
        };

        props.setErrors(updatedErrors);

        if (Object.values(updatedErrors).some(error => error)) {
            props.setLoading(false);
            return;
        }

        const settingData = {
            name: props.setting?.name,
            email: props.setting?.email,
            phone: props.setting?.phone,
            address: props.setting?.address,
            city: props.setting?.city,
            accountNumber: props.setting?.accountNumber,
            iban: props.setting?.iban,
            swiftCode: props.setting?.swiftCode,
            taxNumber: props.setting?.taxNumber,
            tax: props.setting?.tax,
        };
        const formData = new FormData();
        formData.append('user', JSON.stringify(signUpData.user) || '');
        formData.append('setting', JSON.stringify(settingData) || '');
        formData.append('membership', JSON.stringify(signUpData.membership) || '');
        if (props.image) {
            formData.append('image', props.image);
        }

        dispatch(setSetting(settingData));

        try {
            const res = await userSignUp(formData, headers);
            if(res){
                router.push("/logIn");
            }
        } catch (error) {
            console.error('User registration failed', error);
        }
    };

    return (
        <div className="flex flex-col md:flex-row md:justify-between">
            <button
                onClick={saveSettingData}
                className="order-1 md:order-none block w-full md:w-4/12 lg:w-3/12 text-center rounded-md bg-gray-300 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
                Back
            </button>
            <button
                type="submit"
                className="block w-full mb-4 md:mb-0 md:w-4/12 lg:w-3/12 text-center rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-black-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
                onClick={onSubmit}
            >
                Sign up
            </button>
        </div>
    )
}