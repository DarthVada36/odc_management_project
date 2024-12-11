import React, { useRef, useEffect } from 'react';
import EmailEditor from 'react-email-editor';

const EmailEditorTemplateComponent = ({ selectedTemplate, onSave, onSendEmail }) => {
  const editorRef = useRef(null);

  // Cargar la plantilla seleccionada
  useEffect(() => {
    if (selectedTemplate && editorRef.current) {
      editorRef.current.editor.loadDesign(selectedTemplate.design);
    }
  }, [selectedTemplate]);

  // Guardar plantilla
  const handleSave = () => {
    const name = prompt('Introduce el nombre de la plantilla:', selectedTemplate?.name || '');
    if (!name) return;

    editorRef.current.editor.saveDesign((design) => {
      onSave({ name, design });
    });
  };

  // Enviar email
  const handleSendEmail = () => {
    editorRef.current.editor.exportHtml((data) => {
      const { html } = data;
      const subject = prompt('Introduce el asunto del correo:');
      if (!subject) return;

      onSendEmail(subject, html);
    });
  };

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Editor de Plantillas</h2>
        <button className="text-red-500" onClick={() => onSave(null)}>
          ✕ Cerrar
        </button>
      </div>
      <div className="border border-gray-300 rounded overflow-hidden">
        <EmailEditor ref={editorRef} style={{ height: '500px' }} />
      </div>
      <div className="flex justify-between mt-4">
        <button className="bg-blue-600 text-white py-2 px-4 rounded" onClick={handleSave}>
          {selectedTemplate ? 'Actualizar Plantilla' : 'Guardar Plantilla'}
        </button>
        <button className="bg-green-600 text-white py-2 px-4 rounded" onClick={handleSendEmail}>
          Enviar Email
        </button>
      </div>
    </div>
  );
};

export default EmailEditorTemplateComponent;
