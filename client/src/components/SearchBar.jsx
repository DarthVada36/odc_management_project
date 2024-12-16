import React from 'react'

const SearchBar = ({ onSearch }) => {
    const handleInputChange = (e) => {
        onSearch(e.target.value)
    }

    return (
        <div className="flex items-center justify-end w-full">
            <input
                type="text"
                placeholder="Buscar"
                className="w-full p-2 transition-colors duration-300 border-2 border-black outline-none mobile:p-2 tablet:p-3 laptop:p-3 desktop:p-3 mobile:text-sm tablet:text-base laptop:text-base desktop:text-base placeholder-neutral-500 hover:border-primary focus:border-primary ring-0 font-helvetica-w20-bold"
                onChange={handleInputChange}
            />
        </div>
    )
}

export default SearchBar
