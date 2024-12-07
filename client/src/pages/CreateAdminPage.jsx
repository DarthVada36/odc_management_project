import React from 'react'
import CreateAdminForm from '../components/CreateAdminForm'

const CreateAdminPage = () => {
    return (
        <div className="flex min-h-screen">
            {/* Imagen izquierda */}

            <div className="flex justify-center w-1/2 mb-10 bg-center bg-cover">
                <img
                    src="/src/assets/orange-form.gif"
                    alt="Formulario en movimiento"
                />
            </div>

            {/* Formulario acceso derecha */}
            <div className="w-1/2 p-8 bg-white">
                <CreateAdminForm />
            </div>
        </div>
    )
}
export default CreateAdminPage
