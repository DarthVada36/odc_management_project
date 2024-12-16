import React, { useEffect, useState } from 'react';
import MainPanel from './MainPanel';
import Pagination from './Pagination';
import {
    getEnrollmentById,
    deleteEnrollmentById,
    getAllEnrollmentsByCourseId,
} from '../services/enrollmentServices';
import EmailEditorComponent from './EmailEditorComponent.jsx';
import { sendEmail } from '../services/emailService.js';
import { getCourseById } from '../services/coursesServices';
import { exportToPDF, exportToExcel } from '../utils/exportUtils';
import pdfIcon from '../assets/icons/file-pdf.svg';
import excelIcon from '../assets/icons/file-excel.svg';
import ConfirmationModal from './ConfirmationModal';
import EnrollmentForm from './EnrollmentForm';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const EnrollmentsTableByCourse = ({ courseId }) => {
    const [enrollments, setEnrollments] = useState([]);
    const [filteredEnrollments, setFilteredEnrollments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRecipients, setSelectedRecipients] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [showEmailEditor, setShowEmailEditor] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedEnrollment, setSelectedEnrollment] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [courseName, setCourseName] = useState('');
    const { authRequest } = useAuth();
    const navigate = useNavigate();
    const itemsPerPage = 8;

    const totalPages = Math.ceil(filteredEnrollments.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentEnrollments = filteredEnrollments.slice(indexOfFirstItem, indexOfLastItem);

    const fetchEnrollments = async () => {
        try {
            setLoading(true);
            const data = await getAllEnrollmentsByCourseId(courseId);
            setEnrollments(data);
            setFilteredEnrollments(data);
            setLoading(false);
        } catch (error) {
            console.error('Error al obtener las inscripciones:', error);
            setError(error);
            setLoading(false);
        }
    };

    const fetchCourseName = async () => {
        try {
            const course = await getCourseById(courseId);
            setCourseName(course.title);
        } catch (error) {
            console.error('Error al obtener el nombre del curso:', error);
        }
    };

    useEffect(() => {
        fetchEnrollments();
        fetchCourseName();
    }, []);

    const handleSearch = (searchTerm) => {
        const lowerCaseSearch = searchTerm.toLowerCase();
        const filtered = enrollments.filter((enrollment) =>
            enrollment.fullname.toLowerCase().includes(lowerCaseSearch)
        );
        setFilteredEnrollments(filtered);
        setCurrentPage(1);
    };

    const handleRegisterClick = () => {
        navigate(`/inscription/${courseId}`);
    };

    const handleOpenEmailEditor = (recipients, subject) => {
        setSelectedRecipients(recipients);
        setSelectedSubject(subject);
        setShowEmailEditor(true);
    };

    const handleSendEmail = async (html) => {
        const customSubject = prompt(
            'Escribe el asunto del correo:',
            selectedSubject || 'Asunto por defecto'
        );

        if (!customSubject) {
            alert('El asunto no puede estar vacío.');
            return;
        }

        try {
            await sendEmail(selectedRecipients, customSubject, html);
            alert('Correo enviado con éxito.');
        } catch (error) {
            alert('Error al enviar el correo. Por favor, inténtalo de nuevo.');
        } finally {
            setShowEmailEditor(false);
        }
    };

    const handleCloseEmailEditor = () => {
        setShowEmailEditor(false);
    };

    const handleExportPDF = async () => {
        try {
            const headers = ['Usuario', 'Email', 'Menores'];
            const data = filteredEnrollments.map((enrollment) => [
                enrollment.fullname,
                enrollment.email,
                enrollment.minors
                    .map((minor) => `${minor.name} (${minor.age} años)`)
                    .join(', '),
            ]);
            await exportToPDF(
                'Listado de Inscripciones',
                headers,
                data,
                'inscripciones.pdf'
            );
        } catch (error) {
            console.error('Error al exportar a PDF:', error);
        }
    };

    const handleExportExcel = () => {
        try {
            const headers = ['Usuario', 'Email', 'Menores'];
            const data = filteredEnrollments.map((enrollment) => [
                enrollment.fullname,
                enrollment.email,
                enrollment.minors
                    .map((minor) => `${minor.name} (${minor.age} años)`)
                    .join(', '),
            ]);
            exportToExcel('Inscripciones', headers, data, 'inscripciones.xlsx');
        } catch (error) {
            console.error('Error al exportar a Excel:', error);
        }
    };

    const handleDeleteClick = (enrollment) => {
        setSelectedEnrollment(enrollment);
        setModalMessage(
            `¿Estás seguro de que deseas eliminar al inscrito ${enrollment.fullname}?`
        );
        setIsModalOpen(true);
    };

    const handleDeleteConfirm = async () => {
        setIsModalOpen(false);
        try {
            await deleteEnrollmentById(selectedEnrollment.id);
            fetchEnrollments();
        } catch (error) {
            console.error('Error al eliminar:', error);
            alert('Error al eliminar el inscrito');
        }
    };

    const handleEditClick = async (enrollment) => {
        try {
            const response = await authRequest(
                `http://localhost:3000/api/enrollments/${enrollment.id}/with-minors`
            );
            const enrollmentData = await response.json();
            setSelectedEnrollment(enrollmentData);
            setIsEditing(true);
            setShowModal(true);
        } catch (error) {
            console.error('Error al obtener los datos del inscrito:', error);
            alert('Error al cargar los datos del inscrito');
        }
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>Error al cargar las inscripciones</div>;

    return (
        <MainPanel
            title={`Gestión de inscripciones del curso ${courseName}`}
            totalItems={filteredEnrollments.length}
            onSearch={handleSearch}
        >
            <div className="flex flex-col h-full">
                {/* Botones de acciones */}
                <div className="flex flex-col justify-between mb-4 space-y-2 mobile:flex-col tablet:flex-row tablet:space-y-0">
                    <button
                        onClick={handleRegisterClick}
                        className="px-4 py-2 text-black transition-all duration-300 bg-white border-2 border-black font-helvetica-w20-bold hover:bg-black hover:text-white"
                    >
                        Registrar nueva inscripción
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
                        <button
                            onClick={() =>
                                handleOpenEmailEditor(
                                    enrollments.map((e) => e.email),
                                    'Inscripciones Generales'
                                )
                            }
                            className="flex items-center px-4 py-2 text-black transition-all duration-300 bg-orange border border-black hover:bg-black hover:text-white"
                        >
                            <img
                                src={'src/assets/email.png'}
                                className="w-5 h-5 mr-2"
                                alt="Email Icon"
                            />
                            <span>Email a todos</span>
                        </button>
                    </div>
                </div>

                {/* Tabla de inscripciones */}
                <div className="flex-1 overflow-auto">
                    <table className="w-full mb-4 border-collapse">
                        <thead>
                            <tr className="border-b-2 border-orange">
                                <th className="p-3 text-left font-helvetica-w20-bold">
                                    Nombre Completo
                                </th>
                                <th className="p-3 text-left font-helvetica-w20-bold">
                                    Email
                                </th>
                                <th className="p-3 text-left font-helvetica-w20-bold">
                                    Menores
                                </th>
                                <th className="p-3 text-center font-helvetica-w20-bold">
                                    Acciones
                                </th>
                                <th className="p-3 text-center font-helvetica-w20-bold">
                                    Contacto
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentEnrollments.map((enrollment, index) => (
                                <tr
                                    key={index}
                                    className="transition-colors duration-300 border-b hover:bg-neutral-200"
                                >
                                    <td className="p-3 text-left font-helvetica-w20-bold">
                                        {enrollment.fullname}
                                    </td>
                                    <td className="p-3 text-left font-helvetica-w20-bold">
                                        {enrollment.email}
                                    </td>
                                    <td className="p-3 text-left font-helvetica-w20-bold">
                                        {enrollment.minors.length > 0 ? (
                                            enrollment.minors.map(
                                                (minor, idx) => (
                                                    <div key={idx}>
                                                        {minor.name} (
                                                        {minor.age} años)
                                                    </div>
                                                )
                                            )
                                        ) : (
                                            <span>Sin menores registrados</span>
                                        )}
                                    </td>
                                    <td className="p-3">
                                        <div className="flex justify-center gap-2">
                                            <button
                                                onClick={() =>
                                                    handleEditClick(enrollment)
                                                }
                                                className="px-4 py-2 text-black transition-all duration-300 bg-white border-2 border-black font-helvetica-w20-bold hover:bg-black hover:text-white"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeleteClick(
                                                        enrollment
                                                    )
                                                }
                                                className="px-4 py-2 text-black transition-all duration-300 bg-primary font-helvetica-w20-bold hover:bg-black hover:text-white"
                                            >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                    <td className="p-3">
                                        <div className="flex justify-center">
                                            <button
                                                className="flex items-center px-4 py-2 text-white transition-all duration-300 bg-black border-2 border-black font-helvetica-w20-bold hover:bg-white hover:text-black group"
                                                onClick={() =>
                                                    handleOpenEmailEditor(
                                                        [enrollment.email],
                                                        `Contacto con ${enrollment.fullname}`
                                                    )
                                                }
                                            >
                                                <img
                                                    src={'src/assets/email.png'}
                                                    className="w-5 h-5 mr-2 brightness-0 invert group-hover:brightness-100 group-hover:invert-0"
                                                    alt="Email Icon"
                                                />
                                                <span>Email</span>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Paginación */}
                <div className="mt-4">
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>
            </div>

            {/* Modal de confirmación */}
            <ConfirmationModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                message={modalMessage}
                onConfirm={handleDeleteConfirm}
            />

            {/* Editor de correos */}
            {showEmailEditor && (
                <EmailEditorComponent
                    onSendEmail={handleSendEmail}
                    onClose={handleCloseEmailEditor}
                    subject={selectedSubject}
                    recipients={selectedRecipients}
                />
            )}

            {showModal && (
                <EnrollmentForm
                    initialData={selectedEnrollment}
                    isEditing={isEditing}
                    onSubmit={async (formData) => {
                        try {
                            if (isEditing) {
                                await authRequest(
                                    `http://localhost:3000/api/enrollments/${selectedEnrollment.id}`,
                                    {
                                        method: 'PUT',
                                        body: JSON.stringify(formData),
                                    }
                                );
                            } else {
                                await authRequest(
                                    'http://localhost:3000/api/enrollments',
                                    {
                                        method: 'POST',
                                        body: JSON.stringify(formData),
                                    }
                                );
                            }
                            await fetchEnrollments();
                            setShowModal(false);
                            return true;
                        } catch (error) {
                            console.error('Error:', error);
                            alert(error.message);
                            return false;
                        }
                    }}
                    onCancel={() => {
                        setShowModal(false);
                        setSelectedEnrollment(null);
                        setIsEditing(false);
                    }}
                    title={
                        isEditing
                            ? 'Editar Inscripción'
                            : 'Crear nueva Inscripción'
                    }
                    submitText={isEditing ? 'Guardar cambios' : 'Crear'}
                />
            )}
        </MainPanel>
    );
};

export default EnrollmentsTableByCourse;
