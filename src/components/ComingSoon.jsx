import { useEffect, useRef } from 'react'
import './ComingSoon.scss'

const ComingSoon = ({ sectionTitle }) => {
    const containerRef = useRef(null)
    const canvasRef = useRef(null)
    const textRef = useRef(null)
    const animationRef = useRef(null)
    const starsRef = useRef([])
    const dimensionsRef = useRef({ width: 0, height: 0 })

    useEffect(() => {
        const canvas = canvasRef.current
        const textElement = textRef.current
        if (!canvas || !textElement) return

        const ctx = canvas.getContext('2d')

        // Set canvas size and handle star redistribution
        const setCanvasSize = () => {
            const newWidth = canvas.offsetWidth
            const newHeight = canvas.offsetHeight
            const prevWidth = dimensionsRef.current.width
            const prevHeight = dimensionsRef.current.height

            canvas.width = newWidth * window.devicePixelRatio
            canvas.height = newHeight * window.devicePixelRatio
            ctx.setTransform(1, 0, 0, 1, 0, 0)
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

            // Scale star positions proportionally when window size changes
            if (starsRef.current.length > 0 && prevWidth > 0 && prevHeight > 0 && (prevWidth !== newWidth || prevHeight !== newHeight)) {
                const scaleX = newWidth / prevWidth
                const scaleY = newHeight / prevHeight
                starsRef.current.forEach(star => {
                    star.x *= scaleX
                    star.y *= scaleY
                })
            }

            dimensionsRef.current = { width: newWidth, height: newHeight }
        }
        setCanvasSize()

        const width = dimensionsRef.current.width
        const height = dimensionsRef.current.height

        // Initialize stars only once
        const numStars = 500
        for (let i = 0; i < numStars; i++) {
            starsRef.current.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 1.8 + 0.3,
                baseBrightness: Math.random() * 0.4 + 0.1,
                twinkleSpeed: Math.random() * 0.002 + 0.001,
                twinkleOffset: Math.random() * Math.PI * 2
            })
        }

        // Shooting star state
        let shootingStar = null
        let textBrightness = 0
        let timeSinceLastShoot = 0
        const shootInterval = 2000 // ms between shooting stars

        const createShootingStar = () => {
            // Random start position from edges
            const side = Math.floor(Math.random() * 4)
            let startX, startY

            const { width, height } = dimensionsRef.current
            const centerX = width / 2
            const centerY = height / 2

            switch (side) {
                case 0: // top
                    startX = Math.random() * width
                    startY = -20
                    break
                case 1: // right
                    startX = width + 20
                    startY = Math.random() * height
                    break
                case 2: // bottom
                    startX = Math.random() * width
                    startY = height + 20
                    break
                default: // left
                    startX = -20
                    startY = Math.random() * height
            }

            // Calculate angle to pass through center (no variance for consistent illumination)
            const angleToCenter = Math.atan2(centerY - startY, centerX - startX)
            const angle = angleToCenter

            return {
                x: startX,
                y: startY,
                angle: angle,
                speed: 6 + Math.random() * 4,
                length: 80 + Math.random() * 60,
                brightness: 1,
                active: true
            }
        }

        let time = 0

        // Animation loop
        const animate = () => {
            animationRef.current = requestAnimationFrame(animate)
            time += 16
            timeSinceLastShoot += 16

            // Check and update size every frame
            setCanvasSize()

            const { width, height } = dimensionsRef.current

            // Clear canvas
            ctx.fillStyle = '#000'
            ctx.fillRect(0, 0, width, height)

            // Draw twinkling stars
            starsRef.current.forEach(star => {
                const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.5 + 0.5
                const brightness = star.baseBrightness * (0.5 + twinkle * 0.5)

                // Star core
                ctx.beginPath()
                ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`
                ctx.fill()

                // Subtle glow for brighter stars
                if (brightness > 0.3) {
                    const gradient = ctx.createRadialGradient(
                        star.x, star.y, 0,
                        star.x, star.y, star.size * 3
                    )
                    gradient.addColorStop(0, `rgba(255, 255, 255, ${brightness * 0.3})`)
                    gradient.addColorStop(1, 'transparent')
                    ctx.beginPath()
                    ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2)
                    ctx.fillStyle = gradient
                    ctx.fill()
                }
            })

            // Trigger shooting star periodically
            if (timeSinceLastShoot > shootInterval && !shootingStar) {
                shootingStar = createShootingStar()
                timeSinceLastShoot = 0
            }

            // Update and draw shooting star
            if (shootingStar && shootingStar.active) {
                // Move shooting star
                shootingStar.x += Math.cos(shootingStar.angle) * shootingStar.speed
                shootingStar.y += Math.sin(shootingStar.angle) * shootingStar.speed

                // Calculate distance to center (text area)
                const { width: currentWidth, height: currentHeight } = dimensionsRef.current
                const centerX = currentWidth / 2
                const centerY = currentHeight / 2
                const distToCenter = Math.sqrt(
                    Math.pow(shootingStar.x - centerX, 2) +
                    Math.pow(shootingStar.y - centerY, 2)
                )

                // Illuminate text when shooting star is near center
                const illuminationRadius = 350
                if (distToCenter < illuminationRadius) {
                    const proximity = 1 - (distToCenter / illuminationRadius)
                    textBrightness = Math.max(textBrightness, proximity)
                }

                // Draw shooting star trail
                const tailX = shootingStar.x - Math.cos(shootingStar.angle) * shootingStar.length
                const tailY = shootingStar.y - Math.sin(shootingStar.angle) * shootingStar.length

                const gradient = ctx.createLinearGradient(tailX, tailY, shootingStar.x, shootingStar.y)
                gradient.addColorStop(0, 'transparent')
                gradient.addColorStop(0.7, `rgba(255, 255, 255, 0.3)`)
                gradient.addColorStop(1, `rgba(255, 255, 255, ${shootingStar.brightness})`)

                ctx.beginPath()
                ctx.moveTo(tailX, tailY)
                ctx.lineTo(shootingStar.x, shootingStar.y)
                ctx.strokeStyle = gradient
                ctx.lineWidth = 2
                ctx.lineCap = 'round'
                ctx.stroke()

                // Draw bright head
                ctx.beginPath()
                ctx.arc(shootingStar.x, shootingStar.y, 3, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(255, 255, 255, ${shootingStar.brightness})`
                ctx.fill()

                // Glow around head
                const headGlow = ctx.createRadialGradient(
                    shootingStar.x, shootingStar.y, 0,
                    shootingStar.x, shootingStar.y, 20
                )
                headGlow.addColorStop(0, `rgba(255, 255, 255, ${shootingStar.brightness * 0.6})`)
                headGlow.addColorStop(1, 'transparent')
                ctx.beginPath()
                ctx.arc(shootingStar.x, shootingStar.y, 20, 0, Math.PI * 2)
                ctx.fillStyle = headGlow
                ctx.fill()

                // Check if off screen
                const { width: boundWidth, height: boundHeight } = dimensionsRef.current
                if (shootingStar.x < -100 || shootingStar.x > boundWidth + 100 ||
                    shootingStar.y < -100 || shootingStar.y > boundHeight + 100) {
                    shootingStar = null
                }
            }

            // Update text brightness (fade out after illumination)
            if (textBrightness > 0.05) {
                textElement.style.opacity = textBrightness
                textBrightness *= 0.985 // Slower fade for longer illumination
            } else {
                textElement.style.opacity = 0.05 // Keep very dim
                textBrightness = 0
            }
        }

        animate()

        // Handle resize
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
        <section className="coming-soon" data-scroll-section ref={containerRef}>
            <canvas ref={canvasRef} className="starfield-canvas"></canvas>
            <div className="coming-soon-overlay">
                <h2 className="coming-soon-text" ref={textRef}>COMING SOON</h2>
            </div>
        </section>
    )
}

export default ComingSoon
