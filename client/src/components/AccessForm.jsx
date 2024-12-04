import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import SubmitButton from './SubmitButton'

const AccessForm = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()
    const { login } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMessage('')

        try {
            const result = await login(username, password)

            if (result.success) {
                navigate('/')
            } else {
                setErrorMessage(result.error || 'Error al iniciar sesión')
            }
        } catch (error) {
            setErrorMessage('Error de conexión')
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen border-2 border-orange">
            <div className="w-full max-w-md p-8 bg-white">
                <h2 className="mb-6 text-3xl font-bold text-center text-orange-500">
                    Accede a tu cuenta
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

                    {/* Contraseña */}
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

                    {/* Error message */}
                    {errorMessage && (
                        <p className="text-sm text-red-500">{errorMessage}</p>
                    )}

                    {/* Recordar info */}
                    <div className="flex items-center justify-between">
                        <label className="inline-flex items-center text-sm">
                            <input
                                type="checkbox"
                                className="text-orange-500 form-checkbox"
                            />
                            <span className="ml-2 text-gray-600">
                                Recordar mi información
                            </span>
                        </label>
                        <Link
                            to="#"
                            className="text-sm text-orange-500 hover:underline"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>

                    {/* Botón de acceso */}
                    <SubmitButton text="Acceder" />
                </form>
            </div>
        </div>
    )
}

export default AccessForm
