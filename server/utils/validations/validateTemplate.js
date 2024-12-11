export const validateTemplate = (design) => {
    if (!design || typeof design !== 'object') {
      return { valid: false, message: 'El diseño debe ser un objeto JSON válido.' };
    }
  
    if (!design.body || typeof design.body !== 'object') {
      return { valid: false, message: 'El diseño debe incluir un campo "body".' };
    }
  
    //Verificar otras propiedades clave
    if (!design.body.rows || !Array.isArray(design.body.rows)) {
      console.warn('Advertencia: El diseño no contiene filas (rows).');
    }
  
    return { valid: true };
  };
  