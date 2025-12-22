import React, { createContext, useContext, useState, useEffect } from 'react'

const GridContext = createContext()

export function GridProvider({ children }) {
    const [isGridVisible, setIsGridVisible] = useState(false)

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'g' || e.key === 'G') {
                setIsGridVisible(prev => !prev)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    return (
        <GridContext.Provider value={{ isGridVisible, setIsGridVisible }}>
            {children}
        </GridContext.Provider>
    )
}

export function useGrid() {
    const context = useContext(GridContext)
    if (!context) {
        throw new Error('useGrid must be used within a GridProvider')
    }
    return context
}
