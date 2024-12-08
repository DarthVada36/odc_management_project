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
                className="max-w-xs p-1 text-sm border border-borderInput w-28 sm:w-40 md:w-60 sm:max-w-md md:max-w-lg hover:border-black focus:outline-none placeholder-placeHolderText"
                onChange={handleInputChange}
            />
        </div>
    )
}

export default SearchBar
