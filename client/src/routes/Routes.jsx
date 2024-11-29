//import React from 'react';
import Layout from '../layout/Layout'
import FormPage from '../pages/FormPage'
import { createBrowserRouter } from 'react-router-dom'
import AdminPage from '../pages/AdminPage';


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/',
                element: <FormPage />,
            },
            { //Admin page.
                path: '/admin',
                element: <AdminPage />,
            } 
        ],
    },
])

export default router;