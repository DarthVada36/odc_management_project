import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.scss'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/Routes'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>
)
