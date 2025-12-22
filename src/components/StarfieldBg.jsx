import { useEffect, useRef } from 'react'
import './StarfieldBg.css'

const StarfieldBg = () => {
    const canvasRef = useRef(null)
    const animationRef = useRef(null)
    const starsRef = useRef([])

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')

        // Super-sample for crisp rendering
        const baseDpr = window.devicePixelRatio || 1
        const dpr = baseDpr * 2

        let currentWidth = 0
        let currentHeight = 0
        let prevWidth = window.innerWidth
        let prevHeight = window.innerHeight

        const setCanvasSize = () => {
            const width = window.innerWidth
            const height = window.innerHeight

            // Only resize if dimensions changed
            if (width === currentWidth && height === currentHeight) return

            // Scale star positions proportionally when window size changes
            if (starsRef.current.length > 0 && (prevWidth !== width || prevHeight !== height)) {
                const scaleX = width / prevWidth
                const scaleY = height / prevHeight
                starsRef.current.forEach(star => {
                    star.x *= scaleX
                    star.y *= scaleY
                })
            }

            prevWidth = width
            prevHeight = height
            currentWidth = width
            currentHeight = height

            canvas.style.width = width + 'px'
            canvas.style.height = height + 'px'
            canvas.width = Math.floor(width * dpr)
            canvas.height = Math.floor(height * dpr)

            ctx.setTransform(1, 0, 0, 1, 0, 0)
            ctx.scale(dpr, dpr)
            ctx.imageSmoothingEnabled = true
            ctx.imageSmoothingQuality = 'high'
        }
        // Initial set
        setCanvasSize()

        // Initialize stars once
        const initWidth = window.innerWidth
        const initHeight = window.innerHeight
        const goldColors = ['#D6B36B', '#A37C3D', 'rgba(242,210,155,0.85)', '#C49A6C', '#B8860B']
        const numFlakes = 200

        starsRef.current = Array.from({ length: numFlakes }).map(() => ({
            x: Math.random() * initWidth,
            y: Math.random() * initHeight,
            size: Math.random() * 1.5 + 0.3,
            color: goldColors[Math.floor(Math.random() * goldColors.length)],
            baseBrightness: Math.random() * 0.3 + 0.1,
            shimmerSpeed: Math.random() * 0.003 + 0.001,
            shimmerOffset: Math.random() * Math.PI * 2,
            driftX: (Math.random() - 0.5) * 0.02,
            driftY: (Math.random() - 0.5) * 0.01
        }))


        let time = 0

        const animate = () => {
            animationRef.current = requestAnimationFrame(animate)
            time += 16

            // Check and update size EVERY FRAME before drawing
            setCanvasSize()

            const width = window.innerWidth
            const height = window.innerHeight

            // Base layer: Onyx radial gradient
            // Dynamic center and radius based on current dimensions
            const gradient = ctx.createRadialGradient(
                width / 2, height * 0.45, 0,
                width / 2, height * 0.45, Math.max(width, height) * 0.7
            )
            gradient.addColorStop(0, '#141414')
            gradient.addColorStop(0.55, '#050506')
            gradient.addColorStop(1, '#000000')
            ctx.fillStyle = gradient
            ctx.fillRect(0, 0, width, height)

            // Draw gold micro-flakes with shimmer
            starsRef.current.forEach(flake => {
                // Slow drift
                flake.x += flake.driftX
                flake.y += flake.driftY

                // Wrap around edges using CURRENT width/height
                if (flake.x < 0) flake.x = width
                if (flake.x > width) flake.x = 0
                if (flake.y < 0) flake.y = height
                if (flake.y > height) flake.y = 0

                // Shimmer effect
                const shimmer = Math.sin(time * flake.shimmerSpeed + flake.shimmerOffset) * 0.5 + 0.5
                const brightness = flake.baseBrightness * (0.4 + shimmer * 0.6)

                // Draw flake
                ctx.beginPath()
                ctx.arc(flake.x, flake.y, flake.size, 0, Math.PI * 2)
                ctx.fillStyle = flake.color
                ctx.globalAlpha = brightness
                ctx.fill()

                // Subtle glow for brighter flakes
                if (brightness > 0.25) {
                    const glow = ctx.createRadialGradient(
                        flake.x, flake.y, 0,
                        flake.x, flake.y, flake.size * 4
                    )
                    glow.addColorStop(0, flake.color)
                    glow.addColorStop(1, 'transparent')
                    ctx.beginPath()
                    ctx.arc(flake.x, flake.y, flake.size * 4, 0, Math.PI * 2)
                    ctx.fillStyle = glow
                    ctx.globalAlpha = brightness * 0.3
                    ctx.fill()
                }

                ctx.globalAlpha = 1
            })
        }

        animate()

        // No Window Resize Listener needed now!
        // Logic is handled in the animation loop.

        return () => {
            cancelAnimationFrame(animationRef.current)
        }
    }, [])

    return <canvas ref={canvasRef} className="starfield-bg-canvas"></canvas>
}

export default StarfieldBg
