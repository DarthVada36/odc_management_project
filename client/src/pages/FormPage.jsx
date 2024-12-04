import React, { useState } from 'react';
import MainForm from '../components/MainForm';
import MinorForm from '../components/MinorForm';
import AdultCompanionForm from '../components/AdultCompanionForm';
import formImage from '../assets/img/imageform.svg';

const RegisterPage = () => {
    const [includeMinor, setIncludeMinor] = useState(false);
    const [includeAdult, setIncludeAdult] = useState(false);
    const [formData, setFormData] = useState(null);

    const handleFormSubmit = (data) => {
        setFormData(data); // Guardar datos del formulario principal
    };

    return (
        <div className="flex flex-col items-center justify-center px-4">
            <h1 className='text-orange text-center text-3xl font-bold'>
                Solicitud de inscripción a “Iníciate en mundo de la IA”
            </h1>
            <div className="flex p-8 m-10 border border-orange flex-col gap-6 lg:flex-col lg:gap-4 px-4">
                {/* Imagen y MainForm */}
                <div className="flex flex-col-reverse lg:flex-row lg:justify-between items-center gap-6">
                    <div className="flex-1 lg:flex justify-center">
                        <MainForm 
                            setIncludeMinor={setIncludeMinor} 
                            setIncludeAdult={setIncludeAdult} 
                            onSubmit={handleFormSubmit} // Pasar la función de manejo al MainForm
                        />
                    </div>
                    <div className="flex-1">
                        <img 
                            src={formImage} 
                            alt="Formulario Imagen" 
                            className="w-[615px] h-[616px] lg:max-w-full object-contain"
                        />
                    </div>
                </div>

                {/* Botón "Siguiente" */}
                <button
                    className="bg-orange text-white px-4 py-2 rounded-md font-semibold mt-4"
                    onClick={() => console.log("Datos enviados:", formData)}
                >
                    Siguiente
                </button>

                {/* Formularios Secundarios */}
                <div className="flex flex-col gap-6">
                    {includeMinor && <MinorForm />}
                    {includeAdult && <AdultCompanionForm />}
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
