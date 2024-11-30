import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SubmitButton from './SubmitButton'; 


const AccessForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email, 'Password:', password);
  };

  return (
    <div className="flex min-h-screen justify-center items-center border-2 border-orange">
      <div className="w-full max-w-md bg-white p-8 ">
        <h2 className="text-3xl font-bold text-orange-500 mb-6 text-center">Accede a tu cuenta</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-600">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Correo electrónico"
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

          {/* Recordar info */}
          <div className="flex items-center justify-between">
            <label className="inline-flex items-center text-sm">
              <input type="checkbox" className="form-checkbox text-orange-500" />
              <span className="ml-2 text-gray-600">Recordar mi información</span>
            </label>
            <Link to="#" className="text-sm text-orange-500 hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {/* Botón de acceso */}
          <SubmitButton text="Acceder" onClick={handleSubmit} />

        </form>

      </div>
    </div>
  );
};

export default AccessForm;