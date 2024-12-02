<<<<<<< HEAD
import React, { useState } from 'react';
import MainForm from '../components/MainForm';
import MinorForm from '../components/MinorForm';
import AdultCompanionForm from '../components/AdultCompanionForm';
=======
import React from 'react'

const FormPage = () => {
    return <div></div>
}
>>>>>>> 4f2ba0cf7b1292e6e33155b74d8dd020a583cbc4

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
