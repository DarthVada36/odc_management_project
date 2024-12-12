import Template from '../models/templateModel.js';
import { validateTemplate } from '../utils/validations/validateTemplate.js';

// Obtener todas las plantillas
export const getTemplates = async (req, res) => {
  try {
    const templates = await Template.findAll({
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(templates);
  } catch (error) {
    console.error('Error al obtener plantillas:', error.message);
    res.status(500).json({ message: 'Error al obtener plantillas' });
  }
};

// Crear una nueva plantilla
export const saveTemplate = async (req, res) => {
  const { name, design } = req.body;

  if (!name || !design) {
    return res.status(400).json({ message: 'Faltan parámetros requeridos' });
  }

  // Validar la plantilla
  const { valid, message } = validateTemplate(design);
  if (!valid) {
    return res.status(400).json({ message });
  }

  try {
    const newTemplate = await Template.create({
      name,
      design,
    });
    res.status(201).json(newTemplate);
  } catch (error) {
    console.error('Error al guardar plantilla:', error.message);
    res.status(500).json({ message: 'Error al guardar plantilla' });
  }
};

// Eliminar una plantilla
export const deleteTemplate = async (req, res) => {
  const { id } = req.params;

  try {
    const template = await Template.findByPk(id);

    if (!template) {
      return res.status(404).json({ message: 'Plantilla no encontrada' });
    }

    await template.destroy();
    res.status(200).json({ message: 'Plantilla eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar plantilla:', error.message);
    res.status(500).json({ message: 'Error al eliminar plantilla' });
  }
};

// Actualizar una plantilla
export const updateTemplate = async (req, res) => {
  const { id } = req.params;
  const { name, design } = req.body;

  if (!name && !design) {
    return res.status(400).json({ message: 'Debes proporcionar al menos un campo para actualizar.' });
  }

  try {
    const template = await Template.findByPk(id);

    if (!template) {
      return res.status(404).json({ message: 'Plantilla no encontrada.' });
    }

    // Validar el diseño si se incluye en la actualización
    if (design) {
      const { valid, message } = validateTemplate(design);
      if (!valid) {
        return res.status(400).json({ message });
      }
    }

    // Actualizar solo los campos proporcionados
    if (name) template.name = name;
    if (design) template.design = design;

    await template.save();
    res.status(200).json(template);
  } catch (error) {
    console.error('Error al actualizar la plantilla:', error.message);
    res.status(500).json({ message: 'Error al actualizar la plantilla.' });
  }
};

// Obtener una plantilla por su ID
export const getTemplateById = async (req, res) => {
  const { id } = req.params;

  try {
    const template = await Template.findByPk(id);

    if (!template) {
      return res.status(404).json({ message: 'Plantilla no encontrada' });
    }

    res.status(200).json(template);
  } catch (error) {
    console.error('Error al obtener la plantilla:', error.message);
    res.status(500).json({ message: 'Error al obtener la plantilla' });
  }
};
