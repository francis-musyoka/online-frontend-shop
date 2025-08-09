import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';


const Pagination = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
    const [start, setStart] = useState(1);
    const [end, setEnd] = useState(itemsPerPage);

    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const handlePrev = () => {
        if (currentPage > 1) {
            const newEnd = start - 1;
            const newStart = Math.max(1, newEnd - itemsPerPage + 1);
            setStart(newStart);
            setEnd(newEnd);
            onPageChange(currentPage - 1)
        };
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            const newStart = end + 1;
            const newEnd = Math.min(totalItems, newStart + itemsPerPage - 1);
            setStart(newStart);
            setEnd(newEnd);
            onPageChange(currentPage + 1)
        }
    };

    const isPrevButtonDisabled = start === 1;
    const isNextButtonDisabled = end === totalItems;


    return (
        <div className="flex justify-end items-center gap-4 mt-6 mr-6">

            <p className="text-lg px-3 py-1 rounded-md  transition text-gray-700">
                {start} - {end} of {totalItems}
            </p>


            <button
                onClick={handlePrev}
                disabled={isPrevButtonDisabled}
                className={`flex h-10 w-10 items-center justify-center rounded-full ${!isPrevButtonDisabled
                    ? "text-neutral  hover:bg-gray-300 font-bold"
                    : "disabled:text-gray-400"}`}
            >
                < ChevronLeft className="h-7 w-7" />
            </button>

            {/* Next button */}
            <button
                onClick={handleNext}
                disabled={isNextButtonDisabled}
                className={`flex h-10 w-10 items-center justify-center rounded-full ${!isNextButtonDisabled
                    ? "text-neutral  hover:bg-gray-300 font-bold"
                    : "disabled:text-gray-400"}`}
            >
                < ChevronRight className="h-7 w-7" />
            </button>
        </div >
    );
};

export default Pagination;
