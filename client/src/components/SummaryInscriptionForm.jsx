import React from "react";

const Summary = ({ formData, minors, adult }) => {
  if (!formData || !Object.keys(formData).length) {
    return null; // No renderizar si no hay datos
  }

  return (
    <div className="w-full mt-8 p-4 border rounded-md bg-gray-50">
      <h3 className="font-bold text-xl mb-4 text-orange">Resumen de Inscripción</h3>
      <div className="flex flex-col gap-4">
        <p>
          <strong>Nombre Completo:</strong> {formData.fullname || "No proporcionado"}
        </p>
        <p>
          <strong>Email:</strong> {formData.email || "No proporcionado"}
        </p>
        <p>
          <strong>Género:</strong> {formData.gender || "No proporcionado"}
        </p>
        <p>
          <strong>Edad:</strong> {formData.age || "No proporcionado"}
        </p>
        <p>
          <strong>Primera Actividad:</strong>{" "}
          {formData.is_first_activity ? "Sí" : "No"}
        </p>
        <p>
          <strong>Recibe Newsletter:</strong>{" "}
          {formData.accepts_newsletter ? "Sí" : "No"}
        </p>

        {minors && minors.length > 0 && (
          <div>
            <h4 className="font-semibold mt-4">Menores:</h4>
            <ul>
              {minors.map((minor, index) => (
                <li key={index}>
                  {minor.name} - {minor.age} años
                </li>
              ))}
            </ul>
          </div>
        )}

        {adult && (
          <div>
            <h4 className="font-semibold mt-4">Adulto Acompañante:</h4>
            <p>
              <strong>Nombre:</strong> {adult.fullname}
            </p>
            <p>
              <strong>Email:</strong> {adult.email}
            </p>
            <p>
              <strong>Género:</strong> {adult.gender}
            </p>
            <p>
              <strong>Edad:</strong> {adult.age}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;
