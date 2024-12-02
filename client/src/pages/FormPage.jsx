import React, { useState } from 'react';
import MainForm from '../components/MainForm';
import MinorForm from '../components/MinorForm';
import AdultCompanionForm from '../components/AdultCompanionForm';

const RegisterPage = () => {
    const [includeMinor, setIncludeMinor] = useState(false);
    const [includeAdult, setIncludeAdult] = useState(false);

    return (
        <div>
            <h1>Registro al Curso X</h1>
            {/* Formulario principal */}
      <MainForm 
        setIncludeMinor={setIncludeMinor} 
        setIncludeAdult={setIncludeAdult} 
      />

      {/* Formulario de menores */}
      {includeMinor && <MinorForm />}

      {/* Formulario de acompañante adulto */}
      {includeAdult && <AdultCompanionForm />}
    </div>
  );
};

export default RegisterPage;
