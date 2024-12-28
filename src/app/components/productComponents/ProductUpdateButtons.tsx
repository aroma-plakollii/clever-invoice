'use client';
import { useRouter } from "next/navigation";
import { productUpdate } from "@/app/api/productService";
import { Product, ProductError } from "@/app/types/product";
import Link from "next/link";

interface ProductUpdateButtonsProps{
    product: Product | undefined;
    errors: ProductError;
    setErrors: React.Dispatch<React.SetStateAction<any>>;
    headers: Record<string, string>;
}

export const ProductUpdateButtons : React.FC<ProductUpdateButtonsProps> = (props) => {
    const router = useRouter();
    const id = Number(props.product?.idProduct);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedErrors = {
            name: !props.product?.name,
            price: !props.product?.price,
            description: !props.product?.description,
        };

        props.setErrors(updatedErrors);

        if (Object.values(updatedErrors).some(error => error)) {
            return;
        }

        const productData = {
            name: props.product?.name,
            price: props.product?.price,
            description: props.product?.description,
            idUser: props.product?.idUser
        };

        try {
            const res = await productUpdate(id, productData, props.headers);

            if(res){
                router.push('/products');
            }
        }catch (error){
            console.error('Product update failed', error)
        }
    }

    return (
        <div className="flex flex-col sm:flex-row sm:justify-end">
            <Link href={"/products"} className="order-1 sm:order-none w-full sm:w-3/12 xl:w-2/12 mr-0 sm:mr-2">
                <button
                    className="w-full py-2 rounded-md bg-gray-400 hover:bg-gray-500 text-sm font-medium text-white">
                    Cancel
                </button>
            </Link>
            <button
                onClick={onSubmit}
                type="submit"
                className="w-full sm:w-3/12 xl:w-2/12 rounded-md bg-black hover:bg-gray-900 px-7 py-2 mb-2 sm:mb-0 text-sm font-medium text-white">
                Edit
            </button>
        </div>
    )
}