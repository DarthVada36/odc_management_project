import React, { useRef, useEffect, useState } from 'react';
import EmailEditor from 'react-email-editor';
import axios from 'axios';
import { getTemplates, saveTemplate } from '../services/unlayerService'; // Servicios de Unlayer
import { sendEmail } from '../services/emailService'; // Servicio para enviar correos
import { unlayerConfig } from '../../config';

const EmailEditorApiComponent = ({ onClose, recipients }) => {
  const editorRef = useRef(null);
  const [templates, setTemplates] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isSending, setIsSending] = useState(false);

  // Inicialización del editor
  useEffect(() => {
    const initializeEditor = async () => {
      try {
        const { data } = await axios.post(
          'http://localhost:3000/api/unlayer/user',
          {
            userId: 'madridodc',
            name: 'Madrid ODC',
            email: 'madridodc@gmail.com',
          }
        );

        console.log('Respuesta del servidor (user data):', data);

        if (editorRef.current && document.getElementById('email-editor')) {
          editorRef.current.editor.init({
            id: 'email-editor',
            user: data.user,
            projectId: unlayerConfig.projectId,
          });
        } else {
          console.error('El editor o el contenedor no están disponibles.');
        }
      } catch (error) {
        console.error(
          'Error al inicializar el editor:',
          error.response?.data || error.message
        );
      }
    };

    initializeEditor();
  }, []);

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

  // Guardar plantilla
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
      } catch (error) {
        console.error('Error al guardar la plantilla:', error);
        alert('Error al guardar la plantilla');
      } finally {
        setIsSaving(false);
      }
    });
  };

  // Cargar plantilla
  const handleLoadTemplate = (design) => {
    if (!design || Object.keys(design).length === 0) {
      alert('El diseño de la plantilla está vacío o no es válido.');
      return;
    }

    editorRef.current.editor.loadDesign(design);
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
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='bg-white w-full max-w-6xl p-6 rounded-md shadow-lg'>
        <div className='flex justify-between items-center mb-4'>
          <h2 className='text-lg font-bold text-orange'>Editor de correos</h2>
          <button
            onClick={onClose}
            className='text-black font-bold text-lg'
            aria-label='Cerrar editor'
          >
            ✕
          </button>
        </div>
        <div className='border border-gray-300 rounded-md'>
          <EmailEditor
            id='email-editor'
            ref={editorRef}
            options={{
              projectId: unlayerConfig.projectId,
            }}
            style={{ height: '500px', width: '100%' }}
          />
        </div>
        <div className='flex justify-between space-x-4 mt-4'>
          <button onClick={handleSaveTemplate} disabled={isSaving}>
            {isSaving ? 'Guardando...' : 'Guardar plantilla'}
          </button>
          <select
            onChange={(e) => {
              const template = templates.find((t) => t.id === e.target.value);
              if (template) handleLoadTemplate(template.design);
            }}
          >
            <option value=''>Cargar plantilla...</option>
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
      </div>
    </div>
  );
};

export default EmailEditorApiComponent;