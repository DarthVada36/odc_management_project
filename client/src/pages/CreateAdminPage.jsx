import React from 'react';
import CreateAdminForm from '../components/CreateAdminForm';

const CreateAdminPage = () => {
  return (
    <div className="flex min-h-screen">

    

      {/* Imagen izquierda */}

      <div className="w-1/2 bg-cover bg-center flex justify-center mb-10">
        <img src="/src/assets/orange-form.gif" alt="Formulario en movimiento" />
      </div>

        {/* Formulario acceso derecha */}
        <div className="w-1/2 bg-white p-8">

<CreateAdminForm />
</div>




    </div>
  );
};
export default CreateAdminPage;
