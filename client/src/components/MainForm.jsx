import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

const MainForm = ({
  setIncludeMinor,
  setIncludeAdult,
  includeMinor,
  includeAdult,
  formData,
  setFormData,
}) => {
  const {
    register,
    formState: { errors },
  } = useForm({
    defaultValues: formData || {},
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className='p-6 border border-orange bg-light shadow-md w-full max-w-screen'>
      <h2 className='font-semibold text-lg mb-4 text-orange'>
        Datos Personales
      </h2>
      <form className='flex flex-col gap-4'>
        {/* Nombre Completo */}
        <div>
          <label className='block font-medium mb-1'>Nombre Completo:</label>
          <input
            className='w-full border border-dark px-3 py-2 '
            {...register('fullname', { required: 'Este campo es obligatorio' })}
            onChange={handleChange}
          />
          {errors.fullname && (
            <p className='text-red-500'>{errors.fullname.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className='block font-medium mb-1'>Email:</label>
          <input
            className='w-full border border-dark px-3 py-2 '
            type='email'
            {...register('email', {
              required: 'Este campo es obligatorio',
              pattern: {
                value: /^[^@]+@[^@]+\.[^@]+$/,
                message: 'Por favor, ingresa un email válido',
              },
            })}
            onChange={handleChange}
          />
          {errors.email && (
            <p className='text-red-500'>{errors.email.message}</p>
          )}
        </div>

        {/* Género y edad */}
        <div className='flex justify-between items-center gap-4'>
          <label htmlFor='gender'>Género:</label>
          <select
            id='gender'
            name='gender'
            className='flex-1 border border-dark'
            {...register('gender')}
            onChange={handleChange}
          >
            <option value=''>Seleccionar</option>
            <option value='mujer'>Mujer</option>
            <option value='hombre'>Hombre</option>
            <option value='otros generos'>Otro</option>
          </select>
          <label htmlFor='age'>Edad:</label>
          <input
            id='age'
            name='age'
            type='number'
            className='flex-1 border border-dark px-3 py-2 '
            {...register('age')}
            onChange={handleChange}
          />
        </div>

        {/* Checkboxes */}
        <div>
          <label className='flex items-center gap-2'>
            <input
              className='peer hidden'
              type='checkbox'
              {...register('is_first_activity')}
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  is_first_activity: e.target.checked, // Devuelve true o false
                }))
              }
            />
            <span className='w-5 h-5 border-2 border-orange flex items-center justify-center text-sm font-bold text-transparent peer-checked:bg-orange peer-checked:text-black'>
              X
            </span>
            ¿Es tu primera actividad en Orange Digital Center?
          </label>
        </div>

        {/* Checkboxes para acompañantes */}
        <h1 className='text-lg font-bold text-left'>
          ¿Vienes con algún acompañante?
        </h1>
        <div className='flex flex-col items-start gap-2'>
          <label className='flex items-center gap-2'>
            <input
              type='checkbox'
              className='peer hidden'
              checked={includeMinor}
              onChange={() => setIncludeMinor(!includeMinor)} // Toggle state
            />
            <span className='w-5 h-5 border-2 border-orange flex items-center justify-center text-sm font-bold text-transparent peer-checked:bg-orange peer-checked:text-black'>
              X
            </span>
            Con uno o más menores de 14 años
          </label>

          {/* Checkbox: +14 años */}
          <label className='flex items-center gap-2'>
            <input
              type='checkbox'
              className='peer hidden'
              checked={includeAdult}
              onChange={() => setIncludeAdult(!includeAdult)} // Toggle state
            />
            <span className='w-5 h-5 border-2 border-orange flex items-center justify-center text-sm font-bold text-transparent peer-checked:bg-orange peer-checked:text-black'>
              X
            </span>
            Con un mayor de 14 años
          </label>
        </div>
      </form>
    </div>
  );
};

// Validación de props con propTypes
MainForm.propTypes = {
  setIncludeMinor: PropTypes.func.isRequired,
  setIncludeAdult: PropTypes.func.isRequired,
  includeMinor: PropTypes.bool.isRequired,
  includeAdult: PropTypes.bool.isRequired,
  formData: PropTypes.object,
  setFormData: PropTypes.func.isRequired,
};

export default MainForm;
