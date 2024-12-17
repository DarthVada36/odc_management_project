import React, { useState, useEffect } from 'react'
import MessageBanner from './MessageBanner'

const EnrollmentForm = ({
    initialData = null,
    onSubmit,
    onCancel,
    submitText = 'Crear Inscripción',
    title = 'Crear nueva Inscripción',
    isEditing = false,
}) => {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        gender: 'NS/NC',
        age: '',
        is_first_activity: false,
        minors: [],
        adults: [],
    })

    const [newMinor, setNewMinor] = useState({ name: '', age: '' })
    const [errorMessage, setErrorMessage] = useState('')
    const [errors, setErrors] = useState({})

    const [newAdult, setNewAdult] = useState({
        fullname: '',
        age: '',
        email: '',
        gender: 'NS/NC',
    });

    useEffect(() => {
        console.log('initialData:', initialData); // Verifica los datos aquí
        if (isEditing && initialData) {
            setFormData({
                fullname: initialData.fullname || '',
                email: initialData.email || '',
                gender: initialData.gender || 'NS/NC',
                age: initialData.age || '',
                is_first_activity: initialData.is_first_activity || false,
                minors: initialData.minors || [],
                adults: initialData.adults || [], // Asegúrate de que `adults` también sea un array vacío
                adultFullname: initialData.adults?.[0]?.fullname || '', // Asegúrate de asignar valores por defecto
                adultEmail: initialData.adults?.[0]?.email || '',
                adultAge: initialData.adults?.[0]?.age || '',
                adultGender: initialData.adults?.[0]?.gender || 'NS/NC',
            });
        }
    }, [isEditing, initialData])

    const validateForm = () => {
        const newErrors = {}


        // // Validación para el acompañante
        // if (formData.adultAge && formData.adultAge < 15) {
        //     newErrors.adultAge = 'El acompañante debe ser mayor de 15 años.';
        // }
        // if (formData.adultEmail && !/\S+@\S+\.\S+/.test(formData.adultEmail)) {
        //     newErrors.adultEmail = 'Por favor, ingresa un correo electrónico válido para el acompañante';
        // }
        // Validation for fullname length
        if (!formData.fullname) {
            newErrors.fullname = 'El nombre completo es obligatorio'
        } else if (formData.fullname.length < 4) {
            newErrors.fullname = 'El nombre debe tener al menos 4 caracteres'
        } else if (formData.fullname.length > 40) {
            newErrors.fullname = 'El nombre no puede exceder los 40 caracteres'
        }

        // Validation for adult
        if (formData.age < 15) {
            newErrors.age = 'La edad debe ser 15 años o más para un adulto.'
        }

        // Validation for minors
        if (formData.minors.length > 0) {
            formData.minors.forEach((minor, index) => {
                if (minor.age > 14) {
                    newErrors.minors =
                        'La edad de los menores debe ser 14 años o menos.'
                }
            })
        }

        // Validación para email
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Por favor, ingresa un correo electrónico válido'
        }

        // Validación de la edad
        if (!formData.age || formData.age <= 0) {
            newErrors.age = 'La edad debe ser un número positivo'
        }

        return newErrors
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))
        setErrors((prev) => {
            const newErrors = { ...prev }
            delete newErrors[name]
            return newErrors
        })
    }

    const handleMinorChange = (e) => {
        const { name, value } = e.target
        setNewMinor((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleAdultChange = (e) => {
        const { name, value } = e.target;
        setNewAdult((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAdultEdit = (index, field, value) => {
        console.log("Antes de actualizar: ", formData.adults); 
        setFormData((prev) => {
            const updatedAdults = [...prev.adults];
            updatedAdults[index][field] = value;
            return { ...prev, adults: updatedAdults };
        });
        console.log("Después de actualizar: ", formData.adults);
    };

    const handleMinorEdit = (index, field, value) => {
        setFormData((prev) => {
            const updatedMinors = [...prev.minors]
            updatedMinors[index][field] = value
            return { ...prev, minors: updatedMinors }
        })
    }

    const addMinor = () => {
        if (formData.minors.length >= 3) {
            setErrorMessage('Solo puedes añadir un máximo de 3 menores')
            return
        }

        if (!newMinor.name || !newMinor.age) {
            setErrorMessage('El nombre y la edad del menor son obligatorios')
            return
        }

        setFormData((prev) => ({
            ...prev,
            minors: [...prev.minors, { ...newMinor }],
        }))

        setNewMinor({ name: '', age: '' })
        setErrorMessage('')
    }

    const removeMinor = (index) => {
        setFormData((prev) => ({
            ...prev,
            minors: prev.minors.filter((_, i) => i !== index),
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formErrors = validateForm()
        setErrors(formErrors)

        if (Object.keys(formErrors).length === 0) {
            const success = await onSubmit(formData)
            if (success) {
                onCancel()
            }
        } else {
            setErrorMessage(Object.values(formErrors)[0])
        }
    }

    const addAdult = () => {
        if (!newAdult.fullname || !newAdult.age || !newAdult.email) {
            setErrorMessage('Todos los campos del acompañante son obligatorios.');
            return;
        }
        if (formData.adults.length >= 1) {
            setErrorMessage('Solo puedes añadir un acompañante adulto.');
            return;
        }

        setFormData((prev) => ({
            ...prev,
            adults: [...prev.adults, { ...newAdult }],
        }));

        setNewAdult({ fullname: '', age: '', email: '', gender: 'NS/NC' });
        setErrorMessage('');
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
            <div
                className={`relative w-full max-w-md bg-white ${errorMessage ? 'mt-16' : 'mt-4'
                    } mx-4 transition-all duration-300`}
                onClick={(e) => e.stopPropagation()}
            >
                <MessageBanner
                    message={errorMessage}
                    onClose={() => setErrorMessage(null)}
                />

                <div className="p-6">
                    <h2 className="mb-6 text-2xl font-bold text-orange-500 font-helvetica-w20-bold">
                        {title}
                    </h2>
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                        autoComplete="off"
                        noValidate
                    >
                        <div className="flex flex-col">
                            <label className="mb-1 font-bold text-dark">
                                Nombre Completo
                            </label>
                            <input
                                type="text"
                                name="fullname"
                                value={formData.fullname}
                                onChange={handleChange}
                                required
                                className="w-full p-2 border-2 border-black focus:outline-none hover:border-primary"
                                placeholder="Nombre Completo"
                                minLength={4}
                                maxLength={40}
                            />
                            {errors.fullname && (
                                <span className="text-red-500">
                                    {errors.fullname}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-2 font-bold text-dark">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full p-3 border-2 border-black focus:outline-none hover:border-primary"
                                placeholder="Correo Electrónico"
                            />
                            {errors.email && (
                                <span className="text-red-500">
                                    {errors.email}
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-1 font-bold text-dark">
                                Edad
                            </label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full p-3 border-2 border-black focus:outline-none hover:border-primary"
                                placeholder="Edad"
                            />
                            {errors.age && (
                                <span className="text-red-500">
                                    {errors.age}
                                </span>
                            )}
                        </div>

                        {/* Minors */}
                        <div>
                            <h3 className="mb-4 font-bold text-dark">
                                Menores Inscritos
                            </h3>
                            {formData.minors.map((minor, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-3 mb-3 border-2 border-black"
                                >
                                    <input
                                        type="text"
                                        value={minor.name}
                                        onChange={(e) =>
                                            handleMinorEdit(
                                                index,
                                                'name',
                                                e.target.value
                                            )
                                        }
                                        className="w-1/2 p-3 transition-colors duration-300 border-2 border-black focus:outline-none hover:border-primary"
                                    />
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            value={minor.age}
                                            onChange={(e) =>
                                                handleMinorEdit(
                                                    index,
                                                    'age',
                                                    e.target.value
                                                )
                                            }
                                            className="w-20 p-3 transition-colors duration-300 border-2 border-black focus:outline-none hover:border-primary"
                                        />
                                        <span className="text-gray-500">
                                            años
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removeMinor(index)}
                                        className="px-4 py-2 text-black transition-all duration-300 bg-white border-2 border-black font-helvetica-w20-bold hover:bg-black hover:text-white"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            ))}

                            {formData.minors.length < 3 && (
                                <div className="flex items-center justify-between p-3 border-2 border-black">
                                    <input
                                        type="text"
                                        name="name"
                                        value={newMinor.name}
                                        onChange={handleMinorChange}
                                        placeholder="Nombre del Menor"
                                        className="w-1/2 p-3 border-2 border-black focus:outline-none hover:border-primary"
                                    />
                                    <input
                                        type="number"
                                        name="age"
                                        value={newMinor.age}
                                        onChange={handleMinorChange}
                                        placeholder="Edad"
                                        className="w-20 p-3 border-2 border-black focus:outline-none hover:border-primary"
                                    />
                                    <button
                                        type="button"
                                        onClick={addMinor}
                                        disabled={formData.minors.length >= 3}
                                        className="px-4 py-2 text-black transition-all duration-300 bg-white border-2 border-black font-helvetica-w20-bold hover:bg-black hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Añadir
                                    </button>
                                </div>
                            )}
                        </div>


                        <div>
                            <h3 className="mb-4 font-bold text-dark">Añadir Acompañante Adulto</h3>
                            {formData.adults.map((adult, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-2 p-3 border-2 border-black"
                                >
                                    <input
                                        type="text"
                                        value={adult.fullname}
                                        onChange={(e) =>
                                            handleAdultEdit(
                                                index,
                                                'fullname',
                                                e.target.value
                                            )
                                        }
                                        className="w-full p-2 border-2 border-black"
                                    />
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            value={adult.age}
                                            onChange={(e) =>
                                                handleAdultEdit(
                                                    index,
                                                    'age',
                                                    e.target.value
                                                )
                                            }
                                            className="w-full p-2 border-2 border-black"
                                        />
                                        <span className="text-gray-500">
                                            años
                                        </span>
                                    </div>

                                    <input
                                        type="text"
                                        value={adult.email}
                                        onChange={(e) =>
                                            handleAdultEdit(
                                                index,
                                                'email',
                                                e.target.value
                                            )
                                        }
                                        className="w-full p-2 border-2 border-black"
                                    />

                                    <input
                                        type="text"
                                        value={adult.gender}
                                        onChange={(e) =>
                                            handleAdultEdit(
                                                index,
                                                'gender',
                                                e.target.value
                                            )
                                        }
                                        className="w-full p-2 border-2 border-black"
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setFormData((prev) => ({
                                                ...prev,
                                                adults: prev.adults.filter((_, i) => i !== index),
                                            }))
                                        }
                                        className="px-4 py-2 text-black transition-all duration-300 bg-white border-2 border-black hover:bg-black hover:text-white"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            ))}

                            {formData.adults.length < 1 && (
                                <div className="flex flex-col gap-2 p-3 border-2 border-black">
                                    <input
                                        type="text"
                                        name="fullname"
                                        value={newAdult.fullname}
                                        onChange={handleAdultChange}
                                        placeholder="Nombre Completo"
                                        className="w-full p-2 border-2 border-black"
                                    />
                                    <input
                                        type="number"
                                        name="age"
                                        value={newAdult.age}
                                        onChange={handleAdultChange}
                                        placeholder="Edad"
                                        className="w-full p-2 border-2 border-black"
                                    />
                                    <input
                                        type="email"
                                        name="email"
                                        value={newAdult.email}
                                        onChange={handleAdultChange}
                                        placeholder="Correo Electrónico"
                                        className="w-full p-2 border-2 border-black"
                                    />
                                    <select
                                        name="gender"
                                        value={newAdult.gender}
                                        onChange={handleAdultChange}
                                        className="w-full p-2 border-2 border-black"
                                    >
                                        <option value="Mujer">Mujer</option>
                                        <option value="Hombre">Hombre</option>
                                        <option value="Otro">Otro</option>
                                    </select>
                                    <button
                                        type="button"
                                        onClick={addAdult}
                                        className="px-4 py-2 text-black transition-all duration-300 bg-white border-2 border-black hover:bg-black hover:text-white"
                                    >
                                        Añadir Acompañante
                                    </button>
                                </div>
                            )}
                        </div>


                        <div className="flex flex-col items-center justify-end gap-4 pt-4 tablet:flex-row">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-4 py-1 font-bold text-black transition-all duration-300 bg-white border-2 border-black font-helvetica-w20-bold hover:bg-black hover:text-white"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-1 font-bold text-black transition-all duration-300 bg-primary font-helvetica-w20-bold hover:bg-black hover:text-white"
                            >
                                {submitText}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EnrollmentForm;