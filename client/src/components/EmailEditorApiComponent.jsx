import React, { useRef, useEffect, useState } from 'react';
import EmailEditor from 'react-email-editor';
import { getTemplates, saveTemplate } from '../services/unlayerService'; // Servicios de Unlayer
import { sendEmail } from '../services/emailService'; // Servicio para enviar correos
import { unlayerConfig } from '../../config';

const EmailEditorComponent = ({ onClose, recipients }) => {
  const editorRef = useRef(null);
  const [templates, setTemplates] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Obtener plantillas al cargar el componente
  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const templatesData = await getTemplates();
        setTemplates(templatesData);
      } catch (error) {
        console.error('Error al obtener plantillas:', error);
      }
    };

    fetchTemplates();
  }, []);

  // Guardar plantilla en Unlayer
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
        setIsSaving(false);
      } catch (error) {
        alert('Error al guardar la plantilla');
        setIsSaving(false);
      }
    });
  };

  // Cargar plantilla en el editor
  const handleLoadTemplate = (design) => {
    editorRef.current.editor.loadDesign(design);
  };

  // Exportar HTML y enviar correo
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
        setIsSending(false);
        onClose(); // Cierra el editor después del envío
      } catch (error) {
        alert('Error al enviar el correo');
        setIsSending(false);
      }
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-4xl p-6 rounded-md shadow-lg">
        {/* Encabezado */}
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

        {/* Contenedor del editor */}
        <div className="border border-gray-300 rounded-md">
          <EmailEditor
            ref={editorRef}
            options={{
              projectId: unlayerConfig.projectId,
            }}
            style={{ height: '500px', width: '100%' }}
          />
        </div>

        {/* Botones */}
        <div className="flex justify-between space-x-4 mt-4">
          <button
            onClick={handleSaveTemplate}
            className={`px-4 py-2 rounded ${
              isSaving ? 'bg-gray-400 text-white' : 'bg-blue-500 text-black'
            }`}
            disabled={isSaving}
          >
            {isSaving ? 'Guardando...' : 'Guardar plantilla'}
          </button>
          <select
            className="px-4 py-2 border rounded"
            onChange={(e) => {
              const template = templates.find((t) => t.id === e.target.value);
              if (template) handleLoadTemplate(template.design);
            }}
          >
            <option value="">Cargar plantilla...</option>
            {templates.map((template) => (
              <option key={template.id} value={template.id}>
                {template.name}
              </option>
            ))}
          </select>
          <button
            onClick={handleSendEmail}
            className={`px-4 py-2 rounded ${
              isSending
                ? 'bg-gray-400 text-white cursor-not-allowed'
                : 'bg-green-500 text-black'
            }`}
            disabled={isSending}
          >
            {isSending ? 'Enviando...' : 'Enviar correo'}
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
