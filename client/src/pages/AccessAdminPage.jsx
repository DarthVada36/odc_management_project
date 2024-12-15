// AccessAdminPage.jsx
import React, { useState } from 'react'
import AccessForm from '../components/AccessForm'
import MessageBanner from '../components/MessageBanner'

const AccessAdminPage = () => {
    const [errorMessage, setErrorMessage] = useState('')

    const handleErrorMessage = (message) => {
        setErrorMessage(message)
    }

    return (
        <div className="relative w-full h-screen">
            <div className="flex flex-row w-full h-full">
                {/* Container with image */}
                <div
                    className="hidden w-1/2 bg-center bg-cover mobile:hidden tablet:hidden laptop:block desktop:block"
                    style={{ backgroundImage: 'url(/img-login.png)' }}
                ></div>

                {/* Container with form */}
                <div className="flex-1 p-4 bg-white sm:p-8 laptop:w-1/2 laptop:p-12 desktop:p-16">
                    <AccessForm
                        onError={handleErrorMessage}
                        errorMessage={errorMessage}
                        onClearError={() => setErrorMessage('')}
                    />
                </div>
            </div>
        </div>
    )
}

export default AccessAdminPage
