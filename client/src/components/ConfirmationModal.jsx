import React, { useEffect } from 'react';

const ConfirmationModal = ({
  title,
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
      className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'
      onClick={onClose}
    >
      <div
        className='relative w-full max-w-md p-6 bg-white border-2 border-gray-300 shadow-md sm:max-w-sm sm:px-4 '
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón de cierre */}
        <button
          className='absolute text-base font-black text-black top-2 right-2'
          onClick={onClose}
        >
          ✕
        </button>

        {/* Título del modal */}
        <h3 className='mb-4 text-lg font-bold text-black font-helvetica-w20-bold'>
          {title}
        </h3>

        {/* Mensaje */}
        <p className='mb-6 text-gray-700 font-helvetica-w20-bold'>{message}</p>

        {/* Botones */}
        <div className='flex justify-end gap-4'>
          {showButtons && (
            <>
              <button
                className='px-4 py-2 font-bold text-black transition-all duration-300 bg-white border-2 border-black font-helvetica-w20-bold hover:bg-black hover:text-white'
                onClick={onClose}
              >
                Cancelar
              </button>
              <button
                className='px-4 py-2 font-bold text-black transition-all duration-300 bg-primary font-helvetica-w20-bold hover:bg-black hover:text-white'
                onClick={onConfirm}
              >
                Confirmar
              </button>
            </>
          )}

          {!showButtons && (
            <button
              className='px-4 py-2 font-bold text-black transition-all duration-300 bg-primary font-helvetica-w20-bold hover:bg-black hover:text-white'
              onClick={onConfirm}
            >
              Confirm
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
