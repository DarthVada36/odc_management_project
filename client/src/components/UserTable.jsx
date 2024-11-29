import React from "react";

const UserTable = () => {
        //Datos simulados
        const users = [
            {id: 1, name: 'Alice', email: 'alice@example.com'},
            {id: 2, name: 'Jhon', email: 'jkhon@example.com'}
        ];
   
    return (
        <div className="bg-white shadow-md rounded p-4">
            <button>
                Crear nuevo usuario
            </button>
            <table>
                <thead>
                    <tr>

                    </tr>                                           
                </thead>
            </table>
        </div>
    )
}

export default UserTable;