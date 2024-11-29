import React from "react";
import UserTable from './UserTable';

const AdminPanel = () => {
    
    return (
        <div>
            {/*Encabezado */}
            <div>
                <h1> Gestión de usuarios</h1>
                <p> Total de usuarios: </p>
            </div>
            {/* Tabla */}
            <UserTable/> 
        </div>

    );
    
};

export default AdminPanel;
