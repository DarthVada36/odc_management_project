import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page)
        }
    }

    return (
        <div className="flex items-center justify-center h-full pb-5 space-x-4">
            {/* Previous button */}
            <button
                className={`px-3 py-2 text-black transition-colors duration-300 rounded-none border-2 border-black font-helvetica-w20-bold ${
                    currentPage === 1
                        ? 'bg-gray-200 text-gray-500 hover:bg-gray-300 cursor-not-allowed'
                        : 'bg-white hover:bg-black hover:text-white'
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
            </button>

            {/* Page numbers */}
            {Array.from(
                { length: Math.min(totalPages, 10) },
                (_, i) => i + 1
            ).map((page) => (
                <button
                    key={page}
                    className={`px-4 py-2 text-black transition-colors duration-300 font-helvetica-w20-bold rounded-none ${
                        currentPage === page
                            ? 'bg-orange text-white'
                            : 'bg-white hover:bg-black hover:text-white'
                    }`}
                    onClick={() => handlePageChange(page)}
                >
                    {page}
                </button>
            ))}

            {/* Next button */}
            <button
                className={`px-3 py-2 text-black transition-colors duration-300 rounded-none border-2 border-black font-helvetica-w20-bold ${
                    currentPage === totalPages
                        ? 'bg-gray-200 text-gray-500 hover:bg-gray-300 cursor-not-allowed'
                        : 'bg-white hover:bg-black hover:text-white'
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
        </div>
    )
}

export default Pagination
