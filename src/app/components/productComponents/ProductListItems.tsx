'use client';
import { MdEdit } from "react-icons/md";
import { IoMdTrash } from "react-icons/io";
import { Product } from "@/app/types/product";
import Link from "next/link";

interface ProductListItemsProps {
    products: Product[];
    onDelete: (id: number | undefined) => void;
    setLoading: React.Dispatch<React.SetStateAction<any>>;
}

export const ProductListItems: React.FC<ProductListItemsProps> = (props) => {
    return (
        <>
            <tbody>
            {props.products.map((product: Product) => {
                return (
                    <tr key={product.idProduct} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                        <th scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {product.idProduct}
                        </th>
                        <td className="px-6 py-4">
                            {product.name}
                        </td>
                        <td className="px-6 py-4">
                            {product.description}
                        </td>
                        <td className="px-6 py-4">
                            {product.price}€
                        </td>
                        <td className="px-6 py-4 text-right block xl:flex xl:justify-end">
                            <Link href={`/products/edit/${product.idProduct}`} onClick={() => props.setLoading(true)}>
                                <MdEdit className="text-xl text-black rounded-xl bg-gray-50 hover:bg-gray-200 px-4 ring-1 ring-inset ring-cyan-700/10 w-[3.3rem] h-[1.7rem] mr-0 xl:mr-2 mb-1.5 xl:mb-0" />
                            </Link>
                            <IoMdTrash onClick={() => props.onDelete(product.idProduct)} className="text-xl text-red-700 cursor-pointer rounded-xl bg-red-50 hover:bg-red-100 px-4 py-1 ring-1 ring-inset ring-pink-700/10 w-[3.3rem] h-[1.7rem]" />
                        </td>
                    </tr>
                )
            })}
            </tbody>
        </>
    )
}