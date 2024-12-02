import React, { useState } from 'react';
import MainForm from '../components/MainForm';
import MinorForm from '../components/MinorForm';
import AdultCompanionForm from '../components/AdultCompanionForm';
import formImage from '../assets/img/imageform.svg';

const RegisterPage = () => {
    const [includeMinor, setIncludeMinor] = useState(false);
    const [includeAdult, setIncludeAdult] = useState(false);

    return (
      <div>
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
