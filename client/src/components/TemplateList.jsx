/* import React from 'react';

const TemplateList = ({ templates, onEdit, onDelete }) => {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Plantillas Guardadas</h2>
      <ul className="divide-y divide-gray-200">
        {templates.map((template) => (
          <li key={template.id} className="py-2 flex justify-between items-center">
            <span className="font-medium">{template.name}</span>
            <div className="flex space-x-2">
              <button
                className="bg-yellow-500 text-white py-1 px-3 rounded"
                onClick={() => onEdit(template)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 text-white py-1 px-3 rounded"
                onClick={() => onDelete(template.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TemplateList;
 */