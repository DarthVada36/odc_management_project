import React from 'react'
import SearchBar from './SearchBar'

const MainPanel = ({ title, totalItems, children, onSearch }) => {
    return (
        <div className="flex flex-col min-h-screen p-4 bg-white">
            {/* Header */}
            <div className="flex flex-col mb-2 md:flex-row md:justify-between md:items-center">
                <h1 className="p-1 text-2xl font-bold text-orange">{title}</h1>
            </div>
            <div className="mb-4 border-t-2 border-orange"></div>
            {/* Total and Search Bar */}
            <div className="flex flex-col mb-4 md:flex-row md:justify-between md:items-center">
                <p className="p-8 mb-0 text-center text-black md:mb-0">
                    Total: {totalItems}
                </p>
                <div className="flex items-right md:1/3">
                    <SearchBar onSearch={onSearch} />
                </div>
            </div>
            {/* Dynamic content */}
            {children}
        </div>
    )
}

export default MainPanel
