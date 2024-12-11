import React, { useState, useEffect } from 'react'
import MainPanel from './MainPanel'
import Pagination from './Pagination'
import { getAllAdmins, deleteAdminById } from '../services/adminServices'
import { exportToPDF, exportToExcel } from '../utils/exportUtils'
import excelIcon from '../assets/icons/file-excel.svg'
import pdfIcon from '../assets/icons/file-pdf.svg'
import ConfirmationModal from './ConfirmationModal'
import AdminForm from './AdminForm'
import { useAuth } from '../context/AuthContext'

const AdministratorsTable = () => {
    const [admins, setAdmins] = useState([])
    const [filteredAdmins, setFilteredAdmins] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [currentPage, setCurrentPage] = useState(1)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [modalMessage, setModalMessage] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [selectedAdmin, setSelectedAdmin] = useState(null)
    const [isEditing, setIsEditing] = useState(false)
    const { authRequest } = useAuth()
    const itemsPerPage = 6
    const totalPages = Math.ceil(filteredAdmins.length / itemsPerPage)
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentAdmins = filteredAdmins.slice(
        indexOfFirstItem,
        indexOfLastItem
    )

    useEffect(() => {
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
        fetchAdmins()
    }, [])

    const handleSearch = (searchTerm) => {
        const lowerCaseSearch = searchTerm.toLowerCase()
        const filtered = admins.filter((admin) =>
            admin.username.toLowerCase().includes(lowerCaseSearch)
        )
        setFilteredAdmins(filtered)
        setCurrentPage(1)
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

    const handleDeleteClick = (admin) => {
        setSelectedAdmin(admin)
        setModalMessage(
            `¿Estás seguro de que deseas eliminar al administrador ${admin.username}?`
        )
        setIsModalOpen(true)
    }

    const handleDeleteConfirm = async () => {
        setIsModalOpen(false)
        try {
            await deleteAdminById(selectedAdmin.id)
            setFilteredAdmins(
                filteredAdmins.filter((a) => a.id !== selectedAdmin.id)
            )
            setCurrentPage(1) // Resetear la página después de una eliminación
        } catch (error) {
            console.error('Error al eliminar administrador:', error)
            alert('Error al eliminar el administrador')
        }
    }

    const handleEditClick = async (admin) => {
        try {
            const response = await authRequest(
                `http://localhost:3000/api/admins/${admin.id}`
            )
            const adminData = await response.json()
            setSelectedAdmin(adminData)
            setIsEditing(true)
            setShowModal(true)
        } catch (error) {
            console.error(
                'Error al obtener los datos del administrador:',
                error
            )
            alert('Error al cargar los datos del administrador')
        }
    }

    const handleCreateClick = () => {
        setSelectedAdmin(null)
        setIsEditing(false)
        setShowModal(true)
    }

    if (loading) return <div>Cargando...</div>
    if (error) return <div>Error al cargar los administradores</div>

    return (
        <MainPanel
            title="Gestión de Administradores"
            totalItems={filteredAdmins.length}
            onSearch={handleSearch}
        >
            <div className="flex flex-col h-full">
                {/* Actions buttons */}
                <div className="flex flex-col justify-between mb-4 space-y-2 mobile:flex-col tablet:flex-row tablet:space-y-0">
                    <button
                        onClick={handleCreateClick}
                        className="px-4 py-2 text-black transition-all duration-300 bg-white border-2 border-black font-helvetica-w20-bold hover:bg-black hover:text-white"
                    >
                        Crear Nuevo Administrador
                    </button>
                    <div className="flex items-center justify-start gap-4 tablet:justify-end">
                        <img
                            src={pdfIcon}
                            alt="Exportar a PDF"
                            className="w-8 h-8 transition-opacity duration-300 cursor-pointer opacity-70 hover:opacity-100"
                            onClick={handleExportPDF}
                            title="Exportar a PDF"
                        />
                        <img
                            src={excelIcon}
                            alt="Exportar a Excel"
                            className="w-8 h-8 transition-opacity duration-300 cursor-pointer opacity-70 hover:opacity-100"
                            onClick={handleExportExcel}
                            title="Exportar a Excel"
                        />
                    </div>
                </div>

                {/* Table of Admins */}
                <div className="flex-1 overflow-auto">
                    <table className="w-full mb-4 border-collapse">
                        <thead>
                            <tr className="border-b-2 border-orange">
                                <th className="w-1/3 p-3 text-left font-helvetica-w20-bold">
                                    Usuario
                                </th>
                                <th className="w-1/3 p-3 text-left font-helvetica-w20-bold">
                                    Rol
                                </th>
                                <th className="w-1/3 p-3 text-center font-helvetica-w20-bold">
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentAdmins.map((admin) => (
                                <tr
                                    key={admin.id}
                                    className="transition-colors duration-300 border-b hover:bg-neutral-200"
                                >
                                    <td className="p-3 text-left font-helvetica-w20-bold">
                                        {admin.username}
                                    </td>
                                    <td className="p-3 text-left">
                                        {admin.role_id === 1
                                            ? 'Superadmin'
                                            : admin.role_id === 2
                                            ? 'Admin'
                                            : 'Facilitator'}
                                    </td>
                                    <td className="p-3 text-center">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() =>
                                                    handleEditClick(admin)
                                                }
                                                className="px-4 py-2 text-black transition-all duration-300 bg-white border-2 border-black font-helvetica-w20-bold hover:bg-black hover:text-white"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeleteClick(admin)
                                                }
                                                className="px-4 py-2 text-black transition-all duration-300 border-2 border-black bg-primary font-helvetica-w20-bold hover:bg-black hover:text-white"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>

            {/* Modal of confirmation */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                message={modalMessage}
                onConfirm={handleDeleteConfirm}
            />

            {showModal && (
                <AdminForm
                    initialData={selectedAdmin}
                    isEditing={isEditing}
                    onSubmit={async (formData) => {
                        try {
                            if (isEditing) {
                                await authRequest(
                                    `http://localhost:3000/api/admins/${selectedAdmin.id}`,
                                    {
                                        method: 'PUT',
                                        body: JSON.stringify(formData),
                                    }
                                )
                            } else {
                                await authRequest(
                                    'http://localhost:3000/api/admins',
                                    {
                                        method: 'POST',
                                        body: JSON.stringify(formData),
                                    }
                                )
                            }
                            setFilteredAdmins([
                                ...filteredAdmins,
                                ...(isEditing
                                    ? [
                                          {
                                              ...selectedAdmin,
                                              ...formData,
                                          },
                                      ]
                                    : [formData]),
                            ])
                            setShowModal(false)
                            return true
                        } catch (error) {
                            console.error('Error:', error)
                            alert(error.message)
                            return false
                        }
                    }}
                    onCancel={() => {
                        setShowModal(false)
                        setSelectedAdmin(null)
                        setIsEditing(false)
                    }}
                    title={
                        isEditing
                            ? 'Editar Administrador'
                            : 'Crear nuevo Administrador'
                    }
                    submitText={isEditing ? 'Guardar cambios' : 'Crear'}
                />
            )}
        </MainPanel>
    )
}

export default AdministratorsTable
