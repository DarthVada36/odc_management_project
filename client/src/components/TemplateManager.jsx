/* import React, { useState, useRef, useEffect } from 'react';
import EmailEditor from 'react-email-editor'; // Importamos el editor
import TemplateList from './TemplateList';
import { getTemplates, saveTemplate, updateTemplate, deleteTemplate } from '../services/templateService';

const TemplateManager = ({ recipients, onClose }) => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const editorRef = useRef(null); // Referencia al editor

  useEffect(() => {
    const fetchTemplates = async () => {
      const data = await getTemplates();
      setTemplates(data);
    };
    fetchTemplates();
  }, []);

  // Cargar plantilla seleccionada
  const handleEditTemplate = (template) => {
    setSelectedTemplate(template);
    setIsEditorOpen(true);
  };

  // Guardar o actualizar plantilla
  const handleSaveTemplate = () => {
    const name = prompt('Introduce el nombre de la plantilla:', selectedTemplate?.name || '');
    if (!name) return;

    editorRef.current.editor.saveDesign(async (design) => {
      try {
        if (selectedTemplate) {
          const updatedTemplate = await updateTemplate(selectedTemplate.id, { name, design });
          setTemplates((prev) =>
            prev.map((template) =>
              template.id === updatedTemplate.id ? updatedTemplate : template
            )
          );
        } else {
          const newTemplate = await saveTemplate(name, design);
          setTemplates((prev) => [newTemplate, ...prev]);
        }
        setIsEditorOpen(false);
        setSelectedTemplate(null);
      } catch (error) {
        console.error('Error al guardar la plantilla:', error.message);
        alert('Error al guardar la plantilla');
      }
    });
  };

  // Enviar email
  const handleSendEmail = () => {
    editorRef.current.editor.exportHtml(async (data) => {
      const { html } = data;
      const subject = prompt('Introduce el asunto del correo:');
      if (!subject) return;

      try {
        // Aquí llamarías a tu servicio de envío de correos
        console.log(`Enviando correo a: ${recipients}`);
        console.log(`Asunto: ${subject}`);
        console.log(`HTML: ${html}`);
        alert('Correo enviado con éxito');
        onClose();
      } catch (error) {
        console.error('Error al enviar el correo:', error.message);
        alert('Error al enviar el correo');
      }
    });
  };

  // Cerrar editor
  const handleCloseEditor = () => {
    setIsEditorOpen(false);
    setSelectedTemplate(null);
  };

  return (
    <div className="space-y-6">
      {!isEditorOpen ? (
        <TemplateList
          templates={templates}
          onEdit={handleEditTemplate}
          onDelete={async (id) => {
            await deleteTemplate(id);
            setTemplates((prev) => prev.filter((template) => template.id !== id));
          }}
        />
      ) : (
        <div className="bg-white shadow-md p-6 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              {selectedTemplate ? 'Editar Plantilla' : 'Crear Nueva Plantilla'}
            </h2>
            <button className="text-red-500" onClick={handleCloseEditor}>
              ✕ Cerrar
            </button>
          </div>
          <div className="border border-gray-300 rounded-md overflow-hidden">
            <EmailEditor ref={editorRef} />
          </div>
          <div className="flex justify-between mt-4">
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded"
              onClick={handleSaveTemplate}
            >
              Guardar Plantilla
            </button>
            <button
              className="bg-green-600 text-white py-2 px-4 rounded"
              onClick={handleSendEmail}
            >
              Enviar Email
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemplateManager;
 */