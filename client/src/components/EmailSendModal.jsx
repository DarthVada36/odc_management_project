import React, { useState } from 'react';

const EmailSendModal = ({
  isOpen,
  onClose,
  onSend,
  initialRecipients = [],
  initialSubject = '',
  initialUseBcc = false,
}) => {
  const [recipients, setRecipients] = useState(initialRecipients);
  const [subject, setSubject] = useState(initialSubject);
  const [useBcc, setUseBcc] = useState(initialUseBcc);

  if (!isOpen) return null;

  const handleSend = () => {
    if (!subject.trim()) {
      alert('El asunto no puede estar vacío.');
      return;
    }
    if (recipients.length === 0) {
      alert('Debe haber al menos un destinatario.');
      return;
    }
  
    // Verifica los datos enviados
    console.log('Datos enviados desde el modal:', {
      subject,
      recipients,
      useBcc,
    });
  
    onSend({ subject, recipients, useBcc }); // Pasa todos los datos al controlador
  };
  

  return (
    <div
      className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
      onClick={onClose}
    >
      <div
        className='bg-white border-2 border-gray-300 w-full max-w-md p-6 relative shadow-md sm:max-w-sm sm:px-4'
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
        <h3 className='text-lg font-bold mb-4 text-black'>Enviar correo</h3>

        {/* Asunto */}
        <div className='mb-4'>
          <label className='text-gray-700 font-bold mb-2 block'>
            Asunto del correo:
          </label>
          <input
            type='text'
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className='w-full px-3 py-2 border rounded text-gray-800'
            placeholder='Ingresa el asunto'
          />
        </div>

        {/* Destinatarios */}
        <div className='mb-4'>
          <label className='text-gray-700 font-bold mb-2 block'>
            Destinatarios:
          </label>
          <textarea
            value={recipients.join(', ')}
            onChange={(e) =>
              setRecipients(e.target.value.split(',').map((email) => email.trim()))
            }
            className='w-full px-3 py-2 border rounded text-gray-800'
            rows={4}
            placeholder='Ingresa los correos separados por comas'
          />
        </div>

        {/* Checkbox para CCO */}
        <div className='flex items-center gap-2 mb-4'>
          <input
            type='checkbox'
            id='bccToggle'
            checked={useBcc}
            onChange={(e) => setUseBcc(e.target.checked)}
          />
          <label htmlFor='bccToggle' className='text-gray-700'>
            Enviar como copia oculta (CCO)
          </label>
        </div>

        {/* Botones */}
        <div className='flex justify-end gap-4'>
          <button
            className='border-2 border-black text-black px-4 py-2 font-bold hover:bg-gray-100'
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className='bg-primary text-black px-4 py-2 font-bold hover:bg-orange-600'
            onClick={handleSend}
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailSendModal;
