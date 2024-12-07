import React from 'react'

const SearchBar = ({ onSearch }) => {
    const handleInputChange = (e) => {
        onSearch(e.target.value) // Llama a la función `handleSearch` en AdminPanel
    }

    return (
        <div className="flex items-center p-8 justify-right md:justify-end">
            <input
                type="text"
                placeholder="Buscar"
                className="max-w-xs p-1 text-sm border rounded-md border-orange w-28 sm:w-40 md:w-60 sm:max-w-md md:max-w-lg"
                //px-3 py-2 text-sm w-full max-w-xs sm:max-w-md md:max-w-lg focus:outline-none focus:ring focus:ring-orange-300"
                onChange={handleInputChange}
            />
        </div>
    )
}

export default SearchBar
