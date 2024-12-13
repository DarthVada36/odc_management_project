import React, { useRef, useEffect, useState } from 'react';
import EmailEditor from 'react-email-editor';
import {
  getTemplates,
  saveTemplate,
  deleteTemplate,
  updateTemplate,
  getTemplateById,
} from '../services/templateService'; // Servicios del backend

const EmailEditorComponent = ({ onClose, onSendEmail, subject, recipients }) => {
  const editorRef = useRef(null);
  const [templates, setTemplates] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);

  // Obtener plantillas al cargar el componente
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setIsLoading(true);
        const templatesData = await getTemplates();
        setTemplates(templatesData);
      } catch (error) {
        console.error('Error al obtener plantillas:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  // Guardar nueva plantilla
  const handleSaveTemplate = () => {
    editorRef.current.editor.saveDesign(async (design) => {
      const templateName = prompt('Ingresa el nombre de la nueva plantilla:');
      if (!templateName) return;

      try {
        setIsSaving(true);
        await saveTemplate(templateName, design);
        alert('Plantilla guardada exitosamente');
        const updatedTemplates = await getTemplates();
        setTemplates(updatedTemplates);
      } catch (error) {
        console.error('Error al guardar la plantilla:', error);
      } finally {
        setIsSaving(false);
      }
    });
  };

  // Actualizar plantilla existente
  const handleUpdateTemplate = () => {
    if (!selectedTemplateId) {
      alert('Selecciona una plantilla para actualizar.');
      return;
    }

    editorRef.current.editor.saveDesign(async (design) => {
      try {
        await updateTemplate(selectedTemplateId, design);
        alert('Plantilla actualizada exitosamente');
        const updatedTemplates = await getTemplates();
        setTemplates(updatedTemplates);
      } catch (error) {
        console.error('Error al actualizar la plantilla:', error);
      }
    });
  };

  // Cargar plantilla en el editor
  const handleLoadTemplate = async () => {
    if (!selectedTemplateId) {
      alert('Selecciona una plantilla para cargar.');
      return;
    }

    try {
      const selectedTemplate = await getTemplateById(selectedTemplateId);
      editorRef.current.editor.loadDesign(selectedTemplate.design);
    } catch (error) {
      console.error('Error al cargar la plantilla:', error);
    }
  };

  // Eliminar plantilla
  const handleDeleteTemplate = async () => {
    if (!selectedTemplateId) {
      alert('Selecciona una plantilla para eliminar.');
      return;
    }

    const confirmDelete = window.confirm(
      '¿Estás seguro de que deseas eliminar esta plantilla?'
    );

    if (!confirmDelete) return;

    try {
      await deleteTemplate(selectedTemplateId);
      alert('Plantilla eliminada exitosamente');
      const updatedTemplates = await getTemplates();
      setTemplates(updatedTemplates);
      setSelectedTemplateId(null);
    } catch (error) {
      console.error('Error al eliminar la plantilla:', error);
    }
  };

  // Manejar envío de correo
  const handleSendEmail = () => {
    editorRef.current.editor.exportHtml((data) => {
      const { html } = data;
      if (!subject || recipients.length === 0) {
        alert('El asunto o los destinatarios no pueden estar vacíos.');
        return;
      }

      onSendEmail(html); // Enviar el HTML generado
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-6xl p-6 rounded-md shadow-lg">
        {/* Título y botón de cierre */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-orange">Editor de Plantillas</h2>
          <button onClick={onClose} className="text-black font-bold text-lg">
            ✕
          </button>
        </div>

        {/* Email Editor */}
        <div className="border border-gray-300 rounded-md">
          <EmailEditor ref={editorRef} style={{ height: '500px', width: '100%' }} />
        </div>

        {/* Opciones de CRUD */}
        <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0 md:space-x-4 mt-4">
          <button onClick={handleSaveTemplate} disabled={isSaving} className="bg-green-500 text-black px-4 py-2 rounded">
            {isSaving ? 'Guardando...' : 'Guardar nueva plantilla'}
          </button>
          <button onClick={handleUpdateTemplate} className="bg-blue-500 text-black px-4 py-2 rounded">
            Actualizar plantilla
          </button>
          <button onClick={handleDeleteTemplate} className="bg-red-500 text-black px-4 py-2 rounded">
            Eliminar plantilla
          </button>
          <button onClick={handleLoadTemplate} className="bg-yellow-500 text-black px-4 py-2 rounded">
            Cargar plantilla
          </button>
        </div>

        {/* Selector de plantillas */}
        <div className="mt-4">
          <select
            value={selectedTemplateId || ''}
            onChange={(e) => setSelectedTemplateId(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Selecciona una plantilla...</option>
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
        </div>

        {/* Botón para enviar correo */}
        <div className="mt-4 flex justify-end">
          <button onClick={handleSendEmail} className="bg-orange-500 text-black px-4 py-2 rounded">
            Enviar correo
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailEditorComponent;
