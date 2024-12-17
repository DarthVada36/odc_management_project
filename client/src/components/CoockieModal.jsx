import React, { useState, useEffect } from "react";

const CookieModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const expirationTime = 4 * 60 * 60 * 1000; // 4 horas en milisegundos

  useEffect(() => {
    const cookieData = JSON.parse(localStorage.getItem("cookiesAccepted"));
    const currentTime = new Date().getTime();

    // Si no existe una decisión o ha expirado, muestra el modal
    if (!cookieData || currentTime > cookieData.expiration) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    saveDecision(true);
  };

  const handleReject = () => {
    saveDecision(false);
  };

  const saveDecision = (value) => {
    const expiration = new Date().getTime() + expirationTime;
    localStorage.setItem(
      "cookiesAccepted",
      JSON.stringify({ accepted: value, expiration })
    );
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-gray-100/95 shadow-xl w-[380px] p-6">
        {/* Imagen en la parte alta */}
        <div className="flex justify-center mb-4">
          <img src="/src/assets/Coockies-img.png" className="w-auto" alt="Cookies" />
        </div>

        {/* Separar SVG y botón de configuración */}
        <div className="flex items-center justify-between mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 283.46 283.46" className="w-6 h-6">
            <rect width="283.46" height="283.46" fill="#ff7900" />
            <path
              d="M111.2 256a23.23 23.23 0 0 1-13 3.92c-7.36 0-11.71-4.9-11.71-11.46 0-8.83 8.12-13.51 24.85-15.4v-2.19c0-2.87-2.18-4.53-6.2-4.53a11.76 11.76 0 0 0-9.61 4.53l-7-4q5.52-7.71 16.82-7.7c10.28 0 16 4.45 16 11.7v28.6h-9.2zm-14.55-8.3c0 2.65 1.67 5.13 4.68 5.13 3.27 0 6.44-1.36 9.62-4.16v-9.34c-9.7 1.23-14.3 3.72-14.3 8.39zM129.54 221.07l8.59-1.19.94 4.68c4.85-3.55 8.7-5.44 13.55-5.44 8.12 0 12.3 4.31 12.3 12.84v27.47h-10.37v-25.66c0-4.83-1.26-7-5-7-3.1 0-6.19 1.43-9.71 4.38v28.3h-10.3zM233.69 260.18c-11.63 0-18.57-7.47-18.57-20.45s7-20.61 18.4-20.61 18.15 7.25 18.15 20.08c0 .68-.08 1.36-.08 2h-26.27c.08 7.47 3.18 11.24 9.29 11.24 3.93 0 6.52-1.58 8.95-5l7.61 4.22c-3.35 5.58-9.37 8.52-17.48 8.52zm7.78-25.66c0-5.28-3-8.38-7.95-8.38-4.68 0-7.61 3-8 8.38z"
              fill="#fff"
            />
          </svg>
          <button className="text-gray-600 hover:text-black">
            ⚙️ Configurar opciones
          </button>
        </div>

        {/* Título y texto */}
        <h2 className="text-xl font-semibold mb-4">Bienvenido a Orange</h2>
        <p className="text-gray-700 text-sm mb-4">
          Utilizamos cookies propias y de terceros para analizar el uso del sitio
          web y mostrarte publicidad relacionada con tus preferencias sobre la base
          de un perfil elaborado a partir de tus hábitos de navegación (por ejemplo,
          páginas visitadas, clicks en contenidos, etc.).
        </p>
        <p className="text-gray-700 text-sm mb-6">
          Para más información consulta nuestra{" "}
          <a href="#" className="text-orange-500 hover:underline">
            política de cookies
          </a>
          .
        </p>

        {/* Botones de acción */}
        <div className="flex justify-between">
          <button
            className="bg-white/70 border-2 border-black text-black px-4 py-2 hover:bg-white"
            onClick={handleReject}
          >
            Rechazar todo
          </button>
          <button
            className="bg-orange text-black px-4 py-2 hover:border-2 hover:border-black"
            onClick={handleAccept}
          >
            Aceptar todo
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieModal;
