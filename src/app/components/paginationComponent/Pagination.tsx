'use client';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

interface PaginationProps {
    currentPage: number;
    totalPages?: number; // Make totalPages optional
    onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = (props) => {
    const renderPageNumbers = () => {
        const pageNumbers: (number | string)[] = []; // Explicitly define the type
        const maxPageNumbersToShow = 10;

        if (!props.totalPages) {
            return pageNumbers; // Return an empty array if totalPages is undefined
        }

        if (props.totalPages <= maxPageNumbersToShow) {
            for (let i = 1; i <= props.totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (props.currentPage > 2) pageNumbers.push(1);
            if (props.currentPage > 3) pageNumbers.push('...');

            const startPage = Math.max(2, props.currentPage - 1);
            const endPage = Math.min(props.totalPages - 1, props.currentPage + 1);

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            if (props.currentPage < props.totalPages - 2) pageNumbers.push('...');
            if (props.currentPage < props.totalPages - 1) pageNumbers.push(props.totalPages);
        }

        return pageNumbers;
    };

    return (
        <div className="w-full flex justify-center mt-10">
            <nav
                className="isolate w-[94%] flex justify-between border-t-[1px] border-gray-300"
                aria-label="Pagination"
            >
                <a
                    href="#"
                    onClick={() => props.onPageChange(Math.max(props.currentPage - 1, 1))}
                    className="relative inline-flex items-center justify-center px-2 text-gray-400 focus:z-20 focus:outline-offset-0"
                >
                    <FaArrowLeft className="text-gray-700 hover:text-gray-900 w-4 h-4" />
                </a>

                <div>
                    {renderPageNumbers().map((page, index) =>
                        typeof page === 'string' ? (
                            <span
                                key={index}
                                className="relative inline-flex items-center px-4 text-sm font-semibold text-cyan-700 border-t-2 border-cyan-700 hover:bg-cyan-700 hover:text-white focus:outline-offset-0"
                            >
                                {page}
                            </span>
                        ) : (
                            <a
                                key={index}
                                href="#"
                                onClick={() => {
                                    if (typeof page === 'number') {
                                        props.onPageChange(page);
                                    }
                                }}
                                className={`relative inline-flex items-center px-4 py-2 text-sm font-bold ${
                                    page === props.currentPage
                                        ? 'text-black border-t-2 border-black hover:bg-black hover:text-white'
                                        : 'text-gray-400 hover:bg-black hover:text-white hover:border-t-2 hover:border-black'
                                } focus:z-20 focus:outline-offset-0`}
                            >
                                {page}
                            </a>
                        )
                    )}
                </div>

                <a
                    href="#"
                    onClick={() => props.onPageChange(Math.min(props.currentPage + 1, props.totalPages || props.currentPage + 1))}
                    className="relative inline-flex items-center px-2 text-gray-400 focus:z-20 focus:outline-offset-0"
                >
                    <FaArrowRight className="text-gray-700 hover:text-gray-900 w-4 h-4"/>
                </a>
            </nav>
        </div>
    );
};