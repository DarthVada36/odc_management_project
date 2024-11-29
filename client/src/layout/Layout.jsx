import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav/Nav'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar';     
import AdminPanel from '../components/AdminPanel'         

const Layout = () => {
    return (
        <div>
            <Nav />
            <Outlet />
            {/* Barra lateral */}
            <Sidebar />
            {/* Panel administrativo */}
        <div className="flex-grow bg-gray-100 p-6">
        <AdminPanel />
        </div>
              
           
            <Footer />
        </div>
    )
}

export default Layout;
