import { useState, useEffect } from 'react'
import './LogoIntro.css'

function LogoIntro({ onComplete }) {
    const [visible, setVisible] = useState(true)
    const [animating, setAnimating] = useState(true)

    useEffect(() => {
        // Logo holds, then shrinks and flies up, reaching zero opacity right at 1800ms
        // (matches the logoIntro keyframe duration below) so the background fade starts
        // the instant the logo actually disappears instead of after a dead pause.
        const animationTimer = setTimeout(() => {
            setAnimating(false)
            if (onComplete) onComplete()
        }, 1800)

        // Completely unmount the intro component after the 0.4s fade-out completes
        const removeTimer = setTimeout(() => {
            setVisible(false)
        }, 2200)

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
