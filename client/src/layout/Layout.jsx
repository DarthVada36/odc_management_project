import { Outlet } from 'react-router-dom'
<<<<<<< HEAD
import Nav from '../components/Nav'
=======
import Nav from '../components/Nav/Nav'
>>>>>>> 41813f909287e3925a427554d4fc3bb5f5db2fe9
import Footer from '../components/Footer'

const Layout = () => {
    return (
        <div>
            <Nav />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout
