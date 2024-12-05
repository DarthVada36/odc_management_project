import React from 'react';
import AccessForm from '../components/AccessForm'; 
import EventCard from '../components/EventCard';

const AccessAdminPage = () => {
  return (
    <div className="flex min-h-screen">
      {/* Imagen de la izquierda */}
      <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url(/img-login.png)' }}>
      </div>

      {/* Formulario de acceso a la derecha */}
      <div className="w-1/2 bg-white p-8">
     
                <AccessForm />
      </div>
      <div className="mt-8">
        <EventCard
          imageUrl="https://1000marcas.net/wp-content/uploads/2019/12/Orange-S.A.-logotipo.jpg"
          title="Título"
          description="Ejemplo de texto secundario."
        />
      </div>
    </div>
    
  );
};

export default AccessAdminPage;