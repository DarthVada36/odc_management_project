import Pagination from './Pagination'
import React, { useEffect, useState } from 'react'
import { exportToPDF, exportToExcel } from '../utils/exportUtils'
import MainPanel from './MainPanel.jsx'
import { getAllCourses, deleteCourseById } from '../services/coursesServices.js'

const CoursesTable = ({ onShowEnrollmentsByCourse }) => {
    const [courses, setCourses] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [filteredCourses, setFilteredCourses] = useState([])
    // Pagination
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 5
    const totalPages = Math.ceil(courses.length / itemsPerPage)

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentCourses = courses.slice(indexOfFirstItem, indexOfLastItem)

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const data = await getAllCourses()
                setCourses(data)
                setLoading(false)
            } catch (error) {
                console.error('Error fetching courses:', error)
                setError(error)
                setLoading(false)
            }
        }

        fetchCourses()
    }, [])

    const handleDelete = async (id) => {
        try {
            await deleteCourseById(id)
            setCourses(courses.filter((course) => course.id !== id))
        } catch (error) {
            console.error('Error deleting course:', error)
            setError(error)
        }
    }

    const handleExportPDF = () => {
        try {
            // Implement PDF export logic
            const headers = [
                'Título',
                'Descripción',
                'Fecha',
                'Schedule',
                'Link',
                'Tickets',
            ]
            const data = courses.map((course) => [
                course.title,
                course.description,
                course.date,
                course.schedule,
                course.link,
                course.tickets,
            ])
            exportToPDF('Courses List', headers, data, 'courses.pdf')
        } catch (error) {
            console.error('Error exporting to PDF:', error)
        }
    }

    const handleExportExcel = () => {
        try {
            // Implement Excel export logic
            const headers = [
                'Title',
                'Description',
                'Date',
                'Schedule',
                'Link',
                'Tickets',
            ]
            const data = courses.map((course) => [
                course.title,
                course.description,
                course.date,
                course.schedule,
                course.link,
                course.tickets,
            ])
            exportToExcel('Courses', headers, data, 'courses.xlsx')
        } catch (error) {
            console.error('Error exporting to Excel:', error)
        }
    }
    const handleSearch = (searchTerm) => {
        const lowerCaseSearch = searchTerm.toLowerCase()
        const filtered = courses.filter((course) =>
            course.title.toLowerCase().includes(lowerCaseSearch)
        )
        setFilteredCourses(filtered)
    }

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        return <div>Error loading courses</div>
    }

    return (
        <MainPanel
            title="Gestión de Cursos"
            totalItems={filteredCourses.length}
            onSearch={handleSearch}
        >
            {/* <div className="p-2 bg-white rounded-lg shadow-md sm:p-6 md:p-8"> */}
            {/* Botones de exportación */}
            <div className="flex justify-end mb-6 space-x-4">
                <button
                    onClick={handleExportPDF}
                    className="p-2 hover:bg-orange-600"
                    aria-label="Exportar a PDF"
                >
                    <svg
                        width="35"
                        height="35"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="#000000"
                            d="M450,0 L450,150 C450,177.614 469.9,200 494.444,200 L650,200 L450,0 Z M400,0 L400,150 C400,205.228475 444.771525,250 500,250 L650,250 L650,850 L50,850 C22.3857625,850 0,827.614237 0,800 L0,0 L400,0 Z M178.247,394.65 L136.126,394.65 C128.215333,394.65 122.052,396.880333 117.636,401.341 C113.22,405.801667 111.011667,411.943 111.011,419.765 L111.011,554.505 C110.830515,560.449687 112.835702,566.25427 116.647,570.82 C120.404333,575.236667 125.469,577.445 131.841,577.445 C138.257,577.445 143.277667,575.247667 146.903,570.853 C150.528333,566.458333 152.341,561.009 152.341,554.505 L152.341,515.614 L183.652,515.614 C203.56,515.614 218.765333,509.22 229.268,496.432 C238.452,485.489333 243.044,471.273 243.044,453.783 C243.0327,448.342686 242.267419,442.93019 240.77,437.7 C239.250582,432.330917 237.023007,427.188057 234.146,422.407 C231.390589,417.756456 228.020173,413.499036 224.126,409.75 C213.843333,399.688 198.550333,394.654667 178.247,394.65 Z M152.341,430.843 L175.541,430.843 C182.661,430.843 188.527667,432.930333 193.141,437.105 C197.754333,441.279667 200.259,446.926667 200.655,454.046 C200.655,461.779333 198.414,467.909667 193.932,472.437 C189.097333,477.272333 182.241667,479.689333 173.365,479.688001 L152.341,479.688001 L152.341,430.843 Z M269.841,567.524 C274.191667,571.985333 280.212333,574.215667 287.903,574.215 L333.254,574.742 C350.568,574.742 365.641333,570.875333 378.474,563.142 C391.190939,555.533442 401.409177,544.376795 407.874,531.042 C414.641333,517.375333 418.026608,501.972333 418.026608,484.833 C418.074529,470.478255 415.217166,456.262192 409.626,443.041 C404.452289,430.323092 395.86325,419.283107 384.808,411.141 C369.866,400.155 350.706,394.661 327.328,394.661 L288.433,394.661 C280.523,394.661 274.359667,396.891333 269.943,401.352 C265.526333,405.812667 263.318,411.954 263.318,419.776 L263.318,549.1 C263.318,556.922667 265.493333,563.064 269.844,567.524 L269.841,567.524 Z M304.646,430.843 L320.532,430.843 C336.966667,430.843 349.293333,434.534333 357.512,441.917 C368.498,451.453667 373.991,465.758 373.991,484.83 C373.991,502.716667 369.224333,516.669333 359.691,526.688 C352.045,534.774 340.531333,538.817 325.15,538.817 L304.65,538.817 L304.65,430.843 L304.646,430.843 Z M524.124,431.634 C529.421955,431.792443 534.597598,430.024119 538.691,426.657 C542.63429,423.370506 544.826595,418.438282 544.624,413.309 C544.624,407.465 542.679333,402.894667 538.79,399.598 C534.900667,396.301333 530.012,394.654 524.124,394.654 L464.471,394.654 C456.561,394.654 450.397667,396.884333 445.981,401.345 C441.564333,405.805667 439.356,411.947 439.356,419.769 L439.356,554.505 C439.174005,560.443763 441.165192,566.244872 444.956,570.82 C448.689333,575.236667 453.743,577.445 460.117,577.445 C466.577,577.445 471.619667,575.247667 475.245,570.853 C478.870333,566.458333 480.683333,561.009 480.684,554.505 L480.684,504.276 L517.4,504.276 C523.288,504.276 528.177,502.65 532.067,499.398 C535.957,496.146 537.901333,491.641667 537.9,485.885 C537.9,480.128333 535.966667,475.635 532.1,472.405 C528.233333,469.175 523.333333,467.56 517.4,467.56 L480.687,467.56 L480.687,431.634 L524.127,431.634 L524.124,431.634 Z"
                            transform="matrix(.1 0 0 .1 17.5 8.6)"
                        />
                    </svg>
                </button>
                <button
                    onClick={handleExportExcel}
                    className=" hover:bg-orange-600"
                    aria-label="Exportar a Excel"
                >
                    <svg
                        width="35"
                        height="35"
                        viewBox="0 0 100 100"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill="#000000"
                            fill-rule="evenodd"
                            d="M669.445,275H825L625,75V225C625,252.616,644.9,275,669.445,275ZM675,325A100,100,0,0,1,575,225V75H175V874.774h0.006c0,0.076-.006.15-0.006,0.226a50,50,0,0,0,50,50H825V325H675ZM400,800H300V750H400v50Zm150,0H450V750H550v50Zm-7.322-282.322L472.856,587.5l69.822,69.822h0a25,25,0,0,1-35.356,35.356h0L437.5,622.856l-69.822,69.822h0a25,25,0,0,1-35.356-35.356h0L402.144,587.5l-69.822-69.822h0a25,25,0,0,1,35.356-35.356h0L437.5,552.145l69.822-69.823h0a25,25,0,0,1,35.356,35.356h0ZM700,800H600V750H700v50Zm0-100H600V650H700v50Zm0-100H600V550H700v50Zm0-100H600V450H700v50Z"
                            transform="scale(.1)"
                        />
                    </svg>
                </button>
            </div>

            {/* Contenedor de la tabla */}
            <div className="overflow-x-auto">
                <table className="w-full border-collapse table-auto">
                    {/* Encabezado de la tabla */}
                    <thead className="text-base font-bold text-black bg-orange">
                        <tr>
                            <th className="px-4 py-3 text-left">Título</th>
                            <th className="px-4 py-3 text-left">Descripción</th>
                            <th className="px-4 py-3 text-left">Fecha</th>
                            <th className="px-4 py-3 text-left">Horario</th>
                            <th className="px-4 py-3 text-left">Enlace</th>
                            <th className="px-4 py-3 text-left">Tickets</th>
                            <th className="p-2 text-left text-black sm:p-3 md:p-4">
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    {/* Cuerpo de la tabla */}
                    <tbody>
                        {currentCourses.map((course, index) => (
                            <tr
                                key={index}
                                className="mb-8 bg-white border-b border-gray-200 hover:bg-gray-50"
                            >
                                <td className="px-4 py-3 text-sm text-left">
                                    {course.title}
                                </td>
                                <td className="px-4 py-3 text-sm text-left">
                                    {course.description}
                                </td>
                                <td className="px-4 py-3 text-sm text-left">
                                    {new Date(course.date).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-3 mb-16 text-sm text-left">
                                    {course.schedule}
                                </td>
                                <td className="px-4 py-3 text-sm text-left">
                                    <a
                                        href={course.link}
                                        className="text-blue-600 underline hover:text-blue-800"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Ver
                                    </a>
                                </td>
                                <td className="px-4 py-3 text-sm text-left">
                                    {course.tickets}
                                </td>
                                <td className="sm:p-3 md:p-4">
                                    <div className="flex flex-col items-center space-y-2 sm:flex-row sm:justify-center sm:space-x-2 sm:space-y-0">
                                        <button className="flex items-center px-2 py-2 transition-all duration-300 bg-white border text-dark border-dark font-helvetica-w20-bold hover:bg-dark hover:text-white">
                                            Editar
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDelete(enrollment.id)
                                            }
                                            className="flex items-center px-2 py-2 transition-all duration-300 bg-white border text-dark border-dark font-helvetica-w20-bold hover:bg-dark hover:text-white"
                                        >
                                            Eliminar
                                        </button>
                                        <button
                                            onClick={() =>
                                                onShowEnrollmentsByCourse(
                                                    course.id
                                                )
                                            }
                                            className="flex items-center px-2 py-2 transition-all duration-300 bg-white border text-dark border-dark font-helvetica-w20-bold hover:bg-dark hover:text-white"
                                        >
                                            Inscritos
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Paginación */}
            <div className="mt-6">
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
            {/* </div> */}
        </MainPanel>
    )
}

export default CoursesTable
