import React, { useState } from 'react'
import '../styles/components/Nav/Nav.scss'

const Nav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <header data-bs-theme="dark">
            <nav className="navbar navbar-dark navbar-expand-lg fixed-top">
                <div className="container-xxl">
                    <a
                        className="navbar-brand d-flex align-items-center"
                        href="/"
                    >
                        <img
                            src="#"
                            width="50"
                            height="50"
                            alt="Orange Digital Center"
                            className="me-3"
                        />
                        <div className="two-lined">
                            <span className="mb-0 h5">Orange</span>
                            <span className="mb-0 h5">Digital Center</span>
                        </div>
                    </a>

                    <button
                        className="navbar-toggler collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#mainNav"
                        aria-controls="mainNav"
                        aria-expanded={isMenuOpen}
                        aria-label="Toggle navigation"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div
                        className={`collapse navbar-collapse ${
                            isMenuOpen ? 'show' : ''
                        }`}
                        id="mainNav"
                    >
                        <ul className="mb-2 navbar-nav ms-auto mb-lg-0 align-items-center">
                            <li className="nav-item">
                                <a
                                    className="nav-link active"
                                    href="/cursos"
                                    aria-current="page"
                                >
                                    Cursos
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/dashboard">
                                    Dashboard
                                </a>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-primary btn-sm ms-lg-3">
                                    Login
                                </button>
                            </li>
                            <li className="nav-item">
                                <button
                                    className="btn nav-link nav-icon"
                                    aria-label="User profile"
                                >
                                    <img
                                        src="#"
                                        width="25"
                                        height="25"
                                        alt="Profile"
                                        className="rounded-circle"
                                    />
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
