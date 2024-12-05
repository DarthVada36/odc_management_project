import React from 'react';
import { useForm } from 'react-hook-form';

const AdultCompanionForm = ({ onAddCompanion }) => {
  const { register, handleSubmit, reset } = useForm();
 
  const onSubmit = (data) => {
    onAddCompanion(data);
    reset();
  };

  return (
    <div className="p-6 border border-orange bg-light shadow-md w-full max-w-screen">
      <h2 className="font-semibold text-lg mb-4 text-orange">Acompañante Adicional</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Nombre Completo */}
        <div>
          <label className="block font-medium mb-1">Nombre Completo:</label>
          <input
            {...register('fullname', { required: true })}
            className="w-full border border-dark px-3 py-2 rounded-md"
            type="text"
            placeholder="Nombre completo del acompañante"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-medium mb-1">Email:</label>
          <input
            {...register('email', { required: true })}
            className="w-full border border-dark px-3 py-2 rounded-md"
            type="email"
            placeholder="Correo electrónico"
          />
        </div>

        {/* Género */}
        <div>
          <label className="block font-medium mb-1">Género:</label>
          <select
            {...register('gender', { required: true })}
            className="w-full border border-dark px-3 py-2 rounded-md"
          >
            <option value="">Selecciona el género</option>
            <option value="male">Masculino</option>
            <option value="female">Femenino</option>
            <option value="other">Otro</option>
          </select>
        </div>

        {/* Edad */}
        <div>
          <label className="block font-medium mb-1">Edad:</label>
          <input
            {...register('age', { required: true, min: 14 })}
            className="w-full border border-dark px-3 py-2 rounded-md"
            type="number"
            placeholder="Edad (mínimo 14 años)"
          />
        </div>

        

        {/* Botón de Añadir acompañante */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Añadir Acompañante
        </button>
      </form>
    </div>
  );
};


export default AdultCompanionForm;
