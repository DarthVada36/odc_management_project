import { Outlet } from 'react-router-dom'
import Nav from '../components/Nav/Nav'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar';     
import AdminPanel from '../components/AdminPanel'         

const Layout = () => {
    return (
        <div>
      <Nav />
      <div className="flex flex-col md:flex-row">
        {/*Barra lateral */}
        <Sidebar className="bg-black text-white p-4 md:w-1/4" />
        <div className="flex-1 bg-gray-100 p-6">
          <Outlet />
          <AdminPanel />
        </div>
      </div>
      <Footer />
    </div>
  )
}
export default Layout;
