import React from "react";
import Navbar from "./components/Navbarone"; // Importamos el Navbar
import "./styles/main.scss"; // Aseguramos cargar los estilos globales

function App() {
  return (
    <div>
      {/* Renderizamos el Navbar */}
      <Navbar />
      
      {/* Contenido principal de la página */}
      <main className="container mt-5">
        <h1>Welcome to Orange Themed App</h1>
        <p>This is the main content of the app.</p>
      </main>
    </div>
  );
}

export default App;
