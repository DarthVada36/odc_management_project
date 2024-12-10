import React, { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

const AdminForm = ({
    initialData = {},
    onSubmit,
    onCancel,
    submitText = 'Crear Administrador',
    title = 'Crear nuevo Administrador',
}) => {
    const [username, setUsername] = useState(initialData.username || '')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [passwordError, setPasswordError] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [roleId, setRoleId] = useState(initialData.role_id || '')

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setPasswordError('Las contraseñas no coinciden')
            return
        }

        if (!roleId) {
            setErrorMessage('Por favor, selecciona un rol')
            return
        }

        setPasswordError('')
        setErrorMessage('')
        setSuccessMessage('')

        const formData = {
            username,
            password,
            role_id: parseInt(roleId),
        }

        const success = await onSubmit(formData)
        if (success) {
            onCancel()
        }
    }

    useEffect(() => {
        setUsername(initialData.username || '')
        setPassword('')
        setConfirmPassword('')
        setRoleId(initialData.role_id || '')
        setPasswordError('')
        setErrorMessage('')
        setSuccessMessage('')
    }, [initialData])

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-black/50"
                onClick={onCancel}
            ></div>
            <div className="relative w-[500px] bg-white p-8">
                <button
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

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col">
                        <label className="mb-2 font-bold text-dark">
                            Usuario
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 focus:border-dark focus:outline-none"
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-3 border border-gray-300 focus:border-dark focus:outline-none"
                                placeholder="Contraseña"
                            />
                            <button
                                type="button"
                                className="absolute transform -translate-y-1/2 right-3 top-1/2"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <img
                                    src={
                                        showPassword
                                            ? '/src/assets/password-open-eye.png'
                                            : '/src/assets/password-eye.png'
                                    }
                                    alt={showPassword ? 'Ocultar' : 'Mostrar'}
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
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                                className="w-full p-3 border border-gray-300 focus:border-dark focus:outline-none"
                                placeholder="Confirmar contraseña"
                            />
                            <button
                                type="button"
                                className="absolute transform -translate-y-1/2 right-3 top-1/2"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                            >
                                <img
                                    src={
                                        showConfirmPassword
                                            ? '/src/assets/password-open-eye.png'
                                            : '/src/assets/password-eye.png'
                                    }
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
                        <label className="mb-2 font-bold text-dark">Rol</label>
                        <select
                            value={roleId}
                            onChange={(e) => setRoleId(e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 focus:border-dark focus:outline-none"
                        >
                            <option value="">Selecciona un rol</option>
                            <option value="1">Superadmin</option>
                            <option value="2">Admin</option>
                            <option value="3">Facilitator</option>
                        </select>
                    </div>

                    {/* Error messages */}
                    {passwordError && (
                        <p className="text-sm text-red-500">{passwordError}</p>
                    )}
                    {errorMessage && (
                        <p className="text-sm text-red-500">{errorMessage}</p>
                    )}
                    {successMessage && (
                        <p className="text-sm text-green-500">
                            {successMessage}
                        </p>
                    )}

                    <div className="flex justify-end gap-4 mt-8">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-4 py-2 transition-all duration-300 bg-white border text-dark border-dark font-helvetica-w20-bold hover:bg-dark hover:text-white"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 transition-all duration-300 bg-white border text-dark border-dark font-helvetica-w20-bold hover:bg-dark hover:text-white"
                        >
                            {submitText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AdminForm
