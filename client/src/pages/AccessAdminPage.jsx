import React from 'react'
import AccessForm from '../components/AccessForm'

const AccessAdminPage = () => {
    return (
        <div className="flex min-h-screen">
            {/* Imagen de la izquierda */}
            <div
                className="w-1/2 bg-center bg-cover"
                style={{ backgroundImage: 'url(/img-login.png)' }}
            ></div>

            {/* Formulario de acceso a la derecha */}
            <div className="w-1/2 p-8 bg-white">
                <AccessForm />
            </div>
        </div>
    )
}

export default AccessAdminPage
