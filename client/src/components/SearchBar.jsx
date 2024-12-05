import React from "react";

const SearchBar = ({ onSearch }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value); // Llama a la función `handleSearch` en AdminPanel
  };

  return (
    <div className="flex items-center justify-right md:justify-end p-8">
    <input
      type="text"
      placeholder="Buscar inscripciones..."
      className="border border-orange rounded-md p-1 text-sm w-28 sm:w-40 md:w-60 max-w-xs sm:max-w-md md:max-w-lg"
      //px-3 py-2 text-sm w-full max-w-xs sm:max-w-md md:max-w-lg focus:outline-none focus:ring focus:ring-orange-300"
      onChange={handleInputChange}
    />
    </div>
  );
};

export default SearchBar;