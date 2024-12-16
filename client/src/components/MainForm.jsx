import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { getCourseById } from '../services/coursesServices'

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
}) => {
    const {
        register,
        formState: { errors },
    } = useForm({ defaultValues: formData })

    const [courseData, setCourseData] = useState(null)
    const [courseError, setCourseError] = useState('')
    const [minor, setMinor] = useState({ name: '', age: '' })
    const [minorError, setMinorError] = useState('')
    const [adultData, setAdultData] = useState({
        fullname: '',
        age: '',
        gender: '',
        email: '',
    })
    const [adultError, setAdultError] = useState('')

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const course = await getCourseById(courseId)
                setCourseData(course)
                setFormData((prevData) => ({
                    ...prevData,
                    courseId: course.id,
                    minors: prevData.minors || [],
                }))
                setCourseError('')
            } catch (error) {
                setCourseError(error.message)
            }
        }
        fetchCourse()
    }, [courseId, setFormData])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        })
    }

    const handleMinorChange = (e) => {
        const { name, value } = e.target
        setMinor((prev) => ({ ...prev, [name]: value }))
    }

    const handleAdultChange = (e) => {
        const { name, value } = e.target
        setAdultData((prev) => ({ ...prev, [name]: value }))
    }

    const validateMinor = () => {
        if (!minor.name || !minor.age) {
            setMinorError('Todos los campos de menores son obligatorios.')
            return false
        }
        setMinorError('')
        return true
    }

    const validateAdult = () => {
        if (
            !adultData.fullname ||
            !adultData.age ||
            !adultData.gender ||
            !adultData.email
        ) {
            setAdultError(
                'Todos los campos del adulto acompañante son obligatorios.'
            )
            return false
        }
        setAdultError('')
        return true
    }

    const addMinor = () => {
        if ((formData.minors || []).length >= 3) return
        if (validateMinor()) {
            const updatedMinors = [...(formData.minors || []), minor]
            setFormData({ ...formData, minors: updatedMinors })
            onAddMinor(minor)
            setMinor({ name: '', age: '' })
        }
    }

    const addAdult = () => {
        if (validateAdult()) {
            onAddAdult(adultData)
            setAdultData({ fullname: '', age: '', gender: '', email: '' })
        }
    }

    return (
        <div className="w-full p-6 border shadow-md border-orange bg-light max-w-screen">
            <h2 className="mb-4 text-lg font-semibold text-orange">
                Datos Personales
            </h2>
            {courseError && <p className="text-red-500">{courseError}</p>}
            {courseData && (
                <div className="p-4 mb-4 bg-gray-100 border rounded-md">
                    <h3 className="text-lg font-bold">{courseData.title}</h3>
                    <p>{courseData.description}</p>
                    <p>
                        <strong>Fecha:</strong> {courseData.date}
                    </p>
                    <p>
                        <strong>Horario:</strong> {courseData.schedule}
                    </p>
                </div>
            )}
            <form className="flex flex-col gap-4">
                {/* Nombre Completo */}
                <div>
                    <label className="block mb-1 font-medium">
                        Nombre Completo:
                    </label>
                    <input
                        className="w-full px-3 py-2 border border-dark"
                        {...register('fullname', {
                            required: 'Este campo es obligatorio',
                        })}
                        onChange={handleChange}
                        value={formData.fullname || ''}
                    />
                    {errors.fullname && (
                        <p className="text-red-500">
                            {errors.fullname.message}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label className="block mb-1 font-medium">Email:</label>
                    <input
                        className="w-full px-3 py-2 border border-dark"
                        type="email"
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
                        <p className="text-red-500">{errors.email.message}</p>
                    )}
                </div>

                {/* Género y Edad */}
                <div className="flex items-center justify-between gap-4 mt-4">
                    <label htmlFor="gender">Género:</label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender || ''}
                        onChange={handleChange}
                        className="flex-1 px-3 py-2 border border-dark"
                    >
                        <option value="">Seleccionar</option>
                        <option value="mujer">Mujer</option>
                        <option value="hombre">Hombre</option>
                        <option value="otros generos">Otro</option>
                    </select>
                    <label htmlFor="age">Edad:</label>
                    <input
                        id="age"
                        name="age"
                        type="number"
                        value={formData.age || ''}
                        onChange={handleChange}
                        className="flex-1 px-3 py-2 border border-dark"
                    />
                </div>

                {/* Checkboxes */}
                <div>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={formData.is_first_activity || false}
                            onChange={handleChange}
                            name="is_first_activity"
                        />
                        ¿Es tu primera actividad en el ODC?
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={formData.accepts_newsletter || false}
                            onChange={handleChange}
                            name="accepts_newsletter"
                        />
                        Quiero recibir información sobre nuevos cursos
                        periódicamente
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={includeMinor}
                            onChange={() => setIncludeMinor(!includeMinor)}
                        />
                        Con uno o más menores de 14 años
                    </label>
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={includeAdult}
                            onChange={() => setIncludeAdult(!includeAdult)}
                        />
                        Con un adulto acompañante
                    </label>
                </div>

                {/* Formulario para menores */}
                {includeMinor && (
                    <div className="mt-4">
                        <h3 className="mb-2 text-lg font-bold">Menores</h3>
                        {(formData.minors || []).length < 3 ? (
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nombre del menor"
                                    value={minor.name}
                                    onChange={handleMinorChange}
                                    className="p-2 border rounded-md"
                                />
                                <input
                                    type="number"
                                    name="age"
                                    placeholder="Edad"
                                    value={minor.age}
                                    onChange={handleMinorChange}
                                    className="p-2 border rounded-md"
                                />
                                <button
                                    type="button"
                                    onClick={addMinor}
                                    className="px-4 py-2 text-white rounded-md bg-orange"
                                >
                                    Agregar
                                </button>
                            </div>
                        ) : (
                            <p className="mt-4 text-red-500">
                                Límite máximo de menores inscritos alcanzado.
                            </p>
                        )}
                        {minorError && (
                            <p className="text-red-500">{minorError}</p>
                        )}
                        <ul>
                            {(formData.minors || []).map((minor, index) => (
                                <li
                                    key={index}
                                    className="flex items-center justify-between"
                                >
                                    <span>
                                        {minor.name} - {minor.age} años
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => {
                                            const updatedMinors =
                                                formData.minors.filter(
                                                    (_, i) => i !== index
                                                )
                                            setFormData({
                                                ...formData,
                                                minors: updatedMinors,
                                            })
                                        }}
                                        className="ml-4 text-red-500 hover:underline"
                                    >
                                        Eliminar
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Segunda parte del formulario para el adulto acompañante */}
                {includeAdult && (
                    <div className="mt-4">
                        <h3 className="mb-2 text-lg font-bold">
                            Adulto Acompañante
                        </h3>
                        <div>
                            <label className="block mb-1 font-medium">
                                Nombre Completo:
                            </label>
                            <input
                                className="w-full px-3 py-2 border border-dark"
                                name="fullname"
                                value={adultData.fullname || ''}
                                onChange={(e) =>
                                    setAdultData((prev) => ({
                                        ...prev,
                                        fullname: e.target.value,
                                    }))
                                }
                                placeholder="Nombre Completo"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-1 font-medium">
                                Email:
                            </label>
                            <input
                                className="w-full px-3 py-2 border border-dark"
                                type="email"
                                name="email"
                                value={adultData.email || ''}
                                onChange={(e) =>
                                    setAdultData((prev) => ({
                                        ...prev,
                                        email: e.target.value,
                                    }))
                                }
                                placeholder="Correo Electrónico"
                                required
                            />
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <label htmlFor="gender">Género:</label>
                            <select
                                id="gender"
                                name="gender"
                                value={adultData.gender || ''}
                                onChange={(e) =>
                                    setAdultData((prev) => ({
                                        ...prev,
                                        gender: e.target.value,
                                    }))
                                }
                                className="flex-1 px-3 py-2 border border-dark"
                                required
                            >
                                <option value="">Seleccionar</option>
                                <option value="mujer">Mujer</option>
                                <option value="hombre">Hombre</option>
                                <option value="otros generos">Otro</option>
                            </select>
                            <label htmlFor="age">Edad:</label>
                            <input
                                id="age"
                                name="age"
                                type="number"
                                value={adultData.age || ''}
                                onChange={(e) =>
                                    setAdultData((prev) => ({
                                        ...prev,
                                        age: e.target.value,
                                    }))
                                }
                                className="flex-1 px-3 py-2 border border-dark"
                                placeholder="Edad"
                                required
                            />
                        </div>
                        <button
                            type="button"
                            onClick={addAdult}
                            className="px-4 py-2 mt-2 text-white rounded-md bg-orange"
                        >
                            Agregar Adulto
                        </button>
                        {adultError && (
                            <p className="text-red-500">{adultError}</p>
                        )}
                        {adult && (
                            <div className="p-2 mt-2 border rounded-md">
                                <p>
                                    <strong>Nombre:</strong> {adult.fullname}
                                </p>
                                <p>
                                    <strong>Edad:</strong> {adult.age}
                                </p>
                                <p>
                                    <strong>Email:</strong> {adult.email}
                                </p>
                                <p>
                                    <strong>Género:</strong> {adult.gender}
                                </p>
                                <button
                                    type="button"
                                    onClick={onRemoveAdult}
                                    className="mt-2 text-red-500 hover:underline"
                                >
                                    Eliminar Adulto
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </form>
        </div>
    )
}

export default MainForm
