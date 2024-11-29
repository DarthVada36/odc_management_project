import React from 'react';
import Layout from '../layout/Layout'
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
            
        ],
    },
])

export default router;