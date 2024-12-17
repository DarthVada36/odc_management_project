import React from "react";
import { exportToPDF } from "../utils/exportUtils";

const Summary = ({ formData, minors, adult, courseTitle, handleSubmit }) => {
  const handleInscription = () => {
    if (typeof handleSubmit === "function") {
      handleSubmit();
    }
  };

  const handleExportPDF = async () => {
    const title = `Resumen de Inscripción: ${courseTitle || "Curso"}`;
    const headers = ["Campo", "Valor"];
    const data = [
      ["Nombre Completo", formData.fullname || "No proporcionado"],
      ["Email", formData.email || "No proporcionado"],
      ["Género", formData.gender || "No proporcionado"],
      ["Edad", formData.age || "No proporcionado"],
      ["Primera Actividad", formData.is_first_activity ? "Sí" : "No"],
      ["Recibe Newsletter", formData.accepts_newsletter ? "Sí" : "No"],
    ];

    if (minors.length > 0) {
      minors.forEach((minor, index) => {
        data.push([
          `Menor ${index + 1}`,
          `${minor.name || "No proporcionado"} - ${minor.age || "No proporcionado"} años`,
        ]);
      });
    }

    if (adult) {
      data.push(["Adulto Acompañante - Nombre", adult.fullname || "No proporcionado"]);
      data.push(["Adulto Acompañante - Email", adult.email || "No proporcionado"]);
      data.push(["Adulto Acompañante - Género", adult.gender || "No proporcionado"]);
      data.push(["Adulto Acompañante - Edad", adult.age || "No proporcionado"]);
    }

    try {
      await exportToPDF(title, headers, data, "resumen_inscripcion.pdf");
    } catch (error) {
      console.error("Error al exportar a PDF:", error);
    }
  };

  return (
    <div className="w-3/4 mb-10 mx-auto mt-8 p-6 border border-orange bg-white shadow-md">
      {/* Título del resumen */}
      <h2 className="font-bold text-2xl text-orange text-center mb-4">
        Resumen de tu inscripción
      </h2>
      <h3 className="font-semibold text-lg text-center mb-6">
        Curso: {courseTitle || "No especificado"}
      </h3>

      {/* Datos del adulto principal */}
      <div className="mb-6">
        <h4 className="font-semibold text-lg mb-2">Datos del titular:</h4>
        <p><strong>Nombre Completo:</strong> {formData.fullname || "No proporcionado"}</p>
        <p><strong>Email:</strong> {formData.email || "No proporcionado"}</p>
        <p><strong>Género:</strong> {formData.gender || "No proporcionado"}</p>
        <p><strong>Edad:</strong> {formData.age || "No proporcionado"}</p>
        <p>
          <strong>Primera Actividad:</strong>{" "}
          {formData.is_first_activity ? "Sí" : "No"}
        </p>
        <p>
          <strong>Recibe Newsletter:</strong>{" "}
          {formData.accepts_newsletter ? "Sí" : "No"}
        </p>
      </div>

      {/* Datos de los menores */}
      {minors.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-lg mb-2">Menores Inscritos:</h4>
          <ul>
            {minors.map((minor, index) => (
              <li key={index}>
                {minor.name} - {minor.age} años
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Datos del adulto acompañante */}
      {adult && (
        <div className="mb-6">
          <h4 className="font-semibold text-lg mb-2">Adulto Acompañante:</h4>
          <p><strong>Nombre:</strong> {adult.fullname || "No proporcionado"}</p>
          <p><strong>Email:</strong> {adult.email || "No proporcionado"}</p>
          <p><strong>Género:</strong> {adult.gender || "No proporcionado"}</p>
          <p><strong>Edad:</strong> {adult.age || "No proporcionado"}</p>
        </div>
      )}

      {/* Botones */}
      <div className="mt-8 border-t pt-4 text-center">
        <p className="mb-4">
          Si tus datos son correctos, pulsa en <strong>Inscribirse</strong> o descárgalos como PDF.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleInscription}
            className="bg-orange text-white px-6 py-2 rounded-md font-semibold hover:bg-orange-600 cursor-pointer"
          >
            Inscribirse
          </button>
          <button
            onClick={handleExportPDF}
            className="bg-orange text-white px-6 py-2 rounded-md font-semibold hover:bg-orange-600 cursor-pointer"
          >
            Descargar PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summary;
