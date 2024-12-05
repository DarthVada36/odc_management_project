import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { svgToPngBase64 } from './svgUtils'; // Importar la función de conversión
import logoSvg from '@/assets/orange-logo.svg?raw';

export const exportToPDF = async (title, headers, data, fileName = 'export.pdf') => {
  try {
    const doc = new jsPDF();

    // Convertir el SVG a una imagen PNG Base64
    const logoBase64 = await svgToPngBase64(logoSvg);

    // Agregar el logo al PDF
    doc.addImage(logoBase64, 'PNG', 10, 10, 30, 15);

    // Agregar título al encabezado
    doc.setFontSize(18);
    doc.setTextColor(40, 40, 40); // Color gris oscuro
    doc.text(title, 50, 20);

    // Línea decorativa
    doc.setDrawColor(255, 102, 0); // Color naranja
    doc.setLineWidth(1.5);
    doc.line(10, 40, 200, 40);

    // Agregar la tabla
    doc.autoTable({
      head: [headers],
      body: data,
      startY: 50, // La tabla comienza debajo del encabezado
      headStyles: {
        fillColor: [255, 102, 0], // Fondo del encabezado (naranja)
        textColor: [255, 255, 255], // Texto blanco
        fontStyle: 'bold',
      },
      bodyStyles: {
        textColor: [0, 0, 0], // Texto negro
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240], // Color gris claro para filas alternas
      },
      styles: {
        fontSize: 10, // Ajusta el tamaño de la fuente en la tabla
        cellPadding: 4, // Espaciado dentro de las celdas
      },
    });

    // Guardar el archivo PDF
    doc.save(fileName);
  } catch (error) {
    console.error('Error al generar el PDF:', error);
  }
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
