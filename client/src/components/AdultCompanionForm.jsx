import React from 'react';
import { useForm } from 'react-hook-form';

const AdultCompanionForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Formulario de acompañante adulto:', data);
    // Aquí puedes llamar al servicio para guardar los datos
  };

  return (
    <div className=' m-2 p-4 border-2 border-orange flex justify-center text-dark bg-light h-[11rem] font-inter'>
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className='font-bold text-dark text-lg'>Acompañante adicional (mayor de edad) </h2>

      <label className='font-semibold'>Nombre Completo:</label>
      <input className='border border-dark'{...register('fullname', { required: true })} />

      <label>Email:</label>
      <input className='border border-dark'{...register('email', { required: true })} type="email" />

      <label>Género:</label>
      <select  className='border border-dark'{...register('gender')}>
        <option value="male">Masculino</option>
        <option value="female">Femenino</option>
        <option value="other">Otro</option>
      </select>

      <label>Edad:</label>
      <input className='border border-dark'{...register('age', { required: true })} type="number" />

      <label>¿Primera actividad?</label>
      <input className='border border-dark'{...register('isFirstActivity')} type="checkbox" />

      <button type="submit">Guardar Acompañante</button>
    </form>
    </div>
  );
};

export default AdultCompanionForm;
