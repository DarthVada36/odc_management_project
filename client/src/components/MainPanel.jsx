import React from 'react'
import SearchBar from './SearchBar'

const MainPanel = ({ title, totalItems, children, onSearch }) => {
    return (
        <div className="flex flex-col flex-1 bg-neutral-100">
            <div className="px-4 pt-6 pb-8 mobile:px-4 tablet:px-8 laptop:px-8 desktop:px-8">
                <div className="flex flex-col mb-2 mobile:mb-2 tablet:flex-row tablet:justify-between tablet:items-center">
                    <h1 className="text-xl font-bold text-black font-helvetica-w20-bold tablet:text-2xl">
                        {title}
                    </h1>
                </div>
                <div className="mt-2 mb-3 border-t-2 border-orange"></div>
                <div className="flex flex-col py-2 mobile:flex-col tablet:flex-row tablet:justify-between tablet:items-center">
                    <p className="mb-2 text-black font-helvetica-w20-bold tablet:mb-0">
                        Total: {totalItems}
                    </p>
                    <div className="flex items-right desktop:w-[23%] mobile:w-ful tablet:w-[27.5%] laptop:w-1/3 desktop:w-1/3">
                        <SearchBar onSearch={onSearch} />
                    </div>
                </div>
            </div>
            {/* Content section */}
            <div className="flex-1 px-4 pb-6 mobile:px-4 tablet:px-8 laptop:px-8 desktop:px-8">
                {children}
            </div>
        </div>
    )
}

export default MainPanel
