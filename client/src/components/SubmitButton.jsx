import React from 'react';

const SubmitButton = ({ text, onClick }) => {
  return (
    <button
      type="submit"
      onClick={onClick}
      className="w-full bg-orange text-black py-3 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
    >
      {text}
    </button>
  );
};

export default SubmitButton;
