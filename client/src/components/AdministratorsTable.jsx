import React, { useState, useEffect } from 'react'
import MainPanel from './MainPanel'
import Pagination from './Pagination'
import { getAllAdmins } from '../services/adminServices' // necesitarás crear este servicio
import { exportToPDF, exportToExcel } from '../utils/exportUtils'

const AdministratorsTable = () => {
    const [admins, setAdmins] = useState([])
    const [filteredAdmins, setFilteredAdmins] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5

    const fetchAdmins = async () => {
        try {
            setLoading(true)
            const data = await getAllAdmins()
            setAdmins(data)
            setFilteredAdmins(data)
            setLoading(false)
        } catch (error) {
            console.error('Error al obtener los administradores:', error)
            setError(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchAdmins()
    }, [])

    const handleSearch = (searchTerm) => {
        const lowerCaseSearch = searchTerm.toLowerCase()
        const filtered = admins.filter((admin) =>
            admin.username.toLowerCase().includes(lowerCaseSearch)
        )
        setFilteredAdmins(filtered)
    }

    const handleExportPDF = async () => {
        try {
            const headers = ['Usuario', 'Rol']
            const data = filteredAdmins.map((admin) => [
                admin.username,
                admin.role_id === 1
                    ? 'Superadmin'
                    : admin.role_id === 2
                    ? 'Admin'
                    : 'Facilitator',
            ])
            await exportToPDF(
                'Listado de Administradores',
                headers,
                data,
                'administradores.pdf'
            )
        } catch (error) {
            console.error('Error al exportar a PDF:', error)
        }
    }

    const handleExportExcel = () => {
        try {
            const headers = ['Usuario', 'Rol']
            const data = filteredAdmins.map((admin) => [
                admin.username,
                admin.role_id === 1
                    ? 'Superadmin'
                    : admin.role_id === 2
                    ? 'Admin'
                    : 'Facilitator',
            ])
            exportToExcel(
                'Administradores',
                headers,
                data,
                'administradores.xlsx'
            )
        } catch (error) {
            console.error('Error al exportar a Excel:', error)
        }
    }

    if (loading) return <div>Cargando...</div>
    if (error) return <div>Error al cargar los administradores</div>

    return (
        <MainPanel
            title="Gestión de Administradores"
            totalItems={filteredAdmins.length}
            onSearch={handleSearch}
        >
            {/* Main container to handle scroll */}
            <div className="flex flex-col h-full p-2 overflow-hidden bg-white shadow-md sm:p-6 md:p-8">
                <div className="flex justify-end mb-4 space-x-4">
                    <button
                        onClick={handleExportPDF}
                        className="px-4 py-2 text-black border border-black rounded bg-orange"
                    >
                        Descargar PDF
                    </button>
                    <button
                        onClick={handleExportExcel}
                        className="px-4 py-2 text-black border border-black rounded bg-orange"
                    >
                        Descargar Excel
                    </button>
                </div>

                {/* Table with scroll */}
                <div className="flex-1 overflow-auto">
                    <table className="w-full border table-auto border-orange">
                        <thead className="sticky top-0 text-white bg-orange">
                            <tr>
                                <th className="p-2 text-black sm:p-3 md:p-4">
                                    Usuario
                                </th>
                                <th className="p-2 text-black sm:p-3 md:p-4">
                                    Rol
                                </th>
                                <th className="p-2 text-black sm:p-3 md:p-4">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAdmins.map((admin) => (
                                <tr
                                    key={admin.id}
                                    className="text-center border-b border-orange"
                                >
                                    <td className="p-2 sm:p-3 md:p-4">
                                        {admin.username}
                                    </td>
                                    <td className="p-2 sm:p-3 md:p-4">
                                        {admin.role_id}
                                    </td>
                                    <td className="p-2 sm:p-3 md:p-4">
                                        <div className="flex justify-center gap-2">
                                            <button className="px-4 py-1 text-black border border-black rounded bg-orange">
                                                Editar
                                            </button>
                                            <button className="px-4 py-1 text-black bg-white border border-black rounded">
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Paginación en la parte inferior */}
                <div className="mt-4">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(
                            filteredAdmins.length / itemsPerPage
                        )}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>
        </MainPanel>
    )
}

export default AdministratorsTable
