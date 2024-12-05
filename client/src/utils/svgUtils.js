import { Canvg } from 'canvg';

/**
 * Convierte un contenido SVG en una imagen PNG en formato Base64.
 * @param {string} svgContent - El contenido SVG como cadena de texto.
 * @returns {Promise<string>} - Una promesa que resuelve a un PNG en formato Base64.
 */
export const svgToPngBase64 = async (svgContent) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  // Renderizar el SVG en el canvas
  const v = await Canvg.from(ctx, svgContent);
  v.start();

  // Exportar el canvas como imagen PNG en Base64
  return canvas.toDataURL('image/png');
};
