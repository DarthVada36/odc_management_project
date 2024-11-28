import React, { useState } from 'react'
import './Nav.module.scss'

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header data-bs-theme="dark">
            <nav className="navbar navbar-expand-lg">
                <div className="container-xxl">
                    <a className="navbar-brand" href="/">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 283.46 283.46"
                            className="me-3"
                        >
                            <defs>
                                <style>
                                    {`
                                       #logo-bg { fill: #ff7900; }
                                       #logo-text { fill: #fff; }
                                   `}
                                </style>
                            </defs>
                            <path id="logo-bg" d="M0 0h283.46v283.46H0z" />
                            <path
                                id="logo-text"
                                d="M111.2 256a23.23 23.23 0 0 1-13 3.92c-7.36 0-11.71-4.9-11.71-11.46 0-8.83 8.12-13.51 24.85-15.4v-2.19c0-2.87-2.18-4.53-6.2-4.53a11.76 11.76 0 0 0-9.61 4.53l-7-4q5.52-7.71 16.82-7.7c10.28 0 16 4.45 16 11.7v28.6h-9.2zm-14.55-8.3c0 2.65 1.67 5.13 4.68 5.13 3.27 0 6.44-1.36 9.62-4.16v-9.34c-9.7 1.23-14.3 3.72-14.3 8.39z"
                            />
                        </svg>
                        <div className="brand-titles">
                            <span className="orange-title">Orange</span>
                            <span className="white-title">Digital Center</span>
                        </div>
                    </a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        aria-controls="mainNavigation"
                        aria-expanded={isMenuOpen}
                        aria-label="Toggle navigation"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        id="mainNavigation"
                        className={`navbar-collapse collapse justify-content-end ${
                            isMenuOpen ? 'show' : ''
                        }`}
                    >
                        <ul className="navbar-nav align-items-center">
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
                                    Panel de control
                                </a>
                            </li>
                            <li className="nav-item ms-lg-3">
                                <button
                                    className="btn nav-icon"
                                    aria-label="Cerrar sesión"
                                >
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        className="logout-icon"
                                    >
                                        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                                    </svg>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Nav
