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
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        schedule: '',
        link: '',
        tickets: '',
    })

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

    const handleDeleteCourse = async (courseId) => {
        try {
            const response = await removeCourseById(courseId)
            if (response) {
                alert('Curso eliminado correctamente')
                // Puedes actualizar el estado local o hacer una llamada para refrescar la lista de cursos
            }
        } catch (error) {
            console.error('Error al eliminar el curso:', error.message)
            alert('Error al eliminar el curso')
        }
    }

    const handleUpdateCourse = async (courseId, updatedCourseData) => {
        try {
            const response = await updateCourseById(courseId, updatedCourseData)
            if (response) {
                alert('Curso actualizado correctamente')
                // Puedes redirigir o refrescar la lista de cursos
            }
        } catch (error) {
            console.error('Error al actualizar el curso:', error.message)
            alert('Error al actualizar el curso')
        }
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
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
            <div
                className="relative w-[500px] bg-white p-8"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={onCancel}
                    className="absolute p-2 text-gray-500 hover:text-dark top-4 right-4"
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

                <h2 className="mb-8 text-2xl font-bold text-dark">{title}</h2>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    autoComplete="off"
                >
                    <div className="flex flex-col">
                        <label className="mb-2 font-bold text-dark">
                            Título
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 focus:border-dark focus:outline-none"
                            placeholder="Título del curso"
                            minLength={5}
                            maxLength={255}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-bold text-dark">
                            Descripción
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 focus:border-dark focus:outline-none"
                            placeholder="Descripción del curso"
                            rows={4}
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-bold text-dark">
                            Fecha
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 focus:border-dark focus:outline-none"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-bold text-dark">
                            Horario
                        </label>
                        <input
                            type="time"
                            name="schedule"
                            value={formData.schedule}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 focus:border-dark focus:outline-none"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-bold text-dark">
                            Enlace
                        </label>
                        <input
                            type="url"
                            name="link"
                            value={formData.link}
                            onChange={handleChange}
                            required
                            className="w-full p-3 border border-gray-300 focus:border-dark focus:outline-none"
                            placeholder="https://ejemplo.com"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-2 font-bold text-dark">
                            Tickets
                        </label>
                        <input
                            type="number"
                            name="tickets"
                            value={formData.tickets}
                            onChange={handleChange}
                            required
                            min="0"
                            className="w-full p-3 border border-gray-300 focus:border-dark focus:outline-none"
                            placeholder="Número de tickets disponibles"
                        />
                    </div>

                    {errorMessage && (
                        <p className="text-sm text-red-500">{errorMessage}</p>
                    )}

                    <div className="flex justify-end gap-4 mt-8">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 transition-all duration-300 bg-white border text-dark border-dark hover:bg-dark hover:text-white"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 transition-all duration-300 bg-white border text-dark border-dark hover:bg-dark hover:text-white"
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
