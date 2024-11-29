import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav/Nav'
import Footer from '../components/Footer'
import AdminManagement from '../pages/AdminManagement';
import Sidebar from '../components/Sidebar';     
import AdminPanel from './components/AdminPanel';         

const Layout = () => {
    return (
        <div>
            <Nav />
            <Outlet />
            <AdminManagement /> 
            {/* Barra lateral */}
            <Sidebar />
            {/* Panel administrativo */}
        <div className="flex-grow bg-gray-100 p-6">
        </div>
          <AdminPanel />    
            <Footer />
        </div>
    )
}

export default Layout;
