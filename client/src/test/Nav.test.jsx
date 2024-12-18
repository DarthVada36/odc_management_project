//TEST Front
import '@testing-library/jest-dom';
import React from "react";
import {render, screen} from '@testing-library/react';
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect } from 'vitest';
import Nav from "../components/Nav/Nav";
import { AuthProvider } from "../context/AuthContext";

describe('Nav Component', () => {
    
    //Test para renderizar la imagen (Logo)
    test('renders logo image',() => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <AuthProvider>
                    <Nav/>
                </AuthProvider>
            </MemoryRouter>        
        );
        //Seleccionar imag dentro del componente
        const logoSvg = screen.getByTestId('logo-svg');
        

})