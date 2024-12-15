import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const MessageBanner = ({ message, onClose }) => {
    if (!message) return null

    return (
        <div className="relative top-0 left-0 right-0 flex items-center justify-between p-4 text-[12px] text-white font-helvetica-w20-bold bg-primary">
            <span>{message}</span>
            <button
                onClick={onClose}
                className="text-white transition-transform duration-200 transform focus:outline-none hover:scale-75"
                aria-label="Close"
            >
                <AiOutlineClose size={20} />
            </button>
        </div>
    )
}

export default MessageBanner
