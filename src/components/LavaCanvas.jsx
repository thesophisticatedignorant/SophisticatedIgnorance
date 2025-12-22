import { useEffect, useRef } from 'react'

const LavaCanvas = () => {
    const canvasRef = useRef(null)
    const animationRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')

        // Super-sample for crisp rendering at higher zoom levels
        const baseDpr = window.devicePixelRatio || 1
        const dpr = baseDpr * 3  // Higher multiplier for better zoom quality

        let width, height

        const setCanvasSize = () => {
            width = window.innerWidth
            height = window.innerHeight

            canvas.style.width = width + 'px'
            canvas.style.height = height + 'px'
            canvas.width = Math.floor(width * dpr)
            canvas.height = Math.floor(height * dpr)

            ctx.setTransform(1, 0, 0, 1, 0, 0)
            ctx.scale(dpr, dpr)
            ctx.imageSmoothingEnabled = true
            ctx.imageSmoothingQuality = 'high'
        }
        setCanvasSize()

        // Richer graphite base (so dark phase still looks luxe)
        function drawBase() {
            // Deeper graphite with a little more midtone detail
            const grad = ctx.createLinearGradient(0, 0, width, height)
            grad.addColorStop(0, "#050508")
            grad.addColorStop(0.35, "#0b0b10")
            grad.addColorStop(0.7, "#050509")
            grad.addColorStop(1, "#020207")
            ctx.fillStyle = grad
            ctx.fillRect(0, 0, width, height)

            // subtle diagonal sheen so it never feels flat
            const sheen = ctx.createLinearGradient(0, height, width, 0)
            sheen.addColorStop(0, "rgba(255,255,255,0.02)")
            sheen.addColorStop(0.5, "rgba(255,255,255,0.0)")
            sheen.addColorStop(1, "rgba(255,255,255,0.015)")
            ctx.fillStyle = sheen
            ctx.fillRect(0, 0, width, height)

            // Noise/grain removed for clean look
        }

        let time = 0

        const animate = () => {
            animationRef.current = requestAnimationFrame(animate)
            time += 16

            // Draw the rich graphite base
            drawBase()

            // TODO: Add marble veins and lava glow effects here
        }

        animate()

        const handleResize = () => {
            setCanvasSize()
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            cancelAnimationFrame(animationRef.current)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            id="lavaCanvas"
            style={{
                position: 'fixed',
                inset: 0,
                width: '100%',
                height: '100%',
                display: 'block',
                zIndex: 0,
                /* Global canvas filter: less neon, slightly brighter base */
                filter: 'saturate(0.65) brightness(1.05) contrast(1.04)'
            }}
        />
    )
}

export default LavaCanvas
