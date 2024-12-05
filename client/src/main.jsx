import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/index.css'
import { RouterProvider } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { router } from './routes/Routes'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </StrictMode>
)
