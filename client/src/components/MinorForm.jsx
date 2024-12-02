import React from 'react';
import { useForm } from 'react-hook-form';

const MinorForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Formulario de menores:', data);
    // Aquí puedes llamar al servicio para guardar los datos
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Formulario de Menores</h2>

      <label>Nombre:</label>
      <input {...register('name', { required: true })} />

      <label>Edad:</label>
      <input {...register('age', { required: true })} type="number" />

      <button type="submit">Guardar Menor</button>
    </form>
  );
};

export default MinorForm;
