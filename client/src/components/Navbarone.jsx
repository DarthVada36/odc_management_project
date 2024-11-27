import React from "react";
import "../styles/components/Navbarone.scss";

export const Navbar = () => {
  return (
    <header data-bs-theme="dark">
      <nav
        className="navbar navbar-expand-lg"
        aria-label="Global navigation - Adapted navbar"
      >
        <div className="container-xxl">
          {/* Orange brand logo */}
          <a className="navbar-brand me-lg-4" href="#">
            <img
              src="/assets/images/orange-logo.svg" // Actualiza la ruta según tu estructura
              width="50"
              height="50"
              alt="Orange - Back to Home"
              loading="lazy"
            />
          </a>

          {/* Burger menu */}
          <button
            className="navbar-toggler collapsed"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#global-header"
            aria-controls="global-header"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar links */}
          <div
            id="global-header"
            className="navbar-collapse collapse justify-content-between"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  href="#"
                  aria-current="page"
                >
                  Exportar datos
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Control panel
                </a>
              </li>
            </ul>

            {/* Profile icon */}
            <ul className="navbar-nav flex-row align-items-center">
              <li className="nav-item">
                <button
                  className="btn nav-link nav-icon"
                  onClick={() => alert("Cerrando sesión...")}
                  aria-label="Cerrar sesión"
                >
                  <img
                    src="/assets/images/profile-icon.png" // Ruta para el ícono del perfil
                    width="25"
                    height="25"
                    alt="Cerrar sesión"
                    loading="lazy"
                  />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
