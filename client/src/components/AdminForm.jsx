import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import MessageBanner from './MessageBanner'

const AdminForm = ({
    initialData = null,
    onSubmit,
    onCancel,
    title = 'Crear nuevo Administrador',
    isEditing = false,
}) => {
    const initialFormState = {
        username: '',
        password: '',
        confirmPassword: '',
        roleId: '',
    }

    const [formData, setFormData] = useState(initialFormState)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [errors, setErrors] = useState({})

    const roleOptions = [
        { value: '1', label: 'Superadmin' },
        { value: '2', label: 'Admin' },
        { value: '3', label: 'Facilitator' },
    ]

    useEffect(() => {
        if (isEditing && initialData) {
            setFormData({
                username: initialData.username || '',
                password: initialData.password || '',
                confirmPassword: initialData.password || '',
                roleId: initialData.role_id?.toString() || '',
            })
        } else {
            setFormData(initialFormState)
            setErrors({})
        }
    }, [isEditing, initialData])

    const validateForm = () => {
        const newErrors = {}

        if (!formData.username || formData.username.length < 4) {
            newErrors.username =
                'El nombre de usuario debe tener al menos 4 caracteres'
        }

        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida'
        } else if (
            formData.password.length < 8 ||
            !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)
        ) {
            newErrors.password =
                'La contraseña debe tener al menos 8 caracteres e incluir mayúsculas, minúsculas y números'
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden'
        }

        if (!formData.roleId) {
            newErrors.roleId = 'Debes seleccionar un rol'
        }

        return newErrors
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
        // Al cambiar un campo, eliminamos su error si existe
        setErrors((prev) => {
            const newErrors = { ...prev }
            delete newErrors[name]
            return newErrors
        })
    }

    const handleRoleChange = (selectedOption) => {
        const value = selectedOption ? selectedOption.value : ''
        setFormData((prev) => ({
            ...prev,
            roleId: value,
        }))
        // Eliminamos el error del rol si existe
        setErrors((prev) => {
            const newErrors = { ...prev }
            delete newErrors.roleId
            return newErrors
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formErrors = validateForm()
        setErrors(formErrors)

        if (Object.keys(formErrors).length === 0) {
            const submitData = {
                username: formData.username,
                password: formData.password,
                role_id: parseInt(formData.roleId),
            }

            const success = await onSubmit(submitData)
            if (success) {
                onCancel()
            }
        }
    }

    const getInputClassName = () => {
        return 'w-full p-3 transition-colors duration-300 border-2 focus:outline-none border-black hover:border-primary focus:border-primary'
    }

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
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
            <div
                className="relative w-full max-w-md bg-white"
                onClick={(e) => e.stopPropagation()}
            >
                <MessageBanner
                    message={
                        Object.keys(errors).length > 0
                            ? Object.values(errors)[0]
                            : null
                    }
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
                            <label className="mb-2 font-bold text-dark">
                                Usuario
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                minLength={4}
                                className={getInputClassName()}
                                placeholder="Nombre de usuario"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-2 font-bold text-dark">
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    minLength={8}
                                    className={getInputClassName()}
                                    placeholder="Contraseña"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute transform -translate-y-1/2 right-3 top-1/2"
                                >
                                    <img
                                        src="/src/assets/password-eye.png"
                                        alt={
                                            showPassword ? 'Ocultar' : 'Mostrar'
                                        }
                                        className="w-6 h-6"
                                    />
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-2 font-bold text-dark">
                                Confirmar contraseña
                            </label>
                            <div className="relative">
                                <input
                                    type={
                                        showConfirmPassword
                                            ? 'text'
                                            : 'password'
                                    }
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={getInputClassName()}
                                    placeholder="Confirmar contraseña"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowConfirmPassword(
                                            !showConfirmPassword
                                        )
                                    }
                                    className="absolute transform -translate-y-1/2 right-3 top-1/2"
                                >
                                    <img
                                        src="/src/assets/password-eye.png"
                                        alt={
                                            showConfirmPassword
                                                ? 'Ocultar'
                                                : 'Mostrar'
                                        }
                                        className="w-6 h-6"
                                    />
                                </button>
                            </div>
                        </div>

                        <div className="flex flex-col">
                            <label className="mb-2 font-bold text-dark">
                                Rol
                            </label>
                            <Select
                                value={roleOptions.find(
                                    (option) => option.value === formData.roleId
                                )}
                                onChange={handleRoleChange}
                                options={roleOptions}
                                placeholder="Selecciona un rol"
                                styles={customStyles}
                                theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 0,
                                })}
                            />
                        </div>

                        <div className="flex flex-col gap-4 mt-8">
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
                                {isEditing
                                    ? 'Guardar Cambios'
                                    : 'Crear Administrador'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminForm
