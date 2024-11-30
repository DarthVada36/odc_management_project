import { Outlet } from 'react-router-dom';
import Nav from '../components/Nav/Nav';
import Footer from '../components/Footer';
import TestModal from '../components/TestModal'; // Importa el componente de prueba

const Layout = () => {
  return (
    <div>
      <Nav />

      {/* TestModal: Modal para pruebas */}
      <TestModal />
      <Outlet className='h-[100vh] bg-blue-500' />
      <Footer />
    </div>
  );
};

export default Layout;
