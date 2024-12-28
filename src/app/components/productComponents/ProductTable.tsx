'use client';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store/store";
import { setProducts } from "@/app/features/products/productSlice";
import { useHeaders } from "@/app/hooks/useHeaders";
import { useAuth } from "@/app/hooks/useAuth";
import { productDelete, productGetAllByUserPaged, productGetAllPaged } from "@/app/api/productService";
import { Product } from "@/app/types/product";
import Link from "next/link";
import { Pagination } from "@/app/components/paginationComponent/Pagination";
import AlertConfirm from "@/app/components/alertComponents/AlertConfirm";
import {ProductListItems} from "@/app/components/productComponents/ProductListItems";
import {TableLoader} from "@/app/components/loaderComponents/TableLoader";

export const ProductTable = () => {
    const headers = useHeaders();
    const dispatch = useDispatch();
    const { user } = useAuth();
    const products = useSelector((state: RootState) => state.products);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const [alertOpen, setAlertOpen]= useState<boolean>(false);
    const [productId, setProductId]= useState<number | undefined>(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading]= useState<boolean>(true);

    useEffect(() => {
        const getProducts = async () => {
            const pageData = {
                page: currentPage,
                itemsPerPage: 20
            }
            const productsResponse =  user.idRole.name === 'admin' ? await productGetAllPaged(currentPage, headers) : await productGetAllByUserPaged(user.idUser, pageData, headers);

            if(productsResponse){
                dispatch(setProducts(productsResponse.products as Product[]));
                setTotalPages(productsResponse.totalPages);
                setLoading(false);
            }
        }

        getProducts();
    }, [dispatch, currentPage, isDeleted, headers, user.idRole.name, user.idUser]);

    const onDelete = async (id: number | undefined) => {
        setAlertOpen(true);
        setProductId(id);
    };

    const onCloseAlert = async (confirm: any) => {
        if (confirm === 'confirm') {
            const isDeleted = await productDelete(productId, headers);

            if (isDeleted) {
                setIsDeleted(true);
                setAlertOpen(false);
                setProductId(0);
            }
        } else if(confirm === 'cancel'){
            setAlertOpen(false);
            setProductId(0);
        }
    }

    return (
        <>
            <div className="relative">
                <div className="w-[98%] mx-auto flex justify-between">
                    <h1 className="text-xl uppercase font-bold mb-5">Products</h1>
                    <Link href={"/products/add"} onClick={() => setLoading(true)}>
                        <button
                            className="inline-flex items-center rounded-md bg-black hover:bg-gray-900 px-7 py-2 text-sm font-medium text-white mb-3">
                            Add
                        </button>
                    </Link>
                </div>
                {loading ? <TableLoader /> : (
                    <>
                    {products.length === 0 ?
                        <div className={`overflow-x-auto shadow-xl w-[98%] p-5 rounded-xl mx-auto`}>
                            <p className="font-medium">No products</p>
                        </div> : (
                            <div className="overflow-x-auto shadow-xl rounded-xl w-[98%] mx-auto">
                                <table
                                    className="min-w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead
                                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            Id
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Description
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Price
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                        </th>
                                    </tr>
                                    </thead>
                                    <ProductListItems setLoading={setLoading} products={products} onDelete={onDelete}/>
                                </table>
                            </div>
                        )}
                    </>
                )}
                {products.length > 1 && <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />}
            </div>
            {alertOpen && <AlertConfirm
                title={'You are deleting the product'}
                message={'Are you sure you want to delete the product?'}
                isOpen={alertOpen}
                onClose={onCloseAlert}
            />}
        </>
    )
}