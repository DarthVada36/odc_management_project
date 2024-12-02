import React from 'react';
import Layout from '../layout/Layout'
import FormPage from '../pages/FormPage'
import { createBrowserRouter } from 'react-router-dom'
import DashboardPage from '../pages/DashboardPage'



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
                path: 'dashboard',
                element: <DashboardPage/>,
            },
            
        ],
    },
])

export default router;