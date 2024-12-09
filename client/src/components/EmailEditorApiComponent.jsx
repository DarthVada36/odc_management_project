import React, { useRef, useState } from 'react';
import EmailEditor from 'react-email-editor';
import { editorConfig } from '../config';

const EmailEditorComponent = ({ onSendEmail, onClose, recipients }) => {
  const editorRef = useRef(null);
  const [isSending, setIsSending] = useState(false);

  const exportHtml = () => {
    if (!recipients || recipients.length === 0) {
      alert('Por favor, selecciona al menos un destinatario.');
      return;
    }

    setIsSending(true);
    editorRef.current.editor.exportHtml((data) => {
      const { html } = data;
      onSendEmail(html, recipients);
      setIsSending(false);
    });
  };

  const handleLoadEditor = () => {
    console.log('Editor cargado');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl p-6 rounded-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-orange">Editor de correos</h2>
          <button
            onClick={onClose}
            className="text-black font-bold text-lg"
            aria-label="Cerrar editor"
          >
            ✕
          </button>
        </div>
        <div className="border border-gray-300 rounded-md">
          <EmailEditor
            ref={editorRef}
            options={editorConfig}
            style={{ height: '500px', width: '100%' }}
            minHeight="500px"
            onLoad={handleLoadEditor}
          />
        </div>
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={exportHtml}
            className={`px-4 py-2 rounded ${
              isSending ? 'bg-gray-400 text-white cursor-not-allowed' : 'bg-orange text-black'
            }`}
            disabled={isSending}
          >
            {isSending ? 'Enviando...' : 'Enviar'}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-black px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailEditorComponent;
