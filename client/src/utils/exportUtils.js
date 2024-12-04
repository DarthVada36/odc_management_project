import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { svgToPngBase64 } from './svgUtils'; // Importar la función de conversión

export const exportToPDF = async (title, headers, data, fileName = 'export.pdf', svgLogo) => {
  const doc = new jsPDF();

  // Convertir el logo SVG a Base64 PNG
  const logoBase64 = await svgToPngBase64(svgLogo);

  // Agregar el logo al encabezado
  doc.addImage(logoBase64, 'PNG', 10, 10, 30, 15);

  // Título del encabezado
  doc.setFontSize(16);
  doc.text(title, 50, 20);

  // Línea decorativa
  doc.setDrawColor(255, 102, 0);
  doc.setLineWidth(1.5);
  doc.line(10, 28, 200, 28);

  // Generar la tabla
  doc.autoTable({
    head: [headers],
    body: data,
    startY: 35, // Tabla comienza después del encabezado
    headStyles: { fillColor: [255, 102, 0] }, // Fondo del encabezado
    bodyStyles: { textColor: [0, 0, 0] },
    alternateRowStyles: { fillColor: [245, 245, 245] }, // Filas alternas
  });

  // Guardar el PDF
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
