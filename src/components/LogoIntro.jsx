import { useState, useEffect } from 'react'
import './LogoIntro.css'

function LogoIntro({ onComplete }) {
    const [visible, setVisible] = useState(true)
    const [animating, setAnimating] = useState(true)

    useEffect(() => {
        // Logo holds for 30% of 4s (1.2s), then animates out
        const animationTimer = setTimeout(() => {
            setAnimating(false)
        }, 2500)

        // Remove intro after animation + fade out
        const removeTimer = setTimeout(() => {
            setVisible(false)
            if (onComplete) onComplete()
        }, 2800)

        return () => {
            clearTimeout(animationTimer)
            clearTimeout(removeTimer)
        }
    }, [onComplete])

    if (!visible) return null

    return (
        <div
            className={`logo-intro-container ${!animating ? 'fade-out' : ''}`}
        >
            <img
                src="/primary%20logo.svg"
                alt="Sophisticated Ignorance"
                className="logo-intro-image"
            />
        </div>
    )
}

export default LogoIntro
