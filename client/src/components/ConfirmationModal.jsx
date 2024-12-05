import React, { useEffect } from 'react';

const ConfirmationModal = ({
  isOpen,
  onClose,
  message,
  onConfirm,
  showButtons = true,
}) => {
  useEffect(() => {
    if (isOpen && !showButtons) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose, showButtons]);

  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
      onClick={onClose}
    >
      <div
        className='bg-white border-2 border-gray-300 w-full max-w-md p-6 relative shadow-md sm:max-w-sm sm:px-4 '
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cierre */}
        <button
          className='absolute top-2 right-2 text-black font-black text-base'
          onClick={onClose}
        >
          ✕
        </button>

        {/* Título del modal */}
        <h3 className='text-lg font-bold mb-4 text-black'>Modal title</h3>

        {/* Mensaje */}
        <p className='text-gray-700 mb-6'>{message}</p>

        {/* Botones */}
        {showButtons && (
          <div className='flex justify-end gap-4'>
            <button
              className='border-2 border-black text-black px-4 py-2 font-bold hover:bg-gray-100'
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className='bg-primary text-black px-4 py-2 font-bold hover:bg-orange-600'
              onClick={onConfirm}
            >
              Confirm
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConfirmationModal;
