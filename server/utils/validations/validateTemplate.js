export const validateTemplate = (design) => {
  if (!design || typeof design !== "object") {
    return { valid: false, message: "El diseño debe ser un objeto JSON válido." };
  }

  // Validar si tiene `body` y que `rows` sea un array
  if (!design.body || !Array.isArray(design.body.rows)) {
    return { valid: false, message: "El diseño debe incluir 'body.rows' como un array." };
  }

  // Validar cada fila y columna
  for (const row of design.body.rows) {
    if (!Array.isArray(row.cells) || !Array.isArray(row.columns)) {
      return { valid: false, message: "Cada fila debe tener 'cells' y 'columns' como arrays." };
    }

    // Validar cada columna
    for (const column of row.columns) {
      if (!Array.isArray(column.contents)) {
        return { valid: false, message: "Cada columna debe tener 'contents' como un array." };
      }

      // Validar cada contenido dentro de la columna
      for (const content of column.contents) {
        if (!content.type || typeof content.type !== "string") {
          return { valid: false, message: "Cada contenido debe tener un 'type' válido." };
        }

        // Validaciones específicas para el contenido
        if (content.type === "image" && (!content.values || !content.values.src || !content.values.src.url)) {
          return { valid: false, message: "Las imágenes deben incluir un 'src.url' válido." };
        }
      }
    }
  }

  return { valid: true };
};
