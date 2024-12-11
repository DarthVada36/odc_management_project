// src/context/DashboardContext.jsx
import React, { createContext, useContext, useState } from 'react'

const DashboardContext = createContext()

export const DashboardProvider = ({ children }) => {
    const [activeComponent, setActiveComponent] = useState('dashboard')

    return (
        <DashboardContext.Provider
            value={{ activeComponent, setActiveComponent }}
        >
            {children}
        </DashboardContext.Provider>
    )
}

export const useDashboard = () => {
    const context = useContext(DashboardContext)
    if (!context) {
        throw new Error(
            'useDashboard debe usarse dentro de un DashboardProvider'
        )
    }
    return context
}
