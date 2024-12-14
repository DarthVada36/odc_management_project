import React from 'react'
import AccessForm from '../components/AccessForm'

const AccessAdminPage = () => {
    return (
        <div className="flex h-screen">
            {/* Imagen de la izquierda */}
            <div
                className="hidden w-1/2 bg-center bg-cover mobile:hidden tablet:hidden laptop:block desktop:block"
                style={{ backgroundImage: 'url(/img-login.png)' }}
            ></div>

            {/* Formulario de acceso a la derecha */}
            <div className="flex items-center justify-center flex-1 p-4 bg-white sm:p-8 laptop:w-1/2 laptop:p-12 desktop:p-16">
                <AccessForm />
            </div>
        </div>
    )
}

export default AccessAdminPage
