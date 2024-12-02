import React from 'react';
import { useForm } from 'react-hook-form';

const MinorForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Formulario de menores:', data);
    // Aquí puedes llamar al servicio para guardar los datos
  };

  return (
    <div className='p-4 m-2 border-2 border-orange flex justify-center text-dark bg-light h-[11rem] font-inter'>
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className='font-bold text-lg'>Datos de menores</h2>

      <label>Nombre:</label>
      <input className='border border-dark' {...register('name', { required: true })} />

      <label>Edad:</label>
      <input className='border border-dark' {...register('age', { required: true })} type="number" />

      <button type="submit">Guardar Menor</button>
    </form>
    </div>
  );
};

export default MinorForm;
