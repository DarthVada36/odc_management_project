import { createContext, useState, useContext, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider')
    return context
}

export const AuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [loading, setLoading] = useState(true)

    // Verify if the user is authenticated
    useEffect(() => {
        const token = localStorage.getItem('authToken')
        const adminData = localStorage.getItem('adminData')

        if (token && adminData) {
            setAdmin(JSON.parse(adminData))
            setIsAuthenticated(true)
        }

        setLoading(false)
    }, [])

    // Function to login the user
    const login = async (username, password) => {
        try {
            const response = await fetch(
                'http://localhost:3000/api/auth/login',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, password }),
                }
            )

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Error al iniciar sesión')
            }

            localStorage.setItem('authToken', data.token)
            localStorage.setItem(
                'adminData',
                JSON.stringify({
                    id: data.adminId,
                    username: data.username,
                    role_id: data.role_id,
                })
            )

            setAdmin({
                id: data.adminId,
                username: data.username,
                role_id: data.role_id,
            })
            setIsAuthenticated(true)

            return { success: true }
        } catch (error) {
            return {
                success: false,
                error: error.message,
            }
        }
    }

    const logout = () => {
        localStorage.removeItem('authToken')
        localStorage.removeItem('adminData')
        setAdmin(null)
        setIsAuthenticated(false)
    }

    // Function to make authenticated requests
    const authRequest = async (url, options = {}) => {
        const token = localStorage.getItem('authToken')
        const defaultHeaders = {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        }

        const response = await fetch(url, {
            ...options,
            headers: {
                ...defaultHeaders,
                ...options.headers,
            },
        })

        if (response.status === 401) {
            logout()
            throw new Error('Sesión expirada')
        }

        return response
    }

    const value = {
        admin,
        isAuthenticated,
        loading,
        login,
        logout,
        authRequest,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
