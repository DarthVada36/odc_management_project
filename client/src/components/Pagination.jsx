import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page) => {
      if (page >= 1 && page <= totalPages) {
        onPageChange(page);
      }
    };

    return (
            <div className="flex items-center justify-center space-x-2 flex-wrap p-4">
              {/* Previous button */}
              <button
                className={`px-3 py-2 rounded-md transition-colors ${
                  currentPage === 1
                    ? 'bg-orange cursor-not-allowed'
                    : 'bg-white text-black hover:bg-orange active:bg-orange active:text-white'
                }`}
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>
        
              {/* Page number buttons */}
              {Array.from({ length: 10 }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  className={`px-3 py-2 rounded-md transition-colors text-gray-700 hover:bg-orange-100 active:bg-orange-500 active:text-white ${
                    currentPage === page ? 'bg-orange-500 text-white' : 'bg-white'
                  }`}
                  onClick={() => handlePageChange(page)}
                >
                  {page}
                </button>
              ))}
        
              {/* Next button */}
              <button
                className={`px-3 py-2 rounded-md transition-colors ${
                  currentPage === totalPages
                    ? 'bg-orange cursor-not-allowed'
                    : 'bg-white text-gray-700 hover:bg-orange-100 active:bg-orange-500 active:text-white'
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          );
        };
    
export default Pagination;