import React, { useState } from 'react';

const AdminPage = () => {
    const [users, setUser] = useState([

        { name: 'Nombre', email: 'nombre@nombre.com', actions: ''},
        { name: 'Nombre', email: 'nombre@nombre.com', actions: ''},

    ]); 


    return (
        <div>
            <table>
                <h2>Gestión de usuarios</h2>
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
export default AdminPage;