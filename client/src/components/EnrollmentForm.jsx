import React, { useState, useEffect } from 'react'

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
    })

    const [newMinor, setNewMinor] = useState({ name: '', age: '' })
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (isEditing && initialData) {
            setFormData({
                fullname: initialData.fullname || '',
                email: initialData.email || '',
                gender: initialData.gender || 'NS/NC',
                age: initialData.age || '',
                is_first_activity: initialData.is_first_activity || false,
                minors: initialData.minors || [],
            })
        }
    }, [isEditing, initialData])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }))
    }

    const handleMinorChange = (e) => {
        const { name, value } = e.target
        setNewMinor((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

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

        if (!formData.fullname || !formData.email || !formData.age) {
            setErrorMessage('Por favor, completa los campos obligatorios')
            return
        }

        const success = await onSubmit(formData)
        if (success) {
            onCancel()
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
            <div
                className="relative w-[600px] bg-white p-4 sm:p-8 md:p-12"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onCancel}
                    className="absolute p-2 text-gray-500 transition-colors duration-300 hover:text-orange-500 top-4 right-4"
                >
                    <svg
                        className="w-6 h-6"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path
                            d="M6 18L18 6M6 6l12 12"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </button>

                <h2 className="mb-6 text-3xl font-bold text-orange-500 font-helvetica-w20-bold">
                    {title}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col">
                        <label className="mb-2 font-bold text-dark">
                            Nombre Completo
                        </label>
                        <input
                            type="text"
                            name="fullname"
                            value={formData.fullname}
                            onChange={handleChange}
                            required
                            className="w-full p-3 transition-colors duration-300 border-2 border-black focus:outline-none hover:border-primary focus:border-primary"
                            placeholder="Nombre Completo"
                        />
                    </div>

                    <div className="grid items-center grid-cols-2 gap-4">
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
                                className="w-full p-3 transition-colors duration-300 border-2 border-black focus:outline-none hover:border-primary focus:border-primary"
                                placeholder="Correo Electrónico"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="is_first_activity"
                                checked={formData.is_first_activity}
                                onChange={handleChange}
                                className="w-5 h-5 border-2 border-black rounded"
                            />
                            <label className="font-bold text-dark">
                                Primera Actividad en Orange
                            </label>
                        </div>
                    </div>

                    <div className="grid items-center grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="mb-2 font-bold text-dark">
                                Género
                            </label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                className="w-full p-3 transition-colors duration-300 border-2 border-black focus:outline-none hover:border-primary focus:border-primary"
                            >
                                <option value="NS/NC">NS/NC</option>
                                <option value="mujer">Mujer</option>
                                <option value="hombre">Hombre</option>
                                <option value="otros generos">
                                    Otros Géneros
                                </option>
                            </select>
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-2 font-bold text-dark">
                                Edad
                            </label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                className="w-full p-3 transition-colors duration-300 border-2 border-black focus:outline-none hover:border-primary focus:border-primary"
                                placeholder="Edad"
                            />
                        </div>
                    </div>

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
                                    className="w-1/2 p-3 transition-colors duration-300 border-2 border-black focus:outline-none hover:border-primary focus:border-primary"
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
                                        className="w-20 p-3 transition-colors duration-300 border-2 border-black focus:outline-none hover:border-primary focus:border-primary"
                                    />
                                    <span className="text-gray-500">años</span>
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
                                    className="w-1/2 p-3 transition-colors duration-300 border-2 border-black focus:outline-none hover:border-primary focus:border-primary"
                                />
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        name="age"
                                        value={newMinor.age}
                                        onChange={handleMinorChange}
                                        placeholder="Edad"
                                        className="w-20 p-3 transition-colors duration-300 border-2 border-black focus:outline-none hover:border-primary focus:border-primary"
                                    />
                                    <span className="text-gray-500">años</span>
                                </div>
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

                    {errorMessage && (
                        <p className="text-sm text-red-500">{errorMessage}</p>
                    )}

                    <div className="flex flex-col items-center justify-end gap-4 pt-4 tablet:flex-row">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 font-bold text-black transition-all duration-300 bg-white border-2 border-black font-helvetica-w20-bold hover:bg-black hover:text-white"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 font-bold text-black transition-all duration-300 bg-primary font-helvetica-w20-bold hover:bg-black hover:text-white"
                        >
                            {submitText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EnrollmentForm
