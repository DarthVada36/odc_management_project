import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

// Función para exportar a PDF con encabezado
export const exportToPDF = (
  title,
  headers,
  data,
  fileName = 'export.pdf'
) => {
  const doc = new jsPDF();
  const logo = 'data:image/png;base64,...'; // Sustituye con tu logo en formato Base64

  // Configuración de colores
  const primaryColor = [255, 102, 0]; // Naranja principal
  const textColor = [0, 0, 0]; // Negro

  // Agregar el logo
  doc.addImage(logo, 'PNG', 10, 10, 30, 15); // Posición (x, y) y tamaño (ancho, alto)

  // Agregar título del encabezado
  doc.setFontSize(16);
  doc.setTextColor(...textColor);
  doc.text(title, 50, 20); // Título centrado en el encabezado

  // Línea decorativa
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(1.5);
  doc.line(10, 28, 200, 28); // Línea horizontal

  // Generar la tabla con los datos
  doc.autoTable({
    head: [headers],
    body: data,
    startY: 35, // La tabla comienza después del encabezado
    headStyles: {
      fillColor: primaryColor, // Fondo del encabezado de la tabla
      textColor: [255, 255, 255], // Texto blanco
      fontSize: 12,
    },
    bodyStyles: {
      textColor: textColor,
      fontSize: 10,
    },
    alternateRowStyles: { fillColor: [245, 245, 245] }, // Filas alternas en gris claro
  });

  // Guardar el archivo
  doc.save(fileName);
};

// Función para exportar a Excel
export const exportToExcel = (
  sheetName,
  headers,
  data,
  fileName = 'export.xlsx'
) => {
  // Transformar los datos para Excel
  const worksheetData = [headers, ...data];
  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
  XLSX.writeFile(workbook, fileName);
};