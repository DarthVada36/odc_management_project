import React, { useState } from "react";
import UserTable from './UserTable';
import SearchBar from "./SearchBar";


const AdminPanel = () => {
  //Lista de usuarios o cursos
  const [users] = useState([
            {id: 1, name: 'Alice', email: 'alice@example.com'},
            {id: 2, name: 'Jhon', email: 'jkhon@example.com'},
            {id: 3, name: 'Alice', email: 'alice@example.com'},
            {id: 4, name: 'Jhon', email: 'jkhon@example.com'},
            {id: 5, name: 'Alice', email: 'alice@example.com'},
            {id: 6, name: 'Jhon', email: 'jkhon@example.com'},
            {id: 7, name: 'Alice', email: 'alice@example.com'},
            {id: 8, name: 'Jhon', email: 'jkhon@example.com'},
            {id: 9, name: 'Alice', email: 'alice@example.com'},
            {id: 10, name: 'Alice', email: 'alice@example.com'},
  ]);
    
   // Estado para los usuarios filtrados
   const [filteredUsers, setFilteredUsers] = useState(users);

   // Función para manejar la búsqueda
   const handleSearch = (searchTerm) => {
     const lowerCaseSearch = searchTerm.toLowerCase(); // Convierte el texto a minúsculas
     const filtered = users.filter(
       (user) =>
         user.name.toLowerCase().includes(lowerCaseSearch) ||
         user.email.toLowerCase().includes(lowerCaseSearch)
     );
     setFilteredUsers(filtered); // Actualiza el estado con los usuarios filtrados
   };
 
   // Retorno del componente principal
   return (
     <div className="flex-1 bg-white p-3">
       {/* Encabezado */}
       <div className="mb-6">
         <h1 className="text-orange text-2xl font-bold p-3">Gestión de usuarios</h1>
         {/* Línea naranja */}
         <div className="border-t-2 border-orange"></div>
         <p className="text-black text-center p-4">
           Total de usuarios: {filteredUsers.length}
         </p>
         {/* Añadir barra de búsqueda */}
         <SearchBar onSearch={handleSearch} />
       </div>
       {/* Tabla */}
       <UserTable users={filteredUsers} />
     </div>
   );
 };
 
 export default AdminPanel;