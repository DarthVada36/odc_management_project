// Layout.jsx
import { Outlet, useLocation } from 'react-router-dom'
import Nav from '../components/Nav/Nav'
import Footer from '../components/Footer'
import { DashboardProvider } from '../context/DashboardContext'

const Layout = () => {
    const location = useLocation()
    const isDashboardRoute = location.pathname.includes('/dashboard')

    const content = (
        <div>
            <Nav />
            <Outlet className="h-[100vh] bg-blue-500" />
            <Footer />
        </div>
    )

    // Envolve the content with DashboardProvider only when we are in the dashboard route
    return isDashboardRoute ? (
        <DashboardProvider>{content}</DashboardProvider>
    ) : (
        content
    )
}

export default Layout
