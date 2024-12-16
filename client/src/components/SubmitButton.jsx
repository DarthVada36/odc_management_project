import React from 'react'

const SubmitButton = ({ text, onClick }) => {
    return (
        <button
            type="submit"
            onClick={onClick}
            className="w-full py-3 text-black transition-all duration-300 ease-in-out bg-primary hover:bg-opacity-80"
        >
            {text}
        </button>
    )
}

export default SubmitButton
