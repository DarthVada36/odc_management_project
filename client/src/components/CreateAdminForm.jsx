import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import SubmitButton from './SubmitButton'

const CreateAdminForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [passwordError, setPasswordError] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [successMessage, setSuccessMessage] = useState('')
    const [roleId, setRoleId] = useState('')

    const { authRequest } = useAuth()
    const navigate = useNavigate()

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

        try {
            const response = await authRequest(
                'http://localhost:3000/api/auth/register',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        username,
                        password,
                        role_id: parseInt(roleId),
                    }),
                }
            )

            const data = await response.json()

            if (response.ok) {
                setSuccessMessage('Administrador creado con éxito')
                // Clean the form
                setUsername('')
                setPassword('')
                setConfirmPassword('')
                setRoleId('')
                // Redirect to dashboard after 2 seconds
                setTimeout(() => navigate('/dashboard'), 2000)
            } else {
                setErrorMessage(
                    data.message || 'Error al crear el administrador'
                )
            }
        } catch (error) {
            setErrorMessage('Error de conexión')
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen border-2 border-orange">
            <div className="w-full max-w-md p-8 bg-white">
                <h2 className="mb-6 text-2xl font-bold text-center text-orange-500">
                    Crear nuevo Administrador
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="username"
                            className="block text-sm font-semibold text-gray-600"
                        >
                            Usuario
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                            placeholder="Nombre de usuario"
                        />
                    </div>

                    {/* Passsword */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-600"
                        >
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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

                    {/* Confirm password */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="confirmPassword"
                            className="block text-sm font-semibold text-gray-600"
                        >
                            Confirmar contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                required
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
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

                    {/* Rol selector */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="role"
                            className="block text-sm font-semibold text-gray-600"
                        >
                            Rol
                        </label>
                        <select
                            id="role"
                            value={roleId}
                            onChange={(e) => setRoleId(e.target.value)}
                            required
                            className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            <option value="">Selecciona un rol</option>
                            <option value="1">Superadmin</option>
                            <option value="2">Admin</option>
                            <option value="3">Facilitator</option>
                        </select>
                    </div>

                    {/* Mensajes de error y éxito */}
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

                    <SubmitButton text="Crear nuevo Administrador" />
                </form>
            </div>
        </div>
    )
}

export default CreateAdminForm