import React, { useState } from "react";
import UserTable from './UserTable';
import SearchBar from "./SearchBar";


const AdminPanel = () => {
  //Lista de usuarios o cursos
  const [users] = useState([
            {id: 1, name: 'Alice', email: 'alice@example.com', role: 'Super Admin'},
            {id: 2, name: 'Jhon', email: 'jkhon@example.com', role: 'Admin'},
            {id: 3, name: 'Alice', email: 'alice@example.com', role: 'Admin'},
            {id: 4, name: 'Jhon', email: 'jkhon@example.com', role: 'Admin'},
            {id: 5, name: 'Alice', email: 'alice@example.com', role: 'Admin'},
            {id: 6, name: 'Jhon', email: 'jkhon@example.com', role: 'Admin'},
            {id: 7, name: 'Alice', email: 'alice@example.com' , role: 'Admin'},
            {id: 8, name: 'Jhon', email: 'jkhon@example.com' , role: 'Admin'},
            // {id: 9, name: 'Alice', email: 'alice@example.com' , role: 'Admin'},
            // {id: 10, name: 'Alice', email: 'alice@example.com' , role: 'Admin'},
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
     <div className="flex flex-col min-h-screen bg-white p-3">
       {/* Encabezado */}
       <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center">
         <h1 className="text-orange text-2xl font-bold p-1">Gestión de Inscripciones</h1>
        </div>
        {/* Línea naranja   */}
        <div className="border-t-2 border-orange mb-4"></div>
         {/* Total Inscriptions and Search Bar */}
         <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 ">
         <p className="text-black text-left mb-0 md:mb-0 p-8">
           Total de inscripciones: {filteredUsers.length}
         </p>
         {/* Añadir barra de búsqueda */}
         <div className="flex items-right md:1/3">
         <SearchBar onSearch={handleSearch} />
         </div>
       </div>
       {/* Tabla */}
       <div className="max-h-1/2 mt-2 overflow-y-auto max-w-full">
       <UserTable users={filteredUsers} />
       </div>
     </div>
   );
 };
 
 export default AdminPanel;