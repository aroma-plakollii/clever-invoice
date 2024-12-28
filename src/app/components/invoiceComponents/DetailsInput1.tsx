// import { FaPlus } from "react-icons/fa6";
// import { PiDotsSixVertical } from "react-icons/pi";
// import { FaXmark } from "react-icons/fa6";
// import {Invoice, InvoiceDetails} from "@/app/types/invoice";
// import {useEffect} from "react";
//
// interface AddInvoiceDetailsInputProps{
//     inputFields: any[];
//     setInputFields: React.Dispatch<React.SetStateAction<any>>;
//     setInvoice: React.Dispatch<React.SetStateAction<Invoice>>;
//     invoice: Invoice | undefined;
//     inputFieldsErrors: any[];
//     setInputFieldsErrors: React.Dispatch<React.SetStateAction<any[]>>;
// }
//
// export const DetailsInput1: React.FC<AddInvoiceDetailsInputProps> = (props) => {
//     const handleAddInput = () => {
//         const newField: InvoiceDetails = {
//             id: props.inputFields.length + 1, // unique id incrementing by 1
//             name: "",
//             details: "",
//             price: "",
//             isProduct: false,
//             productId: null,
//             quantity: 0,
//         };
//         props.setInputFields([...props.inputFields, newField]);
//         props.setInputFieldsErrors([...props.inputFieldsErrors, { name: false, details: false, price: false }]);
//     };
//
//     const handleInputChange = (index: number, field: keyof InvoiceDetails, value: any) => {
//         const updatedFields = [...props.inputFields];
//         updatedFields[index][field] = value;
//         props.setInputFields(updatedFields);
//
//         const updatedErrors = Array.isArray(props.inputFieldsErrors) ? [...props.inputFieldsErrors] : [];
//         const isSetFilled = updatedFields[index].name || updatedFields[index].details || updatedFields[index].price;
//
//         if (isSetFilled) {
//             updatedErrors[index] = {
//                 ...updatedErrors[index],
//                 [field]: !value,
//             };
//         } else {
//             updatedErrors[index] = {
//                 name: false,
//                 details: false,
//                 price: false,
//             };
//         }
//
//         props.setInputFieldsErrors(updatedErrors);
//     };
//
//     const handleDeleteInput = (index: number) => {
//         if (props.inputFields.length === 1) {
//             // If only one input set exists, clear the inputs
//             const updatedFields = [...props.inputFields];
//             updatedFields[index] = {
//                 ...updatedFields[index],
//                 name: "",
//                 details: "",
//                 price: "",
//             };
//             props.setInputFields(updatedFields);
//         } else {
//             // If multiple input sets exist, remove the selected one and reindex
//             const updatedFields = props.inputFields.filter((_, i) => i !== index).map((field, i) => ({ ...field, id: i + 1 })); // reindexing the ids
//             props.setInputFields(updatedFields);
//             const updatedErrors = props.inputFieldsErrors.filter((_, i) => i !== index);
//             props.setInputFieldsErrors(updatedErrors);
//         }
//     };
//
//     useEffect(() => {
//         const calculateTotalPrice = () => {
//             let total = props.inputFields.reduce((acc, field) => {
//                 if (field.price !== "") { // Check if price is not an empty string
//                     const price = parseFloat(field.price) || 0;
//                     const quantity = field.quantity || 1; // Default quantity to 1 if not specified
//                     return acc + (price * quantity);
//                 }
//                 return acc;
//             }, 0);
//
//             // Check if the product price and quantity should be added to the total
//             if (props.invoice?.idProduct !== undefined && props.invoice?.quantity) {
//                 const productPrice =
//                     typeof props.invoice.idProduct.price === 'number'
//                         ? props.invoice.idProduct.price
//                         : props.invoice.idProduct.price
//                             ? parseFloat(props.invoice.idProduct.price)
//                             : 0;
//
//                 total += productPrice * props.invoice.quantity;
//             }
//
//             const totalFixed = parseFloat(total.toFixed(2));
//             props.setInvoice((prevInvoice) => ({ ...prevInvoice, totalPrice: totalFixed }));
//         };
//
//         calculateTotalPrice();
//     }, [props.inputFields, props.invoice?.idProduct, props.invoice?.quantity]);
//
//     useEffect(() => {
//         if (props.invoice?.idProduct !== undefined) {
//             const updatedFields = props.inputFields.map((field) => ({
//                 ...field,
//                 isProduct: true,
//                 productId: props.invoice?.idProduct,
//                 quantity: props.invoice?.quantity || field.quantity,
//             }));
//             props.setInputFields(updatedFields);
//         }
//     }, [props.invoice?.idProduct, props.invoice?.quantity]);
//
//     return (
//         <div className="col-span-2 px-4 pt-4 pb-[1px] bg-gray-100 rounded-xl">
//             {props.inputFields.map((field, index) => (
//                 <div key={index} className="mb-2 flex items-end sm:items-center">
//                     <PiDotsSixVertical className="hidden sm:block w-1% mr-[1%] mb-1.5" />
//                     <div className="w-[90%]">
//                         <input
//                             type="text"
//                             value={field.name}
//                             onChange={(e) => handleInputChange(index, 'name', e.target.value)}
//                             className={`mb-2 px-3.5 py-2 border ${props.inputFieldsErrors?.[index]?.name ? 'border-red-500' : 'border-gray-300'} rounded-md mr-[1.5%] w-full sm:w-[31%]`}
//                         />
//                         <input
//                             type="text"
//                             value={field.details}
//                             onChange={(e) => handleInputChange(index, 'details', e.target.value)}
//                             className={`mb-2 px-3.5 py-2 border ${props.inputFieldsErrors?.[index]?.details ? 'border-red-500' : 'border-gray-300'} rounded-md mr-[1.5%] w-full sm:w-[31%]`}
//                         />
//                         <input
//                             type="text"
//                             value={field.price}
//                             onChange={(e) => handleInputChange(index, 'price', e.target.value)}
//                             className={`mb-2 px-3.5 py-2 border ${props.inputFieldsErrors?.[index]?.price ? 'border-red-500' : 'border-gray-300'} rounded-md mr-[1.5%] w-full sm:w-[31%]`}
//                         />
//                     </div>
//                     <FaXmark
//                         onClick={() => handleDeleteInput(index)}
//                         className="w-1% mr-1 cursor-pointer bg-black text-white mb-3 sm:mb-0 ml-1 sm:ml-0"
//                     />
//                     {index === props.inputFields.length - 1 ? (
//                         <FaPlus onClick={handleAddInput} className="sm:mb-0 mb-3 cursor-pointer"/>
//                     ) : (
//                         <div className="w-[1em]"></div>
//                     )}
//                 </div>
//             ))}
//             {props.invoice?.totalPrice !== undefined ? (
//                 <div className="text-right mt-4 mb-2">
//                     <div className="text-right mt-4">
//                         <p>Total: {typeof props.invoice.totalPrice === 'number' ? props.invoice.totalPrice.toFixed(2) : '0.00'}€</p>
//                     </div>
//                 </div>
//             ) : (
//                 <div className="text-right mt-4 mb-2">
//                     <div className="text-right mt-4">
//                         <p>Total: 0.00€</p>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };