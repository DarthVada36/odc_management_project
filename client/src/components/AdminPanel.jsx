import React, { useState, useEffect } from 'react'
import {
    getAllEnrollments,
    deleteEnrollmentById,
} from '../services/enrollmentServices.js'
import UserTable from './UserTable'
import SearchBar from './SearchBar'

const AdminPanel = () => {
    const [enrollments, setEnrollments] = useState([])
    const [filteredEnrollments, setFilteredEnrollments] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const fetchEnrollments = async () => {
        try {
            setLoading(true)
            const data = await getAllEnrollments()
            setEnrollments(data)
            setFilteredEnrollments(data)
            setLoading(false)
        } catch (error) {
            console.error('Error al obtener los usuarios:', error)
            setError(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchEnrollments()
    }, [])

    // Función para manejar la búsqueda
    const handleSearch = (searchTerm) => {
        const lowerCaseSearch = searchTerm.toLowerCase() // Convierte el texto a minúsculas
        const filtered = enrollments.filter(
            (enrollment) =>
                enrollment.fullname.toLowerCase().includes(lowerCaseSearch) ||
                enrollment.email.toLowerCase().includes(lowerCaseSearch)
        )
        setFilteredEnrollments(filtered) // Actualiza el estado con los usuarios filtrados
    }

    if (loading) {
        return <div>Cargando...</div>
    }
    if (error) {
        return <div>Error al cargar los usuarios</div>
    }

    return (
        <div className="flex flex-col min-h-screen p-4 bg-white">
            {/* Encabezado */}
            <div className="flex flex-col mb-2 md:flex-row md:justify-between md:items-center">
                <h1 className="p-1 text-2xl font-bold text-orange">
                    Gestión de Inscripciones
                </h1>
            </div>
            {/* Línea naranja   */}
            <div className="mb-4 border-t-2 border-orange"></div>
            {/* Total Inscriptions and Search Bar */}
            <div className="flex flex-col mb-4 md:flex-row md:justify-between md:items-center ">
                <p className="p-8 mb-0 text-center text-black md:mb-0">
                    Total de inscripciones: {filteredEnrollments.length}
                </p>
                {/* Añadir barra de búsqueda */}
                <div className="flex items-right md:1/3">
                    <SearchBar onSearch={handleSearch} />
                </div>
            </div>
            {/* Tabla */}
            <div className="max-w-full mt-2 overflow-y-auto max-h-1/2">
                <UserTable users={filteredEnrollments} />
            </div>
        </div>
    )
}

export default AdminPanel
