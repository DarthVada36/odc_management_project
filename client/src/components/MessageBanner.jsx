import React from 'react'

const MessageBanner = ({ message }) => {
    if (!message) return null

    return (
        <div className="relative top-0 left-0 right-0 p-4 text-sm text-white bg-primary">
            <span>{message}</span>
        </div>
    )
}

export default MessageBanner
