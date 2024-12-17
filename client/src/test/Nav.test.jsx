//TEST Front
import React from "react";
import {render, screen} from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";
import { describe, test, expect } from 'vitest';
import Nav from "../components/Nav/Nav";

describe('Nav Component', () => {
    //Test para renderizar los enlaces
    test('renders menu links', () => {
        render(
            <BrowserRouter>
            <Nav/>
            </BrowserRouter>
        );
        
        //Verificar que existe un enlace con el texto "Panel de administrador"
        const adminLink = screen.getByText(/Panel de administrador/i);
        expect(adminLink).toBeInTheDocument();
    });

    //Test para renderizar la imagen (Logo)
    test('renders logo image',() => {
        
    }

    )

})