import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { getCourseById } from '../services/coursesServices';
import plus from '../assets/icons/plus.svg';
import minus from '../assets/icons/minus.svg';
import MessageBanner from './MessageBanner';

const MainForm = ({
  setIncludeMinor,
  includeMinor,
  setIncludeAdult,
  includeAdult,
  formData,
  setFormData,
  onAddMinor,
  minors = [],
  onAddAdult,
  adult,
  onRemoveAdult,
  courseId,
  onValidationComplete, // Añadir este
}) => {
  const {
    register,
    formState: { errors },
  } = useForm({ defaultValues: formData });
  const [errorMessage, setErrorMessage] = useState(null);
  const [courseData, setCourseData] = useState(null);
  const [courseError, setCourseError] = useState('');
  const [minor, setMinor] = useState({ name: '', age: '' });
  const [minorError, setMinorError] = useState('');
  const [adultData, setAdultData] = useState({
    fullname: '',
    age: '',
    gender: '',
    email: '',
  });
  const [adultError, setAdultError] = useState('');

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const course = await getCourseById(courseId);
        setCourseData(course);
        setFormData((prevData) => ({
          ...prevData,
          courseId: course.id,
          minors: prevData.minors || [],
        }));
        setCourseError('');
      } catch (error) {
        setCourseError(error.message);
      }
    };
    fetchCourse();
  }, [courseId, setFormData]);

  const validateMinor = () => {
    if (!minor.name?.trim()) {
      setErrorMessage('El nombre del menor es obligatorio');
      return false;
    }

    if (!minor.age) {
      setErrorMessage('La edad del menor es obligatoria');
      return false;
    }

    const age = parseInt(minor.age);
    if (age <= 0 || age > 14) {
      setErrorMessage('La edad del menor debe ser igual o menor a 14 años');
      return false;
    }

    return true;
  };

  const validateAdult = () => {
    if (!adultData.fullname?.trim()) {
      setErrorMessage('El nombre completo del adulto es obligatorio');
      return false;
    }

    if (!adultData.email?.trim()) {
      setErrorMessage('El email del adulto es obligatorio');
      return false;
    }

    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailRegex.test(adultData.email)) {
      setErrorMessage('El formato del email del adulto no es válido');
      return false;
    }

    if (!adultData.gender) {
      setErrorMessage('Por favor selecciona un género para el adulto');
      return false;
    }

    if (!adultData.age) {
      setErrorMessage('La edad del adulto es obligatoria');
      return false;
    }

    const age = parseInt(adultData.age);
    if (age < 15) {
      setErrorMessage('La edad del adulto debe ser igual o mayor a 15 años');
      return false;
    }

    return true;
  };

  const addMinor = () => {
    if ((formData.minors || []).length >= 3) return;
    if (validateMinor()) {
      const updatedMinors = [...(formData.minors || []), minor];
      setFormData({ ...formData, minors: updatedMinors });
      onAddMinor(minor);
      setMinor({ name: '', age: '' });
      setErrorMessage(null);
    }
  };

  const genderOptions = [
    { value: 'mujer', label: 'Mujer' },
    { value: 'hombre', label: 'Hombre' },
    { value: 'otros generos', label: 'Otro' },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      border: '2px solid black',
      borderColor: state.isFocused ? '#ff7b00' : 'black',
      boxShadow: 'none',
      '&:hover': {
        borderColor: '#ff7b00',
      },
      padding: '6px',
      borderRadius: '0',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#212529' : 'white',
      color: state.isSelected ? 'white' : 'black',
      '&:hover': {
        backgroundColor: state.isSelected ? '#212529' : '#f0f0f0',
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'black',
    }),
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleGenderChange = (selectedOption, formType = 'main') => {
    const value = selectedOption ? selectedOption.value : '';
    if (formType === 'main') {
      setFormData((prev) => ({
        ...prev,
        gender: value,
      }));
    } else if (formType === 'adult') {
      setAdultData((prev) => ({
        ...prev,
        gender: value,
      }));
    }
  };

  const handleMinorChange = (e) => {
    const { name, value } = e.target;
    setMinor((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdultChange = (e) => {
    const { name, value } = e.target;
    setAdultData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    // Validar campos principales primero
    if (!formData.fullname?.trim()) {
      setErrorMessage('El nombre completo es obligatorio');
      return false;
    }

    if (!formData.email?.trim()) {
      setErrorMessage('El email es obligatorio');
      return false;
    }

    const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('El formato del email no es válido');
      return false;
    }

    if (!formData.gender) {
      setErrorMessage('Por favor selecciona un género');
      return false;
    }

    if (!formData.age) {
      setErrorMessage('La edad es obligatoria');
      return false;
    }

    const age = parseInt(formData.age);
    if (age < 18 || age > 99) {
      setErrorMessage('La edad debe estar entre 18 y 99 años');
      return false;
    }

    // Si hay menores, validar sección de menores
    if (includeMinor && (!formData.minors || formData.minors.length === 0)) {
      setErrorMessage('Debe añadir al menos un menor');
      return false;
    }

    // Si hay adulto acompañante, validar que se haya añadido
    if (includeAdult && !adult) {
      setErrorMessage('Debe añadir los datos del adulto acompañante');
      return false;
    }

    // Todo correcto
    setErrorMessage(null);
    return true;
  };

  // Añadir el event listener para la validación
  useEffect(() => {
    const handleValidation = () => {
      const isValid = validateForm();
      if (isValid) {
        onValidationComplete?.(true);
      }
    };

    document.addEventListener('validateForm', handleValidation);

    return () => {
      document.removeEventListener('validateForm', handleValidation);
    };
  }, [formData, includeMinor, includeAdult, adult]);

  const addAdult = () => {
    if (validateAdult()) {
      onAddAdult(adultData);
      setAdultData({ fullname: '', age: '', gender: '', email: '' });
      setErrorMessage(null);
    }
  };

  return (
    <div className='relative w-full overflow-visible border-2 border-primary'>
      {' '}
      {/* Cambiado para permitir que el banner sea visible */}
      <div className='p-8 bg-white'>
        <h2 className='mb-6 text-3xl font-bold text-orange-500 font-helvetica-w20-bold'>
          Datos Personales
        </h2>
        {courseData && (
          <div className='mb-6 bg-white'>
            <h3 className='text-xl font-bold text-orange-500'>
              {courseData.title}
            </h3>
            <p className='text-gray-600'>{courseData.description}</p>
            <p className='text-gray-600'>
              <strong>Fecha:</strong>{' '}
              {courseData.date && !isNaN(new Date(courseData.date))
                ? new Intl.DateTimeFormat('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                  }).format(new Date(courseData.date))
                : 'Fecha no disponible'}
            </p>
            <p className='text-gray-600'>
              <strong>Horario:</strong> {courseData.schedule}
            </p>
          </div>
        )}
        <form className='flex flex-col gap-4'>
          {/* Nombre Completo */}
          <div>
            <label className='block text-sm font-semibold text-gray-600 font-helvetica-w20-bold'>
              Nombre Completo:
            </label>
            <input
              className='w-full p-3 mt-2 transition-colors duration-300 border-2 border-black outline-none hover:border-primary focus:border-primary placeholder-neutral-500 ring-0'
              {...register('fullname', {
                required: 'Este campo es obligatorio',
              })}
              placeholder='Nombre completo'
              onChange={handleChange}
              value={formData.fullname || ''}
            />
            {errors.fullname && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.fullname.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className='block text-sm font-semibold text-gray-600 font-helvetica-w20-bold'>
              Email:
            </label>
            <input
              className='w-full p-3 mt-2 transition-colors duration-300 border-2 border-black outline-none hover:border-primary focus:border-primary placeholder-neutral-500 ring-0'
              type='email'
              placeholder='Correo electrónico'
              {...register('email', {
                required: 'Este campo es obligatorio',
                pattern: {
                  value: /^[^@]+@[^@]+\.[^@]+$/,
                  message: 'Por favor, ingresa un email válido',
                },
              })}
              onChange={handleChange}
              value={formData.email || ''}
            />
            {errors.email && (
              <p className='mt-1 text-sm text-red-500'>
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Género y Edad */}
          <div className='flex flex-col gap-4 sm:flex-row'>
            <div className='w-full sm:w-1/2'>
              <label className='block text-sm font-semibold text-gray-600 font-helvetica-w20-bold'>
                Género:
              </label>
              <Select
                value={
                  formData.gender
                    ? genderOptions.find(
                        (option) => option.value === formData.gender
                      )
                    : null
                }
                onChange={(option) => handleGenderChange(option, 'main')}
                options={genderOptions}
                placeholder='Seleccionar género'
                styles={{
                  ...customStyles,
                  control: (base, state) => ({
                    ...base,
                    border: '2px solid black',
                    borderColor: state.isFocused ? '#ff7b00' : 'black',
                    boxShadow: 'none',
                    '&:hover': {
                      borderColor: '#ff7b00',
                    },
                    minHeight: '3.2rem',
                    borderRadius: '0',
                    marginTop: '0.52rem',
                  }),
                }}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                })}
              />
            </div>
            <div className='w-full sm:w-1/2'>
              <label className='block text-sm font-semibold text-gray-600 font-helvetica-w20-bold'>
                Edad:
              </label>
              <input
                name='age'
                type='number'
                placeholder='Edad'
                value={formData.age || ''} // Cambiado aquí
                onChange={handleChange} // Cambiado aquí
                className='w-full p-3 mt-2 transition-colors duration-300 border-2 border-black outline-none hover:border-primary focus:border-primary placeholder-neutral-500 ring-0'
              />
            </div>
          </div>

          {/* Checkboxes */}
          <div className='flex flex-col gap-4 mt-4'>
            <label className='flex items-center gap-2 cursor-pointer'>
              <input
                type='checkbox'
                checked={formData.is_first_activity || false}
                onChange={handleChange}
                name='is_first_activity'
                className='hidden peer'
              />
              <span
                className='w-8 h-8 bg-center bg-no-repeat'
                style={{
                  backgroundImage: formData.is_first_activity
                    ? "url('/src/assets/icons/orange-check.png')"
                    : "url('/src/assets/icons/orange-check-white.png')",
                }}
              ></span>
              <span className='text-sm text-gray-600'>
                Es mi primera actividad en ODC
              </span>
            </label>

            <label className='flex items-center gap-2 cursor-pointer'>
              <input
                type='checkbox'
                checked={formData.accepts_newsletter || false}
                onChange={handleChange}
                name='accepts_newsletter'
                className='hidden peer'
              />
              <span
                className='w-8 h-8 bg-center bg-no-repeat'
                style={{
                  backgroundImage: formData.accepts_newsletter
                    ? "url('/src/assets/icons/orange-check.png')"
                    : "url('/src/assets/icons/orange-check-white.png')",
                }}
              ></span>
              <span className='text-sm text-gray-600'>
                Quiero recibir newsletter
              </span>
            </label>

            <label className='flex items-center gap-2 cursor-pointer'>
              <input
                type='checkbox'
                checked={includeMinor}
                onChange={() => setIncludeMinor(!includeMinor)}
                className='hidden peer'
              />
              <span
                className='w-8 h-8 bg-center bg-no-repeat'
                style={{
                  backgroundImage: includeMinor
                    ? "url('/src/assets/icons/orange-check.png')"
                    : "url('/src/assets/icons/orange-check-white.png')",
                }}
              ></span>
              <span className='text-sm text-gray-600'>
                Inscribir menores de 14 años
              </span>
            </label>

            <label className='flex items-center gap-2 cursor-pointer'>
              <input
                type='checkbox'
                checked={includeAdult}
                onChange={() => setIncludeAdult(!includeAdult)}
                className='hidden peer'
              />
              <span
                className='w-8 h-8 bg-center bg-no-repeat'
                style={{
                  backgroundImage: includeAdult
                    ? "url('/src/assets/icons/orange-check.png')"
                    : "url('/src/assets/icons/orange-check-white.png')",
                }}
              ></span>
              <span className='text-sm text-gray-600'>
                Con un adulto acompañante
              </span>
            </label>
          </div>

          {/* Formulario para menores */}
          {includeMinor && (
            <div className='mt-6'>
              <h3 className='mb-4 text-xl font-bold text-orange-500'>
                Menores
              </h3>
              {(formData.minors || []).length < 3 ? (
                <div className='flex flex-col gap-4 sm:flex-row sm:gap-2'>
                  <input
                    type='text'
                    name='name'
                    placeholder='Nombre del menor'
                    value={minor.name}
                    onChange={handleMinorChange}
                    className='w-full p-3 transition-colors duration-300 border-2 border-black outline-none hover:border-primary focus:border-primary placeholder-neutral-500 ring-0'
                  />
                  <input
                    type='number'
                    name='age'
                    placeholder='Edad'
                    value={minor.age}
                    onChange={handleMinorChange}
                    className='w-full p-3 transition-colors duration-300 border-2 border-black outline-none sm:w-32 hover:border-primary focus:border-primary placeholder-neutral-500 ring-0'
                  />
                  <button
                    type='button'
                    onClick={addMinor}
                    className='flex items-center justify-center w-full h-12 text-black sm:w-12 bg-orange hover:bg-opacity-80'
                  >
                    <img src={plus} alt='plus' className='w-6 h-6' />
                  </button>
                </div>
              ) : (
                <p className='mt-4 text-sm text-red-500'>
                  Límite máximo de menores inscritos alcanzado.
                </p>
              )}
              {minorError && (
                <p className='mt-2 text-sm text-red-500'>{minorError}</p>
              )}
              <ul className='mt-4 space-y-2'>
                {(formData.minors || []).map((minor, index) => (
                  <li
                    key={index}
                    className='flex items-center justify-between p-3 border-2 border-black'
                  >
                    <span className='text-gray-600'>
                      {minor.name} - {minor.age} años
                    </span>
                    <button
                      type='button'
                      onClick={() => {
                        const updatedMinors = formData.minors.filter(
                          (_, i) => i !== index
                        );
                        setFormData({
                          ...formData,
                          minors: updatedMinors,
                        });
                      }}
                      className='p-1 bg-orange'
                    >
                      <img src={minus} alt='minus' className='w-6 h-6' />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Formulario para adulto acompañante */}
          {includeAdult && (
            <div className='mt-6'>
              <h3 className='mb-4 text-xl font-bold text-orange-500'>
                Adulto Acompañante
              </h3>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-semibold text-gray-600 font-helvetica-w20-bold'>
                    Nombre Completo:
                  </label>
                  <input
                    className='w-full p-3 mt-2 transition-colors duration-300 border-2 border-black outline-none hover:border-primary focus:border-primary placeholder-neutral-500 ring-0'
                    name='fullname'
                    value={adultData.fullname}
                    onChange={handleAdultChange}
                    placeholder='Nombre Completo'
                  />
                </div>

                <div>
                  <label className='block text-sm font-semibold text-gray-600 font-helvetica-w20-bold'>
                    Email:
                  </label>
                  <input
                    className='w-full p-3 mt-2 transition-colors duration-300 border-2 border-black outline-none hover:border-primary focus:border-primary placeholder-neutral-500 ring-0'
                    type='email'
                    name='email'
                    value={adultData.email}
                    onChange={handleAdultChange}
                    placeholder='Correo Electrónico'
                  />
                </div>

                <div className='flex flex-col gap-4 sm:flex-row'>
                  <div className='w-full sm:w-1/2'>
                    <label className='block text-sm font-semibold text-gray-600 font-helvetica-w20-bold'>
                      Género:
                    </label>
                    <Select
                      value={
                        adultData.gender
                          ? genderOptions.find(
                              (option) => option.value === adultData.gender
                            )
                          : null
                      }
                      onChange={(option) => handleGenderChange(option, 'adult')}
                      options={genderOptions}
                      placeholder='Seleccionar género'
                      styles={{
                        ...customStyles,
                        control: (base, state) => ({
                          ...base,
                          border: '2px solid black',
                          borderColor: state.isFocused ? '#ff7b00' : 'black',
                          boxShadow: 'none',
                          '&:hover': {
                            borderColor: '#ff7b00',
                          },
                          minHeight: '3.2rem',
                          borderRadius: '0',
                          marginTop: '0.52rem',
                        }),
                      }}
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                      })}
                    />
                  </div>

                  <div className='w-full sm:w-1/2'>
                    <label className='block text-sm font-semibold text-gray-600 font-helvetica-w20-bold'>
                      Edad:
                    </label>
                    <input
                      name='age'
                      type='number'
                      placeholder='Ingresa tu edad'
                      value={adultData.age || ''}
                      onChange={handleAdultChange}
                      className='w-full p-3 mt-2 transition-colors duration-300 border-2 border-black outline-none hover:border-primary focus:border-primary placeholder-neutral-500 ring-0'
                    />
                  </div>
                </div>

                <button
                  type='button'
                  onClick={addAdult}
                  className='w-full px-6 py-3 font-bold text-black transition-all duration-300 bg-primary font-helvetica-w20-bold hover:bg-black hover:text-white'
                >
                  Agregar Adulto
                </button>
                {adultError && (
                  <p className='mt-2 text-sm text-red-500'>{adultError}</p>
                )}

                {adult && (
                  <div className='p-4 mt-4 border-2 border-black'>
                    <div className='space-y-2'>
                      <p className='text-gray-600'>
                        <strong className='text-gray-600'>Nombre:</strong>{' '}
                        {adult.fullname}
                      </p>
                      <p className='text-gray-600'>
                        <strong className='text-gray-600'>Edad:</strong>{' '}
                        {adult.age}
                      </p>
                      <p className='text-gray-600'>
                        <strong className='text-gray-600'>Email:</strong>{' '}
                        {adult.email}
                      </p>
                      <p className='text-gray-600'>
                        <strong className='text-gray-600'>Género:</strong>{' '}
                        {adult.gender}
                      </p>
                    </div>
                    <button
                      type='button'
                      onClick={onRemoveAdult}
                      className='mt-4 text-orange-500 hover:underline'
                    >
                      Eliminar Adulto
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </form>
      </div>
      {errorMessage && (
        <div className='sticky bottom-0 left-0 right-0'>
          <MessageBanner
            message={errorMessage}
            onClose={() => setErrorMessage(null)}
          />
        </div>
      )}
    </div>
  );
};

export default MainForm;
