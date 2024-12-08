import React, { useRef } from 'react';
import EmailEditor from 'react-email-editor';

const EmailEditorComponent = ({ onSendEmail, onClose, recipients }) => {
  const editorRef = useRef(null);

  const exportHtml = () => {
    editorRef.current.editor.exportHtml((data) => {
      const { html } = data;
      onSendEmail(html, recipients);
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl p-6 rounded-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Editor de correos</h2>
          <button
            onClick={onClose}
            className="text-black font-bold text-lg"
          >
            ✕
          </button>
        </div>
        {/* Contenedor del editor */}
        <EmailEditor ref={editorRef} style={{ height: '500px' }} />
        <div className="flex justify-end space-x-4 mt-4">
          <button
            onClick={exportHtml}
            className="bg-orange text-black px-4 py-2 rounded"
          >
            Enviar
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
