import React from "react";

const SearchBar = ({ onSearch }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value); // Llama a la función `handleSearch` en AdminPanel
  };

  return (
    <div className="flex items-center justify-right p-8">
    <input
      type="text"
      placeholder="Buscar usuarios..."
      className="border border-yellow rounded-md p-1 text-sm w-28 sm:w-40 md:w-60"
      //border border-gray-300 rounded-md p-1 text-sm w-28 sm:w-40 md:w-60
      onChange={handleInputChange}
    />
    </div>
  );
};

export default SearchBar;