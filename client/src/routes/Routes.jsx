import React from 'react';
import Layout from '../layout/Layout'
import AdminManagement from '../pages/AdminManagement';
import FormPage from '../pages/FormPage'
import { createBrowserRouter } from 'react-router-dom'



export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <FormPage />,
            },
            {
                path: '/',
                element: <AdminManagement />,
            },
            
        ],
    },
])

export default router;