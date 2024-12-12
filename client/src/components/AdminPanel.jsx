import React, { useState, useEffect } from 'react';
import { getAllEnrollments } from '../services/enrollmentServices.js';
import UserTable from './UserTable';
import SearchBar from './SearchBar';
import EmailEditorComponent from './EmailEditorComponent.jsx';

const AdminPanel = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [filteredEnrollments, setFilteredEnrollments] = useState([]);
  const [showEmailEditor, setShowEmailEditor] = useState(false);
  const [selectedRecipients, setSelectedRecipients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEnrollments = async () => {
    try {
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

  const handleSearch = (searchTerm) => {
    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = enrollments.filter(
      (enrollment) =>
        enrollment.fullname.toLowerCase().includes(lowerCaseSearch) ||
        enrollment.email.toLowerCase().includes(lowerCaseSearch)
    );
    setFilteredEnrollments(filtered);
  };

  const handleOpenEmailEditor = (recipients) => {
    setSelectedRecipients(recipients);
    setShowEmailEditor(true);
  };

  const handleCloseEmailEditor = () => {
    setShowEmailEditor(false);
  };

  return (
    <div className='flex flex-col min-h-screen bg-white p-4'>
      <div className='flex justify-between items-center mb-4'>
        <h1 className='text-orange text-2xl font-bold'>Gestión de Inscripciones</h1>
        <SearchBar onSearch={handleSearch} />
      </div>
      <UserTable
        users={filteredEnrollments}
        onSendEmail={handleOpenEmailEditor}
      />
      {showEmailEditor && (
        <EmailEditorComponent
          onClose={handleCloseEmailEditor}
          recipients={selectedRecipients}
        />
      )}
    </div>
  );
};

export default AdminPanel;
