import { useState, useEffect } from 'react'
import './LogoIntro.css'

function LogoIntro({ onComplete }) {
    const [visible, setVisible] = useState(true)
    const [animating, setAnimating] = useState(true)

    useEffect(() => {
        // Logo holds for 1.2s, then shrinks and flies up.
        // At 2.5s, the logo is completely out of frame. We fade out the background
        // AND trigger onComplete so the header appears and the card slider begins cycling.
        const animationTimer = setTimeout(() => {
            setAnimating(false)
            if (onComplete) onComplete()
        }, 2500)

        // Completely unmount the intro component after the 0.3s fade-out completes
        const removeTimer = setTimeout(() => {
            setVisible(false)
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
