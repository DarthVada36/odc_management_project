import React from 'react';
import { useForm } from 'react-hook-form';

const MainForm = ({ setIncludeMinor, setIncludeAdult }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log('Formulario principal:', data);

    // Mostrar formularios secundarios según la selección
    setIncludeMinor(data.includeMinor);
    setIncludeAdult(data.includeAdult);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Formulario Base</h2>

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

      <label>¿Incluir menores de 14 años?</label>
      <input 
        {...register('includeMinor')} 
        type="checkbox" 
        onChange={(e) => setIncludeMinor(e.target.checked)} 
      />

      <label>¿Incluir acompañante mayor de 14 años?</label>
      <input 
        {...register('includeAdult')} 
        type="checkbox" 
        onChange={(e) => setIncludeAdult(e.target.checked)} 
      />

      <button type="submit">Siguiente</button>
    </form>
  );
};

export default MainForm;
