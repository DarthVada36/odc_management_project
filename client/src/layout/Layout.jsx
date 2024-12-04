import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav/Nav';
import Footer from '../components/Footer';


const Layout = () => {
  return (
    <div>
      <Nav />
      <Outlet className='h-[100vh] bg-blue-500' />
      <Footer />
    </div>
  );
};

export default Layout;
