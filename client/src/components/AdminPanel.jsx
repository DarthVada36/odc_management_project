import React, { useState, useEffect } from "react";
import { getAllEnrollments, deleteEnrollmentById } from "../services/enrollmentServices.js";
import UserTable from './UserTable';
import SearchBar from "./SearchBar";


const AdminPanel = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [filteredEnrollments, setFilteredEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const data = await getAllEnrollments();
      setEnrollments(data);
      setFilteredEnrollments(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, []);

  // Función para manejar la búsqueda
  const handleSearch = (searchTerm) => {
    const lowerCaseSearch = searchTerm.toLowerCase(); // Convierte el texto a minúsculas
    const filtered = enrollments.filter(
      (enrollment) =>
        enrollment.fullname.toLowerCase().includes(lowerCaseSearch) ||
        enrollment.email.toLowerCase().includes(lowerCaseSearch)
    );
    setFilteredEnrollments(filtered); // Actualiza el estado con los usuarios filtrados
  };


  if (loading) {
    return <div>Cargando...</div>;
  }
  if (error) {
    return <div>Error al cargar los usuarios</div>;
  }

  return (
    <div className="flex-1 bg-white p-3">
      {/* Encabezado */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-orange text-2xl font-bold p-1">Gestión de Inscripciones</h1>
      </div>
      {/* Línea naranja   */}
      <div className="border-t-2 border-orange"></div>
      {/* Total Inscriptions and Search Bar */}
      <div className="flex justify-between items-center mb-4 ">
        <p className="text-black text-left p-8">
          Total de inscripciones: {filteredEnrollments.length}
        </p>
        {/* Añadir barra de búsqueda */}
        <div className="flex items-right">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>
      {/* Tabla */}
      <UserTable
        users={filteredEnrollments}
      />
    </div>
  );
};

export default AdminPanel;