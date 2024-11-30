// src/components/Nav/Nav.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className='bg-black text-orange'>
            <ul>
                <li>
                    <Link to="/">Inicio</Link>
                </li>
                <li>
                    <Link to="/access-admin">Acceder como Administrador</Link> {/* Agregar este enlace */}
                </li>
                <li>
                    <Link to="/new-admin">Crear Administrador</Link> {/* Agregar este enlace */}
                </li>
            </ul>
        </nav>
    );
};

export default Nav;
