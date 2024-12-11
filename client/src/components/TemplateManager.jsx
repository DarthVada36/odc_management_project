import React, { useState, useEffect } from 'react';
import TemplateList from './TemplateList';
import EmailEditorTemplateComponent from './EmailEditorTemplateComponent';
import { getTemplates, saveTemplate, updateTemplate, deleteTemplate } from '../services/templateService';

const TemplateManager = () => {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      const data = await getTemplates();
      setTemplates(data);
    };
    fetchTemplates();
  }, []);

  const handleSave = async ({ name, design }) => {
    try {
      if (selectedTemplate) {
        const updatedTemplate = await updateTemplate(selectedTemplate.id, { name, design });
        setTemplates((prev) =>
          prev.map((template) => (template.id === updatedTemplate.id ? updatedTemplate : template))
        );
      } else {
        const newTemplate = await saveTemplate(name, design);
        setTemplates((prev) => [newTemplate, ...prev]);
      }
      setSelectedTemplate(null);
    } catch (error) {
      console.error('Error al guardar la plantilla:', error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTemplate(id);
      setTemplates((prev) => prev.filter((template) => template.id !== id));
    } catch (error) {
      console.error('Error al eliminar la plantilla:', error.message);
    }
  };

  const handleSendEmail = async (subject, html) => {
    // Aquí podrías llamar a tu servicio de envío de correos
    console.log(`Enviando email con asunto "${subject}" y HTML:`, html);
  };

  return (
    <div className="space-y-6">
      {!selectedTemplate ? (
        <TemplateList templates={templates} onEdit={setSelectedTemplate} onDelete={handleDelete} />
      ) : (
        <EmailEditorTemplateComponent
          selectedTemplate={selectedTemplate}
          onSave={handleSave}
          onSendEmail={handleSendEmail}
        />
      )}
    </div>
  );
};

export default TemplateManager;
