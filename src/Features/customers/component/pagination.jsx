import { ArrowLeft, ArrowRight } from 'lucide-react';

const Pagination = () => {
    return (
        <div className="flex justify-center items-center gap-4 mt-6">

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-300 text-gray-600 ">
                <ArrowLeft className="h-5 w-5" />
            </div>

            {/* Page numbers */}
            {[1, 2, 3, 4, 5].map((page, index) => (
                <p
                    key={index}
                    className={`text-lg px-3 py-1 rounded-md font-medium transition ${page === 1
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-700 hover:underline hover:text-blue-600'
                        }`}
                >
                    {page}
                </p>
            ))}

            {/* Next button */}
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 text-white hover:bg-gray-500 cursor-pointer">
                <ArrowRight className="h-5 w-5" />
            </div>
        </div>
    );
};

export default Pagination;
