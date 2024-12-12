import React, { useRef, useEffect, useState } from 'react';
import EmailEditor from 'react-email-editor';
import {
  getTemplates,
  saveTemplate,
  getTemplateById,
  updateTemplate,
  deleteTemplate,
} from '../services/unlayerService'; // Servicios de Unlayer
import { sendEmail } from '../services/emailService'; // Servicio para enviar correos
import { unlayerConfig } from '../../config';

const EmailEditorApiComponent = ({ onClose, recipients }) => {
  const editorRef = useRef(null);
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Cargar plantillas al cargar el componente
  useEffect(() => {
    const fetchTemplatesList = async () => {
      try {
        const templatesData = await getTemplates();
        setTemplates(templatesData);
      } catch (error) {
        console.error('Error al obtener plantillas:', error);
      }
    };

    fetchTemplatesList();
  }, []);

  // Guardar nueva plantilla
  const handleSaveTemplate = () => {
    setIsSaving(true);

    editorRef.current.editor.saveDesign(async (design) => {
      const templateName = prompt('Ingresa el nombre de la plantilla:');
      if (!templateName) {
        setIsSaving(false);
        return;
      }

      try {
        await saveTemplate(templateName, design);
        alert('Plantilla guardada exitosamente');
        const templatesData = await getTemplates();
        setTemplates(templatesData);
      } catch (error) {
        console.error('Error al guardar la plantilla:', error);
        alert('Error al guardar la plantilla');
      } finally {
        setIsSaving(false);
      }
    });
  };

  // Cargar plantilla por ID
  const handleLoadTemplate = async (templateId) => {
    setIsLoading(true);
    try {
      const template = await getTemplateById(templateId);
      if (template.design) {
        editorRef.current.editor.loadDesign(template.design);
        setSelectedTemplate(template);
      } else {
        alert('El diseño de la plantilla está vacío.');
      }
    } catch (error) {
      console.error('Error al cargar la plantilla:', error);
      alert('Error al cargar la plantilla.');
    } finally {
      setIsLoading(false);
    }
  };

  // Actualizar plantilla seleccionada
  const handleUpdateTemplate = () => {
    if (!selectedTemplate) {
      alert('Por favor, selecciona una plantilla para actualizar.');
      return;
    }

    setIsSaving(true);
    editorRef.current.editor.saveDesign(async (design) => {
      try {
        await updateTemplate(selectedTemplate.id, selectedTemplate.name, design);
        alert('Plantilla actualizada exitosamente');
        const templatesData = await getTemplates();
        setTemplates(templatesData);
      } catch (error) {
        console.error('Error al actualizar la plantilla:', error);
        alert('Error al actualizar la plantilla');
      } finally {
        setIsSaving(false);
      }
    });
  };

  // Eliminar plantilla por ID
  const handleDeleteTemplate = async (templateId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta plantilla?')) {
      setIsLoading(true);
      try {
        await deleteTemplate(templateId);
        alert('Plantilla eliminada exitosamente');
        setTemplates((prevTemplates) =>
          prevTemplates.filter((template) => template.id !== templateId)
        );
      } catch (error) {
        console.error('Error al eliminar la plantilla:', error);
        alert('Error al eliminar la plantilla');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Enviar correo
  const handleSendEmail = () => {
    if (!recipients || recipients.length === 0) {
      alert('Por favor, selecciona al menos un destinatario.');
      return;
    }

    setIsSending(true);
    editorRef.current.editor.exportHtml(async (data) => {
      const { html } = data;
      const subject = prompt('Ingresa el asunto del correo:');

      if (!subject) {
        setIsSending(false);
        return;
      }

      try {
        await sendEmail(recipients, subject, html);
        alert('Correo enviado exitosamente');
        onClose();
      } catch (error) {
        console.error('Error al enviar el correo:', error);
        alert('Error al enviar el correo');
      } finally {
        setIsSending(false);
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-6xl p-6 rounded-md shadow-lg">
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
            options={{
              projectId: unlayerConfig.projectId,
            }}
            style={{ height: '500px', width: '100%' }}
          />
        </div>
        <div className="flex justify-between space-x-4 mt-4">
          <button onClick={handleSaveTemplate} disabled={isSaving}>
            {isSaving ? 'Guardando...' : 'Guardar plantilla'}
          </button>
          <button onClick={handleUpdateTemplate} disabled={isSaving}>
            {isSaving ? 'Guardando...' : 'Actualizar plantilla'}
          </button>
          <select
            onChange={(e) => handleLoadTemplate(e.target.value)}
            disabled={isLoading}
          >
            <option value="">Cargar plantilla...</option>
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
          <button onClick={handleSendEmail} disabled={isSending}>
            {isSending ? 'Enviando...' : 'Enviar correo'}
          </button>
          <button onClick={onClose}>Cancelar</button>
        </div>
        {selectedTemplate && (
          <button
            className="text-red-500 mt-4"
            onClick={() => handleDeleteTemplate(selectedTemplate.id)}
            disabled={isLoading}
          >
            Eliminar plantilla seleccionada
          </button>
        )}
      </div>
    </div>
  );
};

export default EmailEditorApiComponent;
