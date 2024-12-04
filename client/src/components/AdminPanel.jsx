import React, { useState } from 'react';
import UserTable from './UserTable';
import SearchBar from './SearchBar';

const AdminPanel = () => {
  const [users] = useState([
    { id: 1, name: 'Alice', email: 'alice@example.com', role: 'Super Admin' },
    { id: 2, name: 'Jhon', email: 'jkhon@example.com', role: 'Admin' },
    { id: 3, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
    { id: 4, name: 'Jhon', email: 'jkhon@example.com', role: 'Admin' },
    { id: 5, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
    { id: 6, name: 'Jhon', email: 'jkhon@example.com', role: 'Admin' },
    { id: 7, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
    { id: 8, name: 'Jhon', email: 'jkhon@example.com', role: 'Admin' },
    { id: 9, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
    { id: 10, name: 'Alice', email: 'alice@example.com', role: 'Admin' },
  ]);
  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleSearch = (searchTerm) => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerCaseSearch) ||
        user.email.toLowerCase().includes(lowerCaseSearch)
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className='bg-white p-4'>
      <h1 className='text-orange text-2xl font-bold mb-4'>
        Gestión de Usuarios
      </h1>
      <SearchBar onSearch={handleSearch} />
      <UserTable
        users={filteredUsers}
        tableTitle='Listado de Usuarios'
        headers={['ID', 'Nombre', 'Email', 'Rol']}
      />
    </div>
  );
};

export default AdminPanel;
