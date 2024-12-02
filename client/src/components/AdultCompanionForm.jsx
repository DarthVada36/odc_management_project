import React from 'react';
import { useForm } from 'react-hook-form';

const AdultCompanionForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Formulario de acompañante adulto:', data);
    // Aquí puedes llamar al servicio para guardar los datos
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Formulario de Acompañante Adulto</h2>

      <label>Nombre Completo:</label>
      <input {...register('fullname', { required: true })} />

      <label>Email:</label>
      <input {...register('email', { required: true })} type="email" />

      <label>Género:</label>
      <select {...register('gender')}>
        <option value="male">Masculino</option>
        <option value="female">Femenino</option>
        <option value="other">Otro</option>
      </select>

      <label>Edad:</label>
      <input {...register('age', { required: true })} type="number" />

      <label>¿Primera actividad?</label>
      <input {...register('isFirstActivity')} type="checkbox" />

      <button type="submit">Guardar Acompañante</button>
    </form>
  );
};

export default AdultCompanionForm;
