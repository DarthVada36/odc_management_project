import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModal'; // Asegúrate de que la ruta sea correcta

const TestModal = () => {
  const [modalData, setModalData] = useState({
    isOpen: false,
    message: '',
    showButtons: true,
  });

  const openModal = (message, showButtons = true) => {
    setModalData({ isOpen: true, message, showButtons });
  };

  const closeModal = () => {
    setModalData({ ...modalData, isOpen: false });
  };

  const handleConfirm = () => {
    console.log('Confirmado');
    closeModal();
  };

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Visualización del Modal</h1>
      <button
        className='bg-primary text-black px-4 py-2 font-bold  hover:bg-orange-600'
        onClick={() =>
          openModal('¿Estás seguro de realizar esta acción?', true)
        }
      >
        Abrir Modal con Botones
      </button>
      <button
        className='border-2 border-black text-black px-4 py-2 ml-4 font-bold hover:bg-gray-100'
        onClick={() => openModal('Acción completada con éxito', false)}
      >
        Abrir Modal Sin Botones
      </button>

      {/* El Modal */}
      <ConfirmationModal
        isOpen={modalData.isOpen}
        onClose={closeModal}
        message={modalData.message}
        showButtons={modalData.showButtons}
        onConfirm={handleConfirm}
      />
    </div>
  );
};

export default TestModal;
