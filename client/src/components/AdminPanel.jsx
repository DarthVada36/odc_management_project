import React from "react";
import UserTable from './UserTable';
//import UserForm from './UserForm';

const AdminPanel = () => {
    
    return (
        <div className="grid grid-cols-3 gap-4 p-6">
            {/*Panel dividido en dos partes */}
            <div className="col-span-2">
            {/* Tabla para los usuarios */}
            <UserTable/>
            </div>      
            <div>
            {/*Formulario para añadir o editar usuarios */}
            <UserForm/>
            </div>      
        </div>

    );
    
};

export default AdminPanel;
