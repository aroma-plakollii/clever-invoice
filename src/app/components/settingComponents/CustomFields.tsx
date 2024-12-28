import {FaPlus, FaXmark} from "react-icons/fa6";
import {PiDotsSixVertical} from "react-icons/pi";
import {IoMdTrash} from "react-icons/io";

interface CustomFieldsProps {
    inputFields: { label: string; value: string }[];
    setInputFields: React.Dispatch<React.SetStateAction<{ label: string; value: string }[]>>;
    inputFieldsErrors: { label: boolean; value: boolean }[];
    setInputFieldsErrors: React.Dispatch<React.SetStateAction<{ label: boolean; value: boolean }[]>>;
}

export const CustomFields: React.FC<CustomFieldsProps> = (props) => {
    const handleAddInput = () => {
        props.setInputFields([...props.inputFields, { label: "", value: "" }]);
        props.setInputFieldsErrors([...props.inputFieldsErrors, { label: false, value: false }]);
    };

    const handleInputChange = (index: number, field: 'label' | 'value', value: string) => {
        const updatedFields = [...props.inputFields];
        updatedFields[index][field] = value;
        props.setInputFields(updatedFields);

        const updatedErrors = [...props.inputFieldsErrors];
        const isSetFilled = updatedFields[index].label || updatedFields[index].value;

        if (isSetFilled) {
            updatedErrors[index] = {
                ...updatedErrors[index],
                [field]: !value,
            };
        } else {
            updatedErrors[index] = {
                label: false,
                value: false,
            };
        }

        props.setInputFieldsErrors(updatedErrors);
    };

    const handleDeleteInput = (index: number) => {
        if (props.inputFields.length === 1) {
            const updatedFields = [...props.inputFields];
            updatedFields[index] = {
                ...updatedFields[index],
                label: '',
                value: '',
            };
            props.setInputFields(updatedFields);
        } else {
            const updatedFields = props.inputFields.filter((_, i) => i !== index);
            props.setInputFields(updatedFields);

            const updatedErrors = props.inputFieldsErrors.filter((_, i) => i !== index);
            props.setInputFieldsErrors(updatedErrors);
        }
    };

    return (
        <div className="py-3 md:pl-3 md:border-t-0 border-gray-400 border-t">
            <div className="overflow-x-auto w-full rounded-[0.2rem] md:border md:border-gray-300">
                <table className="w-[40rem] sm:w-full border-b border-gray-300 md:border-b-0">
                    <thead className="bg-gray-100 md:rounded-t-[0.2rem]">
                    <tr className="border-b border-gray-300">
                        <th className="p-2 text-sm text-left w-[20%]">Name</th>
                        <th className="p-2 text-sm text-left w-[40%]">Value</th>
                        <th className="p-2 text-sm text-left w-[5%]"></th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.inputFields.map((field, index) => (
                        <tr key={index}>
                            <td className="p-1.5 w-[20%]">
                                <input
                                    type="text"
                                    placeholder="Label"
                                    value={field.label}
                                    onChange={(e) => handleInputChange(index, 'label', e.target.value)}
                                    className={`p-1 text-sm border ${props.inputFieldsErrors?.[index]?.label ? 'border-red-500' : 'border-gray-300'} rounded-sm w-full`}
                                />
                            </td>
                            <td className="p-1.5 w-[45%]">
                                <input
                                    type="text"
                                    placeholder="Value"
                                    value={field.value}
                                    onChange={(e) => handleInputChange(index, 'value', e.target.value)}
                                    className={`p-1 text-sm border ${props.inputFieldsErrors?.[index]?.value ? 'border-red-500' : 'border-gray-300'} rounded-sm w-full`}
                                />
                            </td>
                            <td className="p-1.5 w-[5%]">
                                <IoMdTrash
                                    onClick={() => handleDeleteInput(index)}
                                    className="text-lg cursor-pointer text-red-600"
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="w-full text-left md:text-right">
                <button
                    type="button"
                    onClick={handleAddInput}
                    className="mt-3 inline-flex items-center px-3 py-1.5 text-xs sm:text-sm font-medium rounded-md shadow-sm text-black bg-gray-200 hover:md:bg-black hover:md:text-white"
                >
                    <FaPlus
                        className="mr-2 text-white bg-black rounded-full p-[0.09rem] sm:p-0.5 text-sm sm:text-base mb-[0.13rem] sm:mb-0"
                    />
                    Add item
                </button>
            </div>
        </div>
    );
};