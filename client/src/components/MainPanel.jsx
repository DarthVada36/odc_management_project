import React from 'react'
import SearchBar from './SearchBar'

const MainPanel = ({ title, totalItems, children, onSearch }) => {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* Header section - reducimos el padding inferior */}
            <div className="px-8 pt-6 pb-4">
                {' '}
                {/* Reducido de pb-8 a pb-4 */}
                <div className="flex flex-col mb-2 md:flex-row md:justify-between md:items-center">
                    <h1 className="text-2xl font-bold text-black font-helvetica-w20-bold">
                        {title}
                    </h1>
                </div>
                {/* Línea naranja con menos margen */}
                <div className="mt-2 mb-3 border-t-2 border-orange"></div>{' '}
                {/* Reducido mb-4 a mb-3 */}
                {/* Total y Search Bar con menos padding */}
                <div className="flex flex-col py-2 md:flex-row md:justify-between md:items-center">
                    <p className="mb-0 text-black font-helvetica-w20-bold">
                        Total: {totalItems}
                    </p>
                    <div className="flex items-right md:1/3">
                        <SearchBar onSearch={onSearch} />
                    </div>
                </div>
            </div>

            {/* Content section */}
            <div className="flex-1 px-8 pb-6">{children}</div>
        </div>
    )
}

export default MainPanel
