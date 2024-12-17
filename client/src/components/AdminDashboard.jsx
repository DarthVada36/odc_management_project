import React, { useState, useEffect } from 'react'
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    LineChart,
    Line,
} from 'recharts'
import { Users, BookOpen, PercentIcon, UserPlus } from 'lucide-react'
import { getAllCourses } from '../services/coursesServices'
import { getAllEnrollments } from '../services/enrollmentServices'
import { exportToPDF } from '../utils/exportUtils'
import fileDownIcon from '../assets/icons/file-pdf.svg'
import Select from 'react-select'

const commonInputStyles =
    'px-3 py-2 text-sm border-2 border-black font-helvetica-w20-bold transition-colors duration-300 border-2 border-black focus:outline-none hover:border-primary focus:border-primary h-10'

const MetricCard = ({ icon: Icon, title, value, color, subtitle }) => (
    <div className="p-4 bg-white rounded-lg shadow-sm tablet:p-6">
        <div className="flex items-center space-x-3 tablet:space-x-4">
            <div
                className={`p-2 tablet:p-3 rounded-full bg-opacity-10 ${color}`}
            >
                <Icon className={`h-5 w-5 tablet:h-6 tablet:w-6 ${color}`} />
            </div>
            <div>
                <p className="text-xs font-medium font-helvetica-w20-bold tablet:text-sm text-neutral-600">
                    {title}
                </p>
                <h3 className="text-lg font-bold font-helvetica-w20-bold tablet:text-2xl text-neutral-900">
                    {value}
                </h3>
                {subtitle && (
                    <p className="text-xs font-helvetica-w20-bold text-neutral-500">
                        {subtitle}
                    </p>
                )}
            </div>
        </div>
    </div>
)

const AdminDashboard = () => {
    const [metrics, setMetrics] = useState({
        totalCourses: 0,
        totalEnrollments: 0,
        ageGroups: [],
        genderDistribution: [],
        enrollmentRate: 0,
        coursesMetrics: [],
        minorsStats: {
            total: 0,
            distribution: [],
        },
        dailyEnrollments: [],
        firstTimeRate: 0,
    })

    const [selectedCourse, setSelectedCourse] = useState('all')
    const [loading, setLoading] = useState(true)

    const [endDate, setEndDate] = useState(
        new Date().toISOString().slice(0, 10)
    )
    const [startDate, setStartDate] = useState('2024-12-10')

    // export metrics to PDF
    const exportMetricsToPDF = () => {
        let exportData = []
        let exportHeaders = []
        let title = ''
        let fileName = ''
        let totalEnrollments = 0

        // Get the current date
        const currentDate = new Date().toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })

        // Converse the date strings to Date objects
        const formattedStartDate = new Date(startDate).toLocaleDateString(
            'es-ES'
        )
        const formattedEndDate = new Date(endDate).toLocaleDateString('es-ES')

        if (selectedCourse === 'all') {
            // Export overall metrics
            exportHeaders = ['Métrica', 'Valor']
            totalEnrollments = metrics.totalEnrollments
            title = 'Métricas: Todos los Cursos'
            exportData = [
                ['Fecha del Informe', currentDate],
                ['Total de Cursos', metrics.totalCourses],
                ['Total de Inscripciones', metrics.totalEnrollments],
                [
                    'Tasa de Inscripción',
                    `${metrics.enrollmentRate.toFixed(1)}%`,
                ],
                [
                    'Tasa de Primera Actividad',
                    `${metrics.firstTimeRate.toFixed(1)}%`,
                ],
                [
                    'Capacidad Total',
                    metrics.coursesMetrics.reduce(
                        (sum, course) => sum + course.capacity,
                        0
                    ),
                ],
                [
                    'Tickets Disponibles',
                    metrics.coursesMetrics.reduce(
                        (sum, course) => sum + (course.capacity - course.total),
                        0
                    ),
                ],
                [
                    'Media Ocupación',
                    `${(
                        metrics.coursesMetrics.reduce(
                            (sum, course) => sum + course.occupancyRate,
                            0
                        ) / metrics.coursesMetrics.length
                    ).toFixed(1)}%`,
                ],
                ['Media de Edad', `${getAverageAge(metrics.enrollments)} años`],
            ]
            fileName = `metricas_todos_los_cursos_${formattedStartDate}_${formattedEndDate}_${totalEnrollments}_inscripciones.pdf`
        } else {
            // Export specific course metrics
            const selectedCourseMetric = metrics.coursesMetrics.find(
                (c) => c.id.toString() === selectedCourse
            )
            const courseEnrollments = metrics.enrollments.filter(
                (e) => e.id_course.toString() === selectedCourse
            )

            totalEnrollments = courseEnrollments.length
            title = `Métricas: ${
                selectedCourseMetric?.name || 'Curso Desconocido'
            }`
            exportHeaders = ['Métrica', 'Valor']
            exportData = [
                ['Fecha del Informe', currentDate],
                ['Capacidad Total', selectedCourseMetric?.capacity || 0],
                ['Total Inscritos', totalEnrollments],
                [
                    'Tickets Disponibles',
                    (selectedCourseMetric?.capacity || 0) - totalEnrollments,
                ],
                [
                    'Ocupación',
                    `${selectedCourseMetric?.occupancyRate.toFixed(1) || 0}%`,
                ],
                [
                    'Tasa Primera Actividad',
                    `${(
                        ((selectedCourseMetric?.firstTime || 0) /
                            (totalEnrollments || 1)) *
                        100
                    ).toFixed(1)}%`,
                ],
                ['Media de Edad', `${getAverageAge(courseEnrollments)} años`],
            ]
            fileName = `metricas_${selectedCourseMetric?.name.replace(
                /\s+/g,
                '_'
            )}_${formattedStartDate}_${formattedEndDate}_${totalEnrollments}_inscripciones.pdf`
        }

        // Add date range to the title
        title += `\n(${formattedStartDate} - ${formattedEndDate})`

        // Call export function
        exportToPDF(title, exportHeaders, exportData, fileName)
    }

    // Function for filtering enrollments by date
    const getFilteredEnrollments = () => {
        if (!metrics.dailyEnrollments || metrics.dailyEnrollments.length === 0)
            return []

        return metrics.dailyEnrollments
            .filter((entry) => {
                const entryDate = entry.date
                return entryDate >= startDate && entryDate <= endDate
            })
            .map((entry) => ({
                date: entry.date,
                inscripciones:
                    selectedCourse === 'all'
                        ? entry.total
                        : entry.byCourse[selectedCourse] || 0,
            }))
    }

    const getFilteredDetailsMetrics = () => {
        if (!metrics.enrollments || !metrics.coursesMetrics) {
            return null
        }

        // Filter enrollments by date
        const filteredEnrollments = metrics.enrollments.filter((enrollment) => {
            const enrollmentDate = new Date(enrollment.createdAt)
                .toISOString()
                .slice(0, 10)
            return enrollmentDate >= startDate && enrollmentDate <= endDate
        })

        if (selectedCourse === 'all') {
            // Calculate total enrollments
            const totalMinors = filteredEnrollments.reduce(
                (sum, enrollment) =>
                    sum + (enrollment.minors ? enrollment.minors.length : 0),
                0
            )

            const courseTotals = metrics.coursesMetrics.map((course) => {
                const courseEnrollments = filteredEnrollments.filter(
                    (e) => e.id_course === course.id
                )

                //  Count minors by course
                const courseMinors = courseEnrollments.reduce(
                    (sum, enrollment) => sum + (enrollment.minors?.length || 0),
                    0
                )

                const totalInCourse = courseEnrollments.length + courseMinors

                return {
                    ...course,
                    filteredTotal: totalInCourse,
                    capacity: course.capacity,
                    occupancyRate: (totalInCourse / course.capacity) * 100,
                }
            })

            // Total adults and minors
            const totalInscritos = filteredEnrollments.length + totalMinors

            return {
                totalCourses: metrics.coursesMetrics.length,
                capacidadTotal: courseTotals.reduce(
                    (sum, course) => sum + course.capacity,
                    0
                ),
                ticketsDisponibles: courseTotals.reduce(
                    (sum, course) =>
                        sum + (course.capacity - course.filteredTotal),
                    0
                ),
                totalInscritos: totalInscritos,
                mediaOcupacion:
                    courseTotals.reduce(
                        (sum, course) => sum + course.occupancyRate,
                        0
                    ) / courseTotals.length,
                mediaEdad: getAverageAge(filteredEnrollments),
            }
        } else {
            const courseEnrollments = filteredEnrollments.filter(
                (e) => e.id_course.toString() === selectedCourse
            )
            const selectedCourseMetric = metrics.coursesMetrics.find(
                (c) => c.id.toString() === selectedCourse
            )

            if (!selectedCourseMetric) {
                return null
            }

            // Count the minors for the selected course
            const totalMinors = courseEnrollments.reduce(
                (sum, enrollment) => sum + (enrollment.minors?.length || 0),
                0
            )

            const totalParticipants = courseEnrollments.length + totalMinors

            // Count the first time
            const firstTimeCount = courseEnrollments.reduce(
                (sum, enrollment) => {
                    let count = enrollment.is_first_activity ? 1 : 0
                    if (enrollment.is_first_activity && enrollment.minors) {
                        count += enrollment.minors.length
                    }
                    return sum + count
                },
                0
            )

            return {
                capacidadTotal: selectedCourseMetric.capacity,
                totalInscritos: totalParticipants,
                ticketsDisponibles:
                    selectedCourseMetric.capacity - totalParticipants,
                ocupacion:
                    (totalParticipants / selectedCourseMetric.capacity) * 100,
                primeraActividad: (firstTimeCount / totalParticipants) * 100,
                mediaEdad: getAverageAge(courseEnrollments),
            }
        }
    }

    // Function to calculate the average age of the enrollments
    const getFilteredAgeGroups = () => {
        if (!metrics.enrollments) return []

        let relevantEnrollments = metrics.enrollments.filter((enrollment) => {
            const enrollmentDate = new Date(enrollment.createdAt)
                .toISOString()
                .slice(0, 10)
            return enrollmentDate >= startDate && enrollmentDate <= endDate
        })

        if (selectedCourse !== 'all') {
            relevantEnrollments = relevantEnrollments.filter(
                (e) => e.id_course.toString() === selectedCourse
            )
        }

        const ageGroups = [
            { name: '< 14', value: 0 },
            { name: '15-24', value: 0 },
            { name: '25-54', value: 0 },
            { name: '55+', value: 0 },
            { name: 'NS/NC', value: 0 },
        ]

        relevantEnrollments.forEach((enrollment) => {
            if (enrollment.age === 0) {
                ageGroups[4].value++
            } else if (enrollment.age < 14) {
                ageGroups[0].value++
            } else if (enrollment.age < 25) {
                ageGroups[1].value++
            } else if (enrollment.age < 55) {
                ageGroups[2].value++
            } else {
                ageGroups[3].value++
            }

            // Add minors ages
            if (enrollment.minors) {
                enrollment.minors.forEach((minor) => {
                    if (minor.age < 14) {
                        ageGroups[0].value++
                    }
                })
            }
        })

        return ageGroups
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const [courses, enrollments] = await Promise.all([
                    getAllCourses(),
                    getAllEnrollments(),
                ])

                // Filter enrrollments by date
                const filteredEnrollments = enrollments.filter((enrollment) => {
                    const enrollmentDate = new Date(enrollment.createdAt)
                        .toISOString()
                        .slice(0, 10)
                    return (
                        enrollmentDate >= startDate && enrollmentDate <= endDate
                    )
                })

                // Calculate age groups including minors
                const ageGroups = [
                    { name: '< 14', value: 0 },
                    { name: '15-24', value: 0 },
                    { name: '25-54', value: 0 },
                    { name: '55+', value: 0 },
                    { name: 'NS/NC', value: 0 },
                ]

                // Calculate gender distribution (solo para adultos)
                const genderCounts = filteredEnrollments.reduce((acc, curr) => {
                    acc[curr.gender] = (acc[curr.gender] || 0) + 1
                    return acc
                }, {})

                const genderDistribution = [
                    { name: 'Mujer', value: genderCounts['mujer'] || 0 },
                    { name: 'Hombre', value: genderCounts['hombre'] || 0 },
                    {
                        name: 'Otros géneros',
                        value: genderCounts['otros generos'] || 0,
                    },
                    { name: 'NS/NC', value: genderCounts['NS/NC'] || 0 },
                ]

                // Calculate metrics by course including minors
                const coursesMetrics = courses.map((course) => {
                    const courseEnrollments = filteredEnrollments.filter(
                        (e) => e.id_course === course.id
                    )

                    const totalMinorsInCourse = courseEnrollments.reduce(
                        (sum, enrollment) =>
                            sum + (enrollment.minors?.length || 0),
                        0
                    )

                    // Count the number of first-time activities of minors
                    const firstTimeCount = courseEnrollments.reduce(
                        (sum, enrollment) => {
                            let count = enrollment.is_first_activity ? 1 : 0
                            if (
                                enrollment.is_first_activity &&
                                enrollment.minors
                            ) {
                                count += enrollment.minors.length
                            }
                            return sum + count
                        },
                        0
                    )

                    const totalParticipantsCourse =
                        courseEnrollments.length + totalMinorsInCourse

                    return {
                        id: course.id,
                        name: course.title,
                        total: totalParticipantsCourse,
                        capacity: course.tickets || 0,
                        occupancyRate: course.tickets
                            ? (totalParticipantsCourse / course.tickets) * 100
                            : 0,
                        firstTime: firstTimeCount,
                        date: course.date,
                    }
                })

                // Calculate global total
                const totalParticipants = coursesMetrics.reduce(
                    (sum, course) => sum + course.total,
                    0
                )

                const totalCapacity = coursesMetrics.reduce(
                    (sum, course) => sum + course.capacity,
                    0
                )

                // Calculate first activity rate including minors
                const totalFirstTime = coursesMetrics.reduce(
                    (sum, course) => sum + course.firstTime,
                    0
                )

                const firstTimeRate =
                    totalParticipants > 0
                        ? (totalFirstTime / totalParticipants) * 100
                        : 0

                // Calculate enrollment rate
                const enrollmentRate =
                    totalCapacity > 0
                        ? (totalParticipants / totalCapacity) * 100
                        : 0

                // Aggregate daily enrollments including minors
                const dailyEnrollments = filteredEnrollments.reduce(
                    (acc, curr) => {
                        const date = new Date(curr.createdAt)
                            .toISOString()
                            .split('T')[0]
                        if (!acc[date]) {
                            acc[date] = {
                                date,
                                total: 0,
                                byCourse: {},
                            }
                        }

                        // Add the enrollment
                        acc[date].total++
                        // Add the minors
                        if (curr.minors) {
                            acc[date].total += curr.minors.length
                        }

                        if (!acc[date].byCourse[curr.id_course]) {
                            acc[date].byCourse[curr.id_course] = 0
                        }
                        acc[date].byCourse[curr.id_course]++
                        // Add minors to course count
                        if (curr.minors) {
                            acc[date].byCourse[curr.id_course] +=
                                curr.minors.length
                        }

                        return acc
                    },
                    {}
                )

                // Group ages including minors
                filteredEnrollments.forEach((enrollment) => {
                    if (enrollment.age === 0) {
                        ageGroups[4].value++
                    } else if (enrollment.age < 14) {
                        ageGroups[0].value++
                    } else if (enrollment.age < 25) {
                        ageGroups[1].value++
                    } else if (enrollment.age < 55) {
                        ageGroups[2].value++
                    } else {
                        ageGroups[3].value++
                    }

                    if (enrollment.minors) {
                        enrollment.minors.forEach((minor) => {
                            if (minor.age < 14) {
                                ageGroups[0].value++
                            }
                        })
                    }
                })

                setMetrics({
                    totalCourses: courses.length,
                    totalEnrollments: totalParticipants,
                    ageGroups,
                    genderDistribution,
                    enrollmentRate,
                    coursesMetrics,
                    firstTimeRate,
                    dailyEnrollments: Object.values(dailyEnrollments).sort(
                        (a, b) => new Date(a.date) - new Date(b.date)
                    ),
                    enrollments: filteredEnrollments,
                })
            } catch (error) {
                console.error(
                    'Error al obtener los datos del dashboard:',
                    error
                )
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [startDate, endDate])

    const getAverageAge = (enrollments) => {
        let allAges = []
        // Ages of adults
        const adultAges = enrollments
            .filter((e) => e.age !== 0)
            .map((e) => e.age)
        allAges = [...allAges, ...adultAges]

        // Ages of minors
        enrollments.forEach((enrollment) => {
            if (enrollment.minors) {
                const minorAges = enrollment.minors.map((minor) => minor.age)
                allAges = [...allAges, ...minorAges]
            }
        })

        if (allAges.length === 0) return 0
        const sum = allAges.reduce((acc, curr) => acc + curr, 0)
        return (sum / allAges.length).toFixed(1)
    }

    // Function to handle date change
    const handleCourseChange = (selectedOption) => {
        setSelectedCourse(selectedOption.value)
    }

    const getFilteredGenderDistribution = () => {
        if (!metrics.enrollments) return []

        let relevantEnrollments = metrics.enrollments.filter((enrollment) => {
            const enrollmentDate = new Date(enrollment.createdAt)
                .toISOString()
                .slice(0, 10)
            return enrollmentDate >= startDate && enrollmentDate <= endDate
        })

        if (selectedCourse !== 'all') {
            relevantEnrollments = relevantEnrollments.filter(
                (e) => e.id_course.toString() === selectedCourse
            )
        }

        // Only count adult enrollments
        const genderCounts = relevantEnrollments.reduce((acc, curr) => {
            acc[curr.gender] = (acc[curr.gender] || 0) + 1
            return acc
        }, {})

        return [
            { name: 'Mujer', value: genderCounts['mujer'] || 0 },
            { name: 'Hombre', value: genderCounts['hombre'] || 0 },
            {
                name: 'Otros géneros',
                value: genderCounts['otros generos'] || 0,
            },
            { name: 'NS/NC', value: genderCounts['NS/NC'] || 0 },
        ]
    }

    const COLORS = ['#ff6600', '#00a1e0', '#28a745', '#6c757d'] // Añadido un color para niños/as

    // Personalizated styles for react-select
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            border: '2px solid black',
            borderColor: state.isFocused ? '#ff7b00' : 'black',
            boxShadow: 'none',
            '&:hover': {
                borderColor: '#ff7b00',
            },
            padding: '0 6px',
            borderRadius: '0',
            minHeight: '40px',
            height: '40px',
        }),
        option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#212529' : 'white',
            color: state.isSelected ? 'white' : 'black',
            '&:hover': {
                backgroundColor: state.isSelected ? '#212529' : '#f0f0f0',
            },
        }),
        singleValue: (provided) => ({
            ...provided,
            color: 'black',
        }),
        valueContainer: (provided) => ({
            ...provided,
            height: '38px',
            padding: '0 2px',
        }),
        input: (provided) => ({
            ...provided,
            margin: '0px',
        }),
        indicatorsContainer: (provided) => ({
            ...provided,
            height: '38px',
        }),
    }

    return (
        <div className="flex-1 p-4 space-y-4 overflow-y-auto tablet:p-6 tablet:space-y-6 bg-neutral-100">
            {/* Header con título Dashboard */}
            <h1 className="text-xl font-bold font-helvetica-w20-bold tablet:text-2xl text-neutral-900">
                Dashboard
            </h1>

            {/* Main metrics */}
            <div className="grid grid-cols-2 gap-3 laptop:grid-cols-4 tablet:gap-4">
                <MetricCard
                    icon={BookOpen}
                    title="Cursos Activos"
                    value={metrics.totalCourses}
                    color="text-primary font-helvetica-w20-bold bg-primary"
                />
                <MetricCard
                    icon={Users}
                    title="Inscripciones"
                    value={metrics.totalEnrollments}
                    color="text-secondary font-helvetica-w20-bold bg-secondary"
                />
                <MetricCard
                    icon={PercentIcon}
                    title="Tasa de Inscripción"
                    value={`${metrics.enrollmentRate.toFixed(1)}%`}
                    color="text-success bg-success"
                />
                <MetricCard
                    icon={UserPlus}
                    title="Primera Actividad"
                    value={`${metrics.firstTimeRate.toFixed(1)}%`}
                    color="text-warning bg-warning"
                />
            </div>

            {/* Controls Section */}
            <div>
                <div className="flex flex-col gap-4 desktop:flex-row tablet:flex-col tablet:items-start tablet:justify-between">
                    {/* Select y Fechas */}
                    <div className="flex flex-col gap-4 tablet:flex-row tablet:items-center mobile:flex-col">
                        <div className="w-64">
                            <label className="block pb-[0.195rem] text-xs font-helvetica-w20-bold text-neutral-600">
                                Filtrar por curso
                            </label>
                            <Select
                                value={[
                                    { value: 'all', label: 'Todos los cursos' },
                                    ...metrics.coursesMetrics.map((course) => ({
                                        value: course.id.toString(),
                                        label: course.name,
                                    })),
                                ].find(
                                    (option) => option.value === selectedCourse
                                )}
                                onChange={handleCourseChange}
                                options={[
                                    { value: 'all', label: 'Todos los cursos' },
                                    ...metrics.coursesMetrics.map((course) => ({
                                        value: course.id.toString(),
                                        label: course.name,
                                    })),
                                ]}
                                placeholder="Filtrar por curso"
                                styles={{
                                    ...customStyles,
                                    menuList: (base) => ({
                                        ...base,
                                        maxHeight: '200px',
                                        '::-webkit-scrollbar': {
                                            width: '8px',
                                            height: '0px',
                                        },
                                        '::-webkit-scrollbar-track': {
                                            background: '#f1f1f1',
                                        },
                                        '::-webkit-scrollbar-thumb': {
                                            background: '#888',
                                            borderRadius: '4px',
                                        },
                                        '::-webkit-scrollbar-thumb:hover': {
                                            background: '#555',
                                        },
                                    }),
                                    menu: (base) => ({
                                        ...base,
                                        marginTop: '0',
                                    }),
                                }}
                                theme={(theme) => ({
                                    ...theme,
                                    borderRadius: 0,
                                })}
                                isSearchable={false}
                                maxMenuHeight={200}
                            />
                        </div>

                        <div className="flex items-center gap-4 ">
                            <div>
                                <label className="block pb-[0.195rem] text-xs font-helvetica-w20-bold text-neutral-600">
                                    Fecha Inicio
                                </label>
                                <input
                                    type="date"
                                    value={startDate}
                                    onChange={(e) =>
                                        setStartDate(e.target.value)
                                    }
                                    className={commonInputStyles}
                                />
                            </div>
                            <div>
                                <label className="block pb-[0.195rem] text-xs font-helvetica-w20-bold text-neutral-600">
                                    Fecha Fin
                                </label>
                                <input
                                    type="date"
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)}
                                    className={commonInputStyles}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Course Tittle and PDF icon*/}
                    <div className="flex items-center gap-4 desktop:mt-2">
                        <h2 className="text-xl font-bold font-helvetica-w20-bold text-neutral-900">
                            {selectedCourse === 'all'
                                ? 'Todos los cursos'
                                : metrics.coursesMetrics.find(
                                      (c) => c.id.toString() === selectedCourse
                                  )?.name || ''}
                        </h2>
                        <button
                            onClick={exportMetricsToPDF}
                            className="p-2 transition-opacity duration-300 cursor-pointer opacity-70 hover:opacity-100"
                            title="Exportar métricas a PDF"
                        >
                            <img
                                src={fileDownIcon}
                                alt="Exportar a PDF"
                                className="w-10 h-10 text-neutral-600"
                            />
                        </button>
                    </div>
                </div>
            </div>

            {/* Graphs */}
            <div className="grid grid-cols-1 gap-4 laptop:grid-cols-2 tablet:gap-6">
                {/* Evolution of Enrollments */}
                <div className="p-4 bg-white rounded-lg shadow-sm tablet:p-6">
                    <h2 className="mb-4 text-base font-semibold font-helvetica-w20-bold tablet:text-lg">
                        Evolución de Inscripciones
                    </h2>
                    <div className="h-[250px] tablet:h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={getFilteredEnrollments()}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="date"
                                    angle={-15}
                                    textAnchor="end"
                                    height={40}
                                />
                                <YAxis />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="inscripciones"
                                    stroke="#ff6600"
                                    strokeWidth={2}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Occupancy by Course */}
                <div className="p-4 bg-white rounded-lg shadow-sm tablet:p-6">
                    <h2 className="mb-4 text-base font-semibold font-helvetica-w20-bold tablet:text-lg">
                        Detalles
                    </h2>
                    {selectedCourse === 'all'
                        ? (() => {
                              const detailsMetrics = getFilteredDetailsMetrics()
                              return detailsMetrics ? (
                                  <div className="grid grid-cols-2 gap-4">
                                      <div className="p-4 rounded-lg bg-neutral-50">
                                          <p className="text-sm font-helvetica-w20-bold text-neutral-600">
                                              Total Cursos
                                          </p>
                                          <p className="text-2xl font-bold font-helvetica-w20-bold text-neutral-900">
                                              {detailsMetrics.totalCourses}
                                          </p>
                                      </div>
                                      <div className="p-4 rounded-lg bg-neutral-50">
                                          <p className="text-sm font-helvetica-w20-bold text-neutral-600">
                                              Capacidad Total
                                          </p>
                                          <p className="text-2xl font-bold font-helvetica-w20-bold text-neutral-900">
                                              {detailsMetrics.capacidadTotal}
                                          </p>
                                      </div>
                                      <div className="p-4 rounded-lg bg-neutral-50">
                                          <p className="text-sm font-helvetica-w20-bold text-neutral-600">
                                              Tickets Disponibles
                                          </p>
                                          <p className="text-2xl font-bold font-helvetica-w20-bold text-neutral-900">
                                              {
                                                  detailsMetrics.ticketsDisponibles
                                              }
                                          </p>
                                      </div>
                                      <div className="p-4 rounded-lg bg-neutral-50">
                                          <p className="text-sm font-helvetica-w20-bold text-neutral-600">
                                              Total Inscritos
                                          </p>
                                          <p className="text-2xl font-bold font-helvetica-w20-bold text-neutral-900">
                                              {detailsMetrics.totalInscritos}
                                          </p>
                                      </div>
                                      <div className="p-4 rounded-lg bg-neutral-50">
                                          <p className="text-sm font-helvetica-w20-bold text-neutral-600">
                                              Media Ocupación
                                          </p>
                                          <p className="text-2xl font-bold font-helvetica-w20-bold text-neutral-900">
                                              {detailsMetrics.mediaOcupacion.toFixed(
                                                  1
                                              )}
                                              %
                                          </p>
                                      </div>
                                      <div className="p-4 rounded-lg bg-neutral-50">
                                          <p className="text-sm font-helvetica-w20-bold text-neutral-600">
                                              Media de Edad
                                          </p>
                                          <p className="text-2xl font-bold font-helvetica-w20-bold text-neutral-900">
                                              {detailsMetrics.mediaEdad}
                                          </p>
                                      </div>
                                  </div>
                              ) : (
                                  <p>No hay datos para mostrar.</p>
                              )
                          })()
                        : (() => {
                              const detailsMetrics = getFilteredDetailsMetrics()
                              return detailsMetrics ? (
                                  <div className="grid grid-cols-2 gap-4">
                                      <div className="p-4 rounded-lg bg-neutral-50">
                                          <p className="text-sm font-helvetica-w20-bold text-neutral-600">
                                              Capacidad Total
                                          </p>
                                          <p className="text-2xl font-bold font-helvetica-w20-bold text-neutral-900">
                                              {detailsMetrics.capacidadTotal}
                                          </p>
                                      </div>
                                      <div className="p-4 rounded-lg bg-neutral-50">
                                          <p className="text-sm font-helvetica-w20-bold text-neutral-600">
                                              Inscritos
                                          </p>
                                          <p className="text-2xl font-bold font-helvetica-w20-bold text-neutral-900">
                                              {detailsMetrics.totalInscritos}
                                          </p>
                                      </div>
                                      <div className="p-4 rounded-lg bg-neutral-50">
                                          <p className="text-sm font-helvetica-w20-bold text-neutral-600">
                                              Tickets Disponibles
                                          </p>
                                          <p className="text-2xl font-bold font-helvetica-w20-bold text-neutral-900">
                                              {
                                                  detailsMetrics.ticketsDisponibles
                                              }
                                          </p>
                                      </div>
                                      <div className="p-4 rounded-lg bg-neutral-50">
                                          <p className="text-sm font-helvetica-w20-bold text-neutral-600">
                                              Ocupación
                                          </p>
                                          <p className="text-2xl font-bold font-helvetica-w20-bold text-neutral-900">
                                              {detailsMetrics.ocupacion.toFixed(
                                                  1
                                              )}
                                              %
                                          </p>
                                      </div>
                                      <div className="p-4 rounded-lg bg-neutral-50">
                                          <p className="text-sm font-helvetica-w20-bold text-neutral-600">
                                              Primera Actividad
                                          </p>
                                          <p className="text-2xl font-bold font-helvetica-w20-bold text-neutral-900">
                                              {detailsMetrics.primeraActividad.toFixed(
                                                  1
                                              )}
                                              %
                                          </p>
                                      </div>
                                      <div className="p-4 rounded-lg bg-neutral-50">
                                          <p className="text-sm font-helvetica-w20-bold text-neutral-600">
                                              Media de Edad
                                          </p>
                                          <p className="text-2xl font-bold font-helvetica-w20-bold text-neutral-900">
                                              {detailsMetrics.mediaEdad}
                                          </p>
                                      </div>
                                  </div>
                              ) : (
                                  <p>No hay datos para mostrar.</p>
                              )
                          })()}
                </div>

                {/* Distribution by Age */}
                <div className="p-4 bg-white rounded-lg shadow-sm tablet:p-6">
                    <h2 className="mb-4 text-base font-semibold font-helvetica-w20-bold tablet:text-lg">
                        Distribución por Edad
                    </h2>
                    <div className="h-[250px] tablet:h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={getFilteredAgeGroups()}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 20,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="name"
                                    angle={-15}
                                    textAnchor="end"
                                />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey="value" fill="#ff6600" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Distribution by Gender */}
                <div className="p-4 bg-white rounded-lg shadow-sm tablet:p-6">
                    <h2 className="mb-4 text-base font-semibold font-helvetica-w20-bold tablet:text-lg">
                        Distribución por Género
                    </h2>
                    <div className="h-[250px] tablet:h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={getFilteredGenderDistribution()}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius="80%"
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                    labelLine={({
                                        cx,
                                        cy,
                                        midAngle,
                                        innerRadius,
                                        outerRadius,
                                        percent,
                                    }) =>
                                        percent === 0 ? null : (
                                            <polyline
                                                points={`
                    ${
                        cx +
                        (outerRadius + 10) *
                            Math.cos(-midAngle * (Math.PI / 180))
                    },
                    ${
                        cy +
                        (outerRadius + 10) *
                            Math.sin(-midAngle * (Math.PI / 180))
                    }
                    ${
                        cx +
                        (outerRadius + 20) *
                            Math.cos(-midAngle * (Math.PI / 180))
                    },
                    ${
                        cy +
                        (outerRadius + 20) *
                            Math.sin(-midAngle * (Math.PI / 180))
                    }
                `}
                                                stroke="#999"
                                                fill="none"
                                                strokeWidth={1}
                                            />
                                        )
                                    }
                                    label={({ name, value, percent }) =>
                                        percent !== 0
                                            ? `${name} ${(
                                                  percent * 100
                                              ).toFixed(0)}%`
                                            : null
                                    }
                                >
                                    {getFilteredGenderDistribution().map(
                                        (entry, index) => (
                                            <Cell
                                                key={`cell-${index}`}
                                                fill={
                                                    COLORS[
                                                        index % COLORS.length
                                                    ]
                                                }
                                            />
                                        )
                                    )}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
