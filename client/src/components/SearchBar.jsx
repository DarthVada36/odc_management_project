import React from 'react'

const SearchBar = ({ onSearch }) => {
    const handleInputChange = (e) => {
        onSearch(e.target.value)
    }

    return (
        <div className="flex items-center pb-4 justify-right md:justify-end">
            <input
                type="text"
                placeholder="Buscar"
                className="max-w-xs p-2 text-sm border rounded-none border-inputBorder w-28 sm:w-40 md:w-60 sm:max-w-md md:max-w-lg hover:border-dark focus:border-dark focus:outline-none placeholder:text-placeHolderText font-helvetica-w20-bold"
                onChange={handleInputChange}
            />
        </div>
    )
}

export default SearchBar
