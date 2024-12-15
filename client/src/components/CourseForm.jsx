import React, { useState, useEffect } from 'react'
import { removeCourseById } from '../services/coursesServices'
import { updateCourseById } from '../services/coursesServices'
import MessageBanner from './MessageBanner'

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
    const [bannerMessage, setBannerMessage] = useState('')

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
            setBannerMessage('')
        }
    }, [isEditing, initialData])

    const validateForm = () => {
        if (!formData.title) {
            setBannerMessage('Por favor, introduce un título')
            return false
        }
        if (formData.title.length < 5) {
            setBannerMessage('El título debe tener al menos 5 caracteres')
            return false
        }
        if (formData.title.length > 25) {
            setBannerMessage('El título debe tener máximo 25 caracteres')
            return false
        }

        if (!formData.description) {
            setBannerMessage('Por favor, introduce una descripción')
            return false
        }
        if (formData.description.length < 100) {
            setBannerMessage(
                'La descripción debe tener al menos 100 caracteres'
            )
            return false
        }
        if (formData.description.length > 200) {
            setBannerMessage('La descripción debe tener máximo 200 caracteres')
            return false
        }

        if (!formData.date) {
            setBannerMessage('Por favor, selecciona una fecha')
            return false
        }
        if (!formData.schedule) {
            setBannerMessage('Por favor, selecciona un horario')
            return false
        }
        if (!formData.link) {
            setBannerMessage('Por favor, introduce un enlace')
            return false
        }
        if (!formData.tickets) {
            setBannerMessage('Por favor, introduce el número de tickets')
            return false
        }

        return true
    }

    const handleChange = (e) => {
        e.preventDefault()
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
        setBannerMessage('')
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        const submitData = {
            ...formData,
            tickets: parseInt(formData.tickets),
        }

        try {
            const success = await onSubmit(submitData)
            if (success) {
                onCancel()
            } else {
                setBannerMessage('Error al guardar el curso')
            }
        } catch (error) {
            setBannerMessage('Error al guardar el curso')
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto">
            <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
            <div
                className={`relative w-full max-w-md bg-white ${
                    bannerMessage ? 'mt-16' : 'mt-4'
                } mx-4 transition-all duration-300`}
            >
                {bannerMessage && (
                    <div className="absolute top-0 left-0 right-0 -translate-y-full">
                        <MessageBanner
                            message={bannerMessage}
                            onClose={() => setBannerMessage('')}
                        />
                    </div>
                )}

                <div className="p-8">
                    <h2 className="mb-6 text-2xl font-bold text-orange-500 font-helvetica-w20-bold">
                        {title}
                    </h2>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                        noValidate
                    >
                        <div className="flex flex-col">
                            <label className="block mb-1 text-xs font-semibold text-neutral-600 font-helvetica-w20-bold">
                                Título
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                className="w-full p-2 text-sm transition-colors duration-300 border-2 border-black outline-none mobile:p-3 hover:border-primary focus:border-primary placeholder-neutral-500 ring-0"
                                placeholder="Título del curso"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="block mb-1 text-xs font-semibold text-neutral-600 font-helvetica-w20-bold">
                                Descripción
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full p-2 text-sm transition-colors duration-300 border-2 border-black outline-none mobile:p-3 hover:border-primary focus:border-primary placeholder-neutral-500 ring-0"
                                placeholder="Descripción del curso"
                                rows={3}
                            />
                            <span className="mt-1 text-xs text-neutral-500">
                                {formData.description.length}/200 caracteres
                            </span>
                        </div>

                        <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2">
                            <div className="flex flex-col">
                                <label className="block mb-1 text-xs font-semibold text-neutral-600 font-helvetica-w20-bold">
                                    Fecha
                                </label>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full p-2 text-sm transition-colors duration-300 border-2 border-black outline-none mobile:p-3 hover:border-primary focus:border-primary placeholder-neutral-500 ring-0"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="block mb-1 text-xs font-semibold text-neutral-600 font-helvetica-w20-bold">
                                    Horario
                                </label>
                                <input
                                    type="time"
                                    name="schedule"
                                    value={formData.schedule}
                                    onChange={handleChange}
                                    className="w-full p-2 text-sm transition-colors duration-300 border-2 border-black outline-none mobile:p-3 hover:border-primary focus:border-primary placeholder-neutral-500 ring-0"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 tablet:grid-cols-2">
                            <div className="flex flex-col">
                                <label className="block mb-1 text-xs font-semibold text-neutral-600 font-helvetica-w20-bold">
                                    Enlace
                                </label>
                                <input
                                    type="url"
                                    name="link"
                                    value={formData.link}
                                    onChange={handleChange}
                                    className="w-full p-2 text-sm transition-colors duration-300 border-2 border-black outline-none mobile:p-3 hover:border-primary focus:border-primary placeholder-neutral-500 ring-0"
                                    placeholder="https://ejemplo.com"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label className="block mb-1 text-xs font-semibold text-neutral-600 font-helvetica-w20-bold">
                                    Tickets
                                </label>
                                <input
                                    type="number"
                                    name="tickets"
                                    value={formData.tickets}
                                    onChange={handleChange}
                                    min="0"
                                    className="w-full p-2 text-sm transition-colors duration-300 border-2 border-black outline-none mobile:p-3 hover:border-primary focus:border-primary placeholder-neutral-500 ring-0"
                                    placeholder="Número de tickets"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col items-center justify-end gap-4 pt-4 tablet:flex-row">
                            <button
                                type="button"
                                onClick={onCancel}
                                className="px-4 py-2 text-sm font-bold text-black transition-all duration-300 bg-white border-2 border-black font-helvetica-w20-bold hover:bg-black hover:text-white"
                            >
                                Cancelar
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-sm font-bold text-black transition-all duration-300 bg-primary font-helvetica-w20-bold hover:bg-black hover:text-white"
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

export default CourseForm
