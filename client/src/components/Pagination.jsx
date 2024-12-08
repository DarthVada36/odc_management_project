import React from 'react'

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page)
        }
    }

    return (
        <div className="flex items-center justify-center py-[4.5rem] space-x-2">
            {/* Previous button */}
            <button
                className={`px-3 py-2 rounded transition-colors ${
                    currentPage === 1
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-white text-black hover:bg-orange hover:text-white'
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <svg
                    className="w-5 h-5"
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
                    className={`px-3 py-1 rounded transition-colors font-helvetica-w20-bold ${
                        currentPage === page
                            ? 'bg-orange text-white'
                            : 'bg-white text-black hover:bg-orange/20'
                    }`}
                    onClick={() => handlePageChange(page)}
                >
                    {page}
                </button>
            ))}

            {/* Next button */}
            <button
                className={`px-3 py-2 rounded transition-colors ${
                    currentPage === totalPages
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-white text-black hover:bg-orange hover:text-white'
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <svg
                    className="w-5 h-5"
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
