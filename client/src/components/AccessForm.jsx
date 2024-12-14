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
                navigate('/dashboard')
            } else {
                setErrorMessage(result.error || 'Error al iniciar sesión')
            }
        } catch (error) {
            setErrorMessage('Error de conexión')
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-[98%] w-[98%] border-2 border-orange">
            <div className="w-full max-w-md p-4 bg-white sm:p-8 md:p-12">
                <h2 className="mb-6 text-3xl font-bold text-center text-orange-500 font-helvetica-w20-bold">
                    Accede a tu cuenta
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Username */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="username"
                            className="block text-sm font-semibold text-gray-600 font-helvetica-w20-bold"
                        >
                            Usuario
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full p-3 mt-2 transition-colors duration-300 border-2 border-black outline-none hover:border-primary focus:border-primary placeholder-neutral-500 ring-0"
                            placeholder="Nombre de usuario"
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col">
                        <label
                            htmlFor="password"
                            className="block text-sm font-semibold text-gray-600 font-helvetica-w20-bold"
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
                                className="w-full p-3 mt-2 transition-colors duration-300 border-2 border-black outline-none hover:border-primary focus:border-primary placeholder-neutral-500 ring-0"
                                placeholder="Contraseña"
                            />
                            <button
                                type="button"
                                className="absolute transform -translate-y-1/2 right-3 top-1/2 sm:right-4 sm:top-1/2"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <img
                                    src={
                                        showPassword
                                            ? '/src/assets/password-open-eye.png'
                                            : '/src/assets/password-eye.png'
                                    }
                                    alt={showPassword ? 'Ocultar' : 'Mostrar'}
                                    className="w-6 h-6 sm:w-6 sm:h-6 md:w-7 md:h-7"
                                />
                            </button>
                        </div>
                    </div>

                    {/* Error message */}
                    {errorMessage && (
                        <p className="text-sm text-red-500 font-helvetica-w20-bold">
                            {errorMessage}
                        </p>
                    )}

                    {/* Remember me checkbox */}
                    <div className="flex items-center justify-between">
                        <label className="inline-flex items-center text-sm font-helvetica-w20-bold">
                            <input
                                type="checkbox"
                                className="text-orange-500 form-checkbox"
                            />
                            <span className="ml-2 text-gray-600 font-helvetica-w20-bold">
                                Recordar mi información
                            </span>
                        </label>
                        <Link
                            to="#"
                            className="text-sm text-orange-500 font-helvetica-w20-bold hover:underline"
                        >
                            ¿Olvidaste tu contraseña?
                        </Link>
                    </div>

                    {/* Access button */}
                    <SubmitButton text="Acceder" />
                </form>
            </div>
        </div>
    )
}

export default AccessForm
