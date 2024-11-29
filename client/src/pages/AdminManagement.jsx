import React, { useState } from 'react';

const AdminManagement = () => {
     const [users, setUser] = useState([

        { name: 'Nombre', email: 'nombre@nombre.com', actions: ''},
        { name: 'Nombre', email: 'nombre@nombre.com', actions: ''},
        { name: 'Nombre', email: 'nombre@nombre.com', actions: ''},
        { name: 'Nombre', email: 'nombre@nombre.com', actions: ''},

    ]); 

    const handleEdit = (index) => {
        //Lógica para editar
    }
    const handleDelete = (index) => {
        //Lógica para eliminar
    }

    return (
        <div>
            <h2>Gestión de usuarios</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
            </table>

        </div>

    )
}
export default AdminManagement;