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
    Legend,
} from 'recharts'
import {
    Users,
    BookOpen,
    PercentIcon,
    TrendingUp,
    UserPlus,
} from 'lucide-react'
import { getAllCourses } from '../services/coursesServices'
import { getAllEnrollments } from '../services/enrollmentServices'

const MetricCard = ({ icon: Icon, title, value, color, subtitle }) => (
    <div className="p-4 bg-white rounded-lg shadow-sm tablet:p-6">
        <div className="flex items-center space-x-3 tablet:space-x-4">
            <div
                className={`p-2 tablet:p-3 rounded-full bg-opacity-10 ${color}`}
            >
                <Icon className={`h-5 w-5 tablet:h-6 tablet:w-6 ${color}`} />
            </div>
            <div>
                <p className="text-xs font-medium tablet:text-sm text-neutral-600">
                    {title}
                </p>
                <h3 className="text-lg font-bold tablet:text-2xl text-neutral-900">
                    {value}
                </h3>
                {subtitle && (
                    <p className="text-xs text-neutral-500">{subtitle}</p>
                )}
            </div>
        </div>
    </div>
)

const Select = ({ value, onChange, options, label }) => (
    <div className="flex flex-col gap-1">
        {label && <label className="text-sm text-neutral-600">{label}</label>}
        <select
            value={value}
            onChange={onChange}
            className="px-3 py-2 text-sm border rounded-lg border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
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
    const [dateRange, setDateRange] = useState('month')
    const [loading, setLoading] = useState(true)

    const dateRangeOptions = [
        { value: 'week', label: 'Última semana' },
        { value: 'month', label: 'Último mes' },
        { value: '6_months', label: 'Últimos 6 meses' },
    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const [courses, enrollments] = await Promise.all([
                    getAllCourses(),
                    getAllEnrollments(),
                ])

                // Calculate age groups including minors
                const ageGroups = [
                    { name: '< 14', value: 0 },
                    { name: '15-24', value: 0 },
                    { name: '25-54', value: 0 },
                    { name: '55+', value: 0 },
                    { name: 'NS/NC', value: 0 },
                ]

                // Calculate gender distribution
                const genderCounts = enrollments.reduce((acc, curr) => {
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

                // Calculate metrics by course
                const coursesMetrics = courses.map((course) => {
                    const courseEnrollments = enrollments.filter(
                        (e) => e.id_course === course.id
                    )
                    const firstTimeCount = courseEnrollments.filter(
                        (e) => e.is_first_activity
                    ).length

                    return {
                        id: course.id,
                        name: course.title,
                        total: courseEnrollments.length,
                        capacity: course.tickets,
                        occupancyRate:
                            (courseEnrollments.length / course.tickets) * 100,
                        firstTime: firstTimeCount,
                        date: course.date,
                    }
                })

                // Calculate first activity rate
                const firstTimeCount = enrollments.filter(
                    (e) => e.is_first_activity
                ).length
                const firstTimeRate =
                    (firstTimeCount / enrollments.length) * 100

                // Aggregate by days for the temporal evolution
                const dailyEnrollments = enrollments.reduce((acc, curr) => {
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
                    acc[date].total++
                    if (!acc[date].byCourse[curr.id_course]) {
                        acc[date].byCourse[curr.id_course] = 0
                    }
                    acc[date].byCourse[curr.id_course]++
                    return acc
                }, {})

                // Convert to array and sort
                const dailyEnrollmentsArray = Object.values(
                    dailyEnrollments
                ).sort((a, b) => new Date(a.date) - new Date(b.date))

                // Group ages
                enrollments.forEach((enrollment) => {
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
                })

                // Calculate occupancy rate
                const totalCapacity = courses.reduce(
                    (sum, course) => sum + course.tickets,
                    0
                )
                const enrollmentRate =
                    totalCapacity > 0
                        ? (enrollments.length / totalCapacity) * 100
                        : 0

                setMetrics({
                    totalCourses: courses.length,
                    totalEnrollments: enrollments.length,
                    ageGroups,
                    genderDistribution,
                    enrollmentRate,
                    coursesMetrics,
                    firstTimeRate,
                    dailyEnrollments: dailyEnrollmentsArray,
                })
            } catch (error) {
                console.error('Error fetching dashboard data:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const getFilteredEnrollments = () => {
        if (!metrics.dailyEnrollments.length) return []

        const now = new Date()
        let startDate = new Date()

        switch (dateRange) {
            case 'week':
                startDate.setDate(now.getDate() - 7)
                break
            case 'month':
                startDate.setMonth(now.getMonth() - 1)
                break
            case '6_months':
                startDate.setMonth(now.getMonth() - 6)
                break
            default:
                startDate.setMonth(now.getMonth() - 1)
        }

        return metrics.dailyEnrollments
            .filter((entry) => new Date(entry.date) >= startDate)
            .map((entry) => ({
                date: entry.date,
                inscripciones:
                    selectedCourse === 'all'
                        ? entry.total
                        : entry.byCourse[selectedCourse] || 0,
            }))
    }

    const COLORS = ['#ff6600', '#00a1e0', '#28a745', '#6c757d']

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p>Cargando métricas...</p>
            </div>
        )
    }

    return (
        <div className="flex-1 p-4 space-y-4 overflow-y-auto tablet:p-6 tablet:space-y-6 bg-neutral-100">
            <h1 className="text-xl font-bold tablet:text-2xl text-neutral-900">
                Dashboard
            </h1>

            {/* Main metrics */}
            <div className="grid grid-cols-2 gap-3 laptop:grid-cols-4 tablet:gap-4">
                <MetricCard
                    icon={BookOpen}
                    title="Cursos Activos"
                    value={metrics.totalCourses}
                    color="text-primary bg-primary"
                />
                <MetricCard
                    icon={Users}
                    title="Inscripciones"
                    value={metrics.totalEnrollments}
                    color="text-secondary bg-secondary"
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

            {/* Graphs */}
            <div className="grid grid-cols-1 gap-4 laptop:grid-cols-2 tablet:gap-6">
                {/* Distribution by Age */}
                <div className="p-4 bg-white rounded-lg shadow-sm tablet:p-6">
                    <h2 className="mb-4 text-base font-semibold tablet:text-lg">
                        Distribución por Edad
                    </h2>
                    <div className="h-[250px] tablet:h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={metrics.ageGroups}
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
                    <h2 className="mb-4 text-base font-semibold tablet:text-lg">
                        Distribución por Género
                    </h2>
                    <div className="h-[250px] tablet:h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={metrics.genderDistribution}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius="80%"
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                    label={({ name, percent }) =>
                                        `${name} ${(percent * 100).toFixed(0)}%`
                                    }
                                >
                                    {metrics.genderDistribution.map(
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

                {/* Evolution of Enrollments */}
                <div className="p-4 bg-white rounded-lg shadow-sm tablet:p-6">
                    <div className="flex flex-col gap-4 mb-4 tablet:flex-row tablet:items-center tablet:justify-between">
                        <h2 className="text-base font-semibold tablet:text-lg">
                            Evolución de Inscripciones
                        </h2>
                        <div className="flex flex-col gap-2 tablet:flex-row tablet:gap-4">
                            <Select
                                value={selectedCourse}
                                onChange={(e) =>
                                    setSelectedCourse(e.target.value)
                                }
                                options={[
                                    { value: 'all', label: 'Todos los cursos' },
                                    ...metrics.coursesMetrics.map((course) => ({
                                        value: course.id,
                                        label: course.name,
                                    })),
                                ]}
                                label="Curso"
                            />
                            <Select
                                value={dateRange}
                                onChange={(e) => setDateRange(e.target.value)}
                                options={dateRangeOptions}
                                label="Periodo"
                            />
                        </div>
                    </div>
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
                    <div className="flex flex-col gap-4 mb-4 tablet:flex-row tablet:items-center tablet:justify-between">
                        <h2 className="text-base font-semibold tablet:text-lg">
                            Detalles del Curso
                        </h2>
                        <Select
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                            options={[
                                { value: 'all', label: 'Todos los cursos' },
                                ...metrics.coursesMetrics.map((course) => ({
                                    value: course.id.toString(),
                                    label: course.name,
                                })),
                            ]}
                            label="Seleccionar curso"
                        />
                    </div>
                    {selectedCourse === 'all' ? (
                        // View general of all courses
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-neutral-50">
                                <p className="text-sm text-neutral-600">
                                    Total Cursos
                                </p>
                                <p className="text-2xl font-bold text-neutral-900">
                                    {metrics.coursesMetrics.length}
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-neutral-50">
                                <p className="text-sm text-neutral-600">
                                    Capacidad Total
                                </p>
                                <p className="text-2xl font-bold text-neutral-900">
                                    {metrics.coursesMetrics.reduce(
                                        (sum, course) => sum + course.capacity,
                                        0
                                    )}
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-neutral-50">
                                <p className="text-sm text-neutral-600">
                                    Total Inscritos
                                </p>
                                <p className="text-2xl font-bold text-neutral-900">
                                    {metrics.coursesMetrics.reduce(
                                        (sum, course) => sum + course.total,
                                        0
                                    )}
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-neutral-50">
                                <p className="text-sm text-neutral-600">
                                    Media Ocupación
                                </p>
                                <p className="text-2xl font-bold text-neutral-900">
                                    {`${(
                                        metrics.coursesMetrics.reduce(
                                            (sum, course) =>
                                                sum + course.occupancyRate,
                                            0
                                        ) / metrics.coursesMetrics.length
                                    ).toFixed(1)}%`}
                                </p>
                            </div>
                        </div>
                    ) : (
                        // Vista detallada de un curso específico
                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg bg-neutral-50">
                                <p className="text-sm text-neutral-600">
                                    Capacidad Total
                                </p>
                                <p className="text-2xl font-bold text-neutral-900">
                                    {metrics.coursesMetrics.find(
                                        (c) =>
                                            c.id.toString() === selectedCourse
                                    )?.capacity || 0}
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-neutral-50">
                                <p className="text-sm text-neutral-600">
                                    Inscritos
                                </p>
                                <p className="text-2xl font-bold text-neutral-900">
                                    {metrics.coursesMetrics.find(
                                        (c) =>
                                            c.id.toString() === selectedCourse
                                    )?.total || 0}
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-neutral-50">
                                <p className="text-sm text-neutral-600">
                                    Ocupación
                                </p>
                                <p className="text-2xl font-bold text-neutral-900">
                                    {`${
                                        metrics.coursesMetrics
                                            .find(
                                                (c) =>
                                                    c.id.toString() ===
                                                    selectedCourse
                                            )
                                            ?.occupancyRate.toFixed(1) || 0
                                    }%`}
                                </p>
                            </div>
                            <div className="p-4 rounded-lg bg-neutral-50">
                                <p className="text-sm text-neutral-600">
                                    Primera Actividad
                                </p>
                                <p className="text-2xl font-bold text-neutral-900">
                                    {`${(
                                        ((metrics.coursesMetrics.find(
                                            (c) =>
                                                c.id.toString() ===
                                                selectedCourse
                                        )?.firstTime || 0) /
                                            (metrics.coursesMetrics.find(
                                                (c) =>
                                                    c.id.toString() ===
                                                    selectedCourse
                                            )?.total || 1)) *
                                        100
                                    ).toFixed(1)}%`}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
export default AdminDashboard
