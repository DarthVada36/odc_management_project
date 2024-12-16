import React, { useRef, useEffect, useState } from 'react';
import EmailEditor from 'react-email-editor';
import EmailSendModal from './EmailSendModal';
import {
  getTemplates,
  saveTemplate,
  deleteTemplate,
  updateTemplate,
  getTemplateById,
} from '../services/templateService';
import { sendEmail } from '../services/emailService';

const EmailEditorComponent = ({ onClose, recipients = [], subject = '' }) => {
  const editorRef = useRef(null);
  const [templates, setTemplates] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailContent, setEmailContent] = useState('');
  const [emailSubject, setEmailSubject] = useState(subject);
  const [emailRecipients, setEmailRecipients] = useState(recipients);
  const [useBcc, setUseBcc] = useState(false);

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

  const handleSendEmail = () => {
    editorRef.current.editor.exportHtml(({ html }) => {
      if (!html) {
        alert('La plantilla no puede estar vacía.');
        return;
      }
      setEmailContent(html);
      setShowEmailModal(true);
    });
  };

  const handleSendFromModal = async ({ subject, recipients, useBcc }) => {
    try {
      console.log('Contenido del correo enviado:', emailContent);
      console.log('Datos del modal enviados:', { subject, recipients, useBcc });
  
      await sendEmail(recipients, subject, emailContent, useBcc);
      alert('Correo enviado con éxito.');
    } catch (error) {
      console.error('Error al enviar el correo:', error.response?.data || error.message);
      alert('Error al enviar el correo. Por favor, inténtalo de nuevo.');
    } finally {
      setShowEmailModal(false);
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-6xl p-6 rounded-md shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-orange">Editor de Plantillas</h2>
          <button onClick={onClose} className="text-black font-bold text-lg">
            ✕
          </button>
        </div>

        <div className="border border-gray-300 rounded-md">
          <EmailEditor ref={editorRef} style={{ height: '500px', width: '100%' }} />
        </div>

        <div className="flex flex-col md:flex-row md:justify-between space-y-4 md:space-y-0 md:space-x-4 mt-4">
          <button onClick={handleSaveTemplate} className="bg-green-500 text-black px-4 py-2 rounded">
            Guardar nueva plantilla
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

        <div className="flex justify-end space-x-4 mt-4">
          <button onClick={handleSendEmail} className="bg-orange-500 text-black px-4 py-2 rounded">
            Enviar correo
          </button>
        </div>

        {showEmailModal && (
          <EmailSendModal
            isOpen={showEmailModal}
            onClose={() => setShowEmailModal(false)}
            onSend={handleSendFromModal}
            initialRecipients={emailRecipients}
            initialSubject={emailSubject}
            initialUseBcc={useBcc}
          />
        )}
      </div>
    </div>
  );
};

export default EmailEditorComponent;
