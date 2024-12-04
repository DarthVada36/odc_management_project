import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SubmitButton from './SubmitButton';

const AccessForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Inicio de sesión exitoso');
        setErrorMessage('');
        console.log('Token:', data.token);
        localStorage.setItem('authToken', data.token);

        if (data.admin?.roleId === 1) {
          navigate('/super-admin-dashboard');
        } else {
          navigate('/admin-dashboard');
        }
      } else {
        setErrorMessage(data.error || 'Credenciales inválidas');
        setSuccessMessage('');
      }
    } catch (error) {
      setErrorMessage('Error de conexión');
      setSuccessMessage('');
    }
  };

  // ... resto del JSX permanece igual

  return (
    <div className="flex min-h-screen justify-center items-center border-2 border-orange">
      <div className="w-full max-w-md bg-white p-8">
        <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">Accede a tu cuenta</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div className="flex flex-col">
            <label htmlFor="username" className="block text-sm font-semibold text-gray-600">Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Nombre de ususario"
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
                  src={showPassword ? "/src/assets/password-open-eye.png" : "/src/assets/password-eye.png"}
                  alt={showPassword ? 'Ocultar' : 'Mostrar'}
                  className="w-6 h-6"
                />
              </button>
            </div>
          </div>

          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center text-sm">
              <input type="checkbox" className="form-checkbox text-orange-500" />
              <span className="ml-2 text-gray-600">Recordar mi información</span>
            </label>
            <Link to="#" className="text-sm text-orange-500 hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <SubmitButton text="Acceder" />
        </form>
      </div>
    </div>
  );
};

export default AccessForm;