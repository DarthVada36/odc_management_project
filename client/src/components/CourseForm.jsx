import React, { useState, useEffect } from 'react'
import { removeCourseById } from '../services/coursesServices'
import { updateCourseById } from '../services/coursesServices'

const CourseForm = ({
    initialData = null,
    onSubmit,
    onCancel,
    submitText = 'Crear Curso',
    title = 'Crear nuevo Curso',
    isEditing = false,
}) => {
    const initialFormState = {
        title: '',
        description: '',
        date: '',
        schedule: '',
        link: '',
        tickets: '',
    }

    const [formData, setFormData] = useState(initialFormState)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (isEditing && initialData) {
            const formattedDate = initialData.date
                ? new Date(initialData.date).toISOString().split('T')[0]
                : ''

            setFormData({
                title: initialData.title || '',
                description: initialData.description || '',
                date: formattedDate,
                schedule: initialData.schedule || '',
                link: initialData.link || '',
                tickets: initialData.tickets?.toString() || '',
            })
        } else {
            setFormData(initialFormState)
            setErrorMessage('')
        }
    }, [isEditing, initialData])

    const handleChange = (e) => {
        e.stopPropagation()
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        if (
            !formData.title ||
            !formData.description ||
            !formData.date ||
            !formData.schedule ||
            !formData.link ||
            !formData.tickets
        ) {
            setErrorMessage('Por favor, completa todos los campos')
            return
        }

        const submitData = {
            ...formData,
            tickets: parseInt(formData.tickets),
        }

        const success = await onSubmit(submitData)
        if (success) {
            onCancel()
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
            <div
                className="relative w-full max-w-md p-4 bg-white sm:p-8 md:p-12"
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

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    autoComplete="off"
                >
                    <div className="flex flex-col">
                        <label className="block text-sm font-semibold text-gray-600 font-helvetica-w20-bold">
                            Título
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full p-2 mt-2 transition-colors duration-300 border-2 border-black outline-none mobile:p-3 hover:border-primary focus:border-primary placeholder-neutral-500 ring-0"
                            placeholder="Título del curso"
                            minLength={5}
                            maxLength={255}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="block text-sm font-semibold text-gray-600 font-helvetica-w20-bold">
                            Descripción
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full p-2 mt-2 transition-colors duration-300 border-2 border-black outline-none mobile:p-3 hover:border-primary focus:border-primary placeholder-neutral-500 ring-0"
                            placeholder="Descripción del curso"
                            rows={3}
                        />
                    </div>

                    {/* Date and Schedule*/}
                    <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2">
                        <div className="flex flex-col">
                            <label className="block text-sm font-semibold text-gray-600 font-helvetica-w20-bold">
                                Fecha
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                className="w-full p-2 mt-2 transition-colors duration-300 border-2 border-black outline-none mobile:p-3 hover:border-primary focus:border-primary placeholder-neutral-500 ring-0"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="block text-sm font-semibold text-gray-600 font-helvetica-w20-bold">
                                Horario
                            </label>
                            <input
                                type="time"
                                name="schedule"
                                value={formData.schedule}
                                onChange={handleChange}
                                required
                                className="w-full p-2 mt-2 transition-colors duration-300 border-2 border-black outline-none mobile:p-3 hover:border-primary focus:border-primary placeholder-neutral-500 ring-0"
                            />
                        </div>
                    </div>

                    {/* Link and tickets */}
                    <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2">
                        <div className="flex flex-col">
                            <label className="block text-sm font-semibold text-gray-600 font-helvetica-w20-bold">
                                Enlace
                            </label>
                            <input
                                type="url"
                                name="link"
                                value={formData.link}
                                onChange={handleChange}
                                required
                                className="w-full p-2 mt-2 transition-colors duration-300 border-2 border-black outline-none mobile:p-3 hover:border-primary focus:border-primary placeholder-neutral-500 ring-0"
                                placeholder="https://ejemplo.com"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="block text-sm font-semibold text-gray-600 font-helvetica-w20-bold">
                                Tickets
                            </label>
                            <input
                                type="number"
                                name="tickets"
                                value={formData.tickets}
                                onChange={handleChange}
                                required
                                min="0"
                                className="w-full p-2 mt-2 transition-colors duration-300 border-2 border-black outline-none mobile:p-3 hover:border-primary focus:border-primary placeholder-neutral-500 ring-0"
                                placeholder="Número de tickets"
                            />
                        </div>
                    </div>

                    {errorMessage && (
                        <p className="text-sm text-red-500 font-helvetica-w20-bold">
                            {errorMessage}
                        </p>
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

export default CourseForm
