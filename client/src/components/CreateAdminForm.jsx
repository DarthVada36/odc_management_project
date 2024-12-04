import React, { useState } from 'react';
import SubmitButton from './SubmitButton'; 

const CreateAdminForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(''); 
  const [successMessage, setSuccessMessage] = useState(''); 
  const [errorMessage, setErrorMessage] = useState(''); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return;
    }

    setPasswordError(''); 

    //Solicitud al back//
    try {
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
          role_id: 1,  
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Administrador creado con éxito');
        setErrorMessage(''); 
      } else {
        setErrorMessage(data.message || 'Hubo un error al crear el administrador');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Error de conexión');
      setSuccessMessage(''); 
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center border-2 border-orange">
      <div className="w-full max-w-md bg-white p-8">
        <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">Crear nuevo Administrador</h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Usuario */}
          <div className="flex flex-col">
            <label htmlFor="username" className="block text-sm font-semibold text-gray-600">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Nombre de usuario"
            />
          </div>

          {/* Contraseña */}
          <div className="flex flex-col">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-600">Contraseña</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Contraseña"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                <img
                  src={showPassword ? "/src/assets/password-open-eye.png" : "/src/assets/password-eye.png"} // Ruta desde 'public'
                  alt={showPassword ? 'Ocultar' : 'Mostrar'}
                  className="w-6 h-6"
                />
              </button>
            </div>
          </div>

          {/* Confirmar Contraseña */}
          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-600">Confirmar contraseña</label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Confirmar contraseña"
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <img
                  src={showConfirmPassword ? "/src/assets/password-open-eye.png" : "/src/assets/password-eye.png"} // Ruta desde 'public'
                  alt={showConfirmPassword ? 'Ocultar' : 'Mostrar'}
                  className="w-6 h-6"
                />
              </button>
            </div>
          </div>

          {/* Error contraseñas */}
          {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}

          {/* Éxito o error */}
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          <SubmitButton text="Crear nuevo Administrador" />
        </form>
      </div>
    </div>
  );
};

export default CreateAdminForm;