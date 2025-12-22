import { useState, useEffect, useRef, useMemo } from 'react'
import { useGrid } from '../context/GridContext'
import './CardSlider.css'

function CardSlider({ isActive, onCycleComplete }) {
    const [progress, setProgress] = useState(5.4) // Start at FOUNDATIONS (front position)
    const [direction, setDirection] = useState(1)
    const [isPaused, setIsPaused] = useState(false) // Animation enabled
    const { isGridVisible } = useGrid() // Shared state with grid overlay
    const [imageScale, setImageScale] = useState(180) // Image height in px, adjust with + / -
    const [isLocked, setIsLocked] = useState(true) // Elements locked
    const animationRef = useRef(null)
    const lastTimeRef = useRef(Date.now())
    const touchStartRef = useRef(null)
    const totalProgressRef = useRef(0)
    const cycleCompletedRef = useRef(false)

    // Stable random delays for sheen animation (generated once per mount)
    const sheenDelays = useMemo(() =>
        Array.from({ length: 6 }, () => Math.random() * 6),
        [])

    // Listen for 'L' key to lock elements
    // Listen for '+' and '-' keys to scale image
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'l' || e.key === 'L') {
                setIsLocked(prev => {
                    const newVal = !prev
                    console.log('ELEMENTS', newVal ? 'LOCKED' : 'UNLOCKED')
                    alert(newVal ? '🔒 Elements LOCKED' : '🔓 Elements UNLOCKED')
                    return newVal
                })
            } else if (e.key === '+' || e.key === '=' || e.key === 'ArrowUp') {
                setImageScale(prev => {
                    const newVal = prev + 10
                    console.log('IMAGE SIZE:', newVal + 'px')
                    return newVal
                })
            } else if (e.key === '-' || e.key === '_' || e.key === 'ArrowDown') {
                setImageScale(prev => {
                    const newVal = Math.max(20, prev - 10)
                    console.log('IMAGE SIZE:', newVal + 'px')
                    return newVal
                })
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)

    }, [])

    const slides = [
        {
            title: 'FOUNDATIONS', subtitle: 'the architecture\nof self', image: '/foundations.svg', link: 'http://localhost:5181/#foundations',
            titlePos: { left: '56px', top: '14px' },
            epithetPos: { left: '25px', top: '74px' },
            imagePos: { left: '255px', top: '100px' }
        },
        {
            title: 'FORTIFICATIONS', subtitle: 'the shield\nof style', image: '/fortifications.svg', link: 'http://localhost:5181/#fortifications',
            titlePos: { left: '10%', top: '6%' },
            epithetPos: { left: '18%', top: '38%' },
            imagePos: { left: '67%', top: '49%' }
        },
        {
            title: 'RELICS', subtitle: 'the creed\nof craft', image: '/relics.svg', link: 'http://localhost:5181/#relics',
            titlePos: { left: '117px', top: '14px' },
            epithetPos: { left: '69px', top: '78px' },
            imagePos: { left: '241px', top: '101px' }
        },
        {
            title: 'DOMINION', subtitle: 'the path of\nconquest', image: '/dominion.svg', link: 'http://localhost:5181/#dominion',
            titlePos: { left: '90px', top: '13px' },
            epithetPos: { left: '58px', top: '72px' },
            imagePos: { left: '242px', top: '93px' }
        },
        {
            title: 'ADORNMENTS', subtitle: 'the reign\nof detail', image: '/adornments.svg', link: 'http://localhost:5181/#adornments',
            titlePos: { left: '61px', top: '15px' },
            epithetPos: { left: '70px', top: '79px' },
            imagePos: { left: '242px', top: '102px' }
        },
        {
            title: 'CROWNWORKS', subtitle: 'the pinnacle of\nrefinement', image: '/crownworks.svg', link: 'http://localhost:5181/#crownworks',
            titlePos: { left: '56px', top: '16px' },
            epithetPos: { left: '36px', top: '84px' },
            imagePos: { left: '245px', top: '108px' }
        }
    ]

    // 6-color gradient cycle matching Sophisticated Ignorance sections
    // Each entry: { background, boxShadow }
    const cardStyles = [
        { // Foundations
            background: `
                repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 0.5px, transparent 0.5px, transparent 1px),
                radial-gradient(circle at 30% 30%, #1b1b1b 0%, #101010 60%, #000 100%)
            `,
            backgroundBlendMode: 'overlay, normal',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.05), 0 0 40px rgba(0,0,0,0.9), 0 0 35px rgba(214,179,107,0.20)',
            border: '1px solid rgba(255,255,255,0.15)'
        },
        { // Fortifications - Liquid Metal (Dark Grey)
            background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.05), 0 0 40px rgba(0,0,0,0.9), 0 0 35px rgba(214,179,107,0.20)',
            border: '1px solid rgba(255,255,255,0.1)'
        },
        { // Relics - Liquid Metal (Deep Charcoal)
            background: 'linear-gradient(135deg, #222 0%, #111 100%)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.05), 0 0 40px rgba(0,0,0,0.9), 0 0 35px rgba(214,179,107,0.20)',
            border: '1px solid rgba(255,255,255,0.1)'
        },
        { // Dominion - Liquid Metal (Steel)
            background: 'linear-gradient(135deg, #333 0%, #1a1a1a 100%)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.05), 0 0 40px rgba(0,0,0,0.9), 0 0 35px rgba(214,179,107,0.20)',
            border: '1px solid rgba(255,255,255,0.1)'
        },
        { // Adornments - Liquid Metal (Silverish)
            background: 'linear-gradient(135deg, #444 0%, #222 100%)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.05), 0 0 40px rgba(0,0,0,0.9), 0 0 35px rgba(214,179,107,0.20)',
            border: '1px solid rgba(255,255,255,0.1)'
        },
        { // Crownworks - Liquid Metal (Platinum)
            background: 'linear-gradient(135deg, #555 0%, #333 100%)',
            boxShadow: '0 0 0 1px rgba(255,255,255,0.05), 0 0 40px rgba(0,0,0,0.9), 0 0 35px rgba(214,179,107,0.20)',
            border: '1px solid rgba(255,255,255,0.1)'
        }
    ]

    useEffect(() => {
        if (isActive && !isPaused) {
            // Reset the time reference when animation starts
            // This prevents a huge delta after the intro delay
            lastTimeRef.current = Date.now()

            const animate = () => {
                const now = Date.now()
                const delta = now - lastTimeRef.current
                lastTimeRef.current = now

                const move = delta * 0.0005 * direction
                setProgress(prev => (prev + move + slides.length) % slides.length)

                // Track cycle progress
                if (!cycleCompletedRef.current) {
                    totalProgressRef.current += Math.abs(move)
                    // Trigger ~1.5s earlier (0.0005 * 1500 = 0.75 progress units)
                    if (totalProgressRef.current >= (slides.length / 2)) {
                        cycleCompletedRef.current = true
                        if (onCycleComplete) onCycleComplete()
                    }
                }

                animationRef.current = requestAnimationFrame(animate)
            }
            animationRef.current = requestAnimationFrame(animate)
        }
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [isActive, isPaused, direction, slides.length, onCycleComplete])

    const handleTouchStart = (e) => {
        touchStartRef.current = {
            y: e.touches[0].clientY,
            time: Date.now()
        }
    }

    const handleTouchEnd = (e) => {
        if (!touchStartRef.current) return

        const touchEnd = e.changedTouches[0].clientY
        const deltaY = touchEnd - touchStartRef.current.y
        const deltaTime = Date.now() - touchStartRef.current.time

        // Require at least 50px movement and completed within 300ms for swipe
        if (Math.abs(deltaY) < 50 || deltaTime >= 300) {
            touchStartRef.current = null
            return
        }

        if (deltaY < 0) {
            // Swipe up - reverse animation (cards go backwards)
            setDirection(-1)
        } else {
            // Swipe down - normal animation (cards flow forward)
            setDirection(1)
        }

        touchStartRef.current = null
    }

    const handleWheel = (e) => {
        e.preventDefault()
        if (e.deltaY < 0) {
            // Scroll up - reverse animation (cards go backwards)
            setDirection(-1)
        } else if (e.deltaY > 0) {
            // Scroll down - normal animation (cards flow forward)
            setDirection(1)
        }
    }

    const getCardPosition = (index) => {
        let position = (index - progress + slides.length) % slides.length
        const normalizedPos = position / slides.length

        const baseScale = 0.05 + Math.pow(1 - normalizedPos, 2.5) * 2.0
        const scale = baseScale * 0.8
        const zDepth = (1 - normalizedPos) * 800 - 200

        // Calculate top-left corner position
        // Cards are 900px wide, 500px tall (max-width of cards-container)
        const cardWidth = 900
        const cardHeight = 500
        const centerX = window.innerWidth / 2
        const centerY = window.innerHeight / 2

        // Top-left corner position accounting for scale
        const scaledWidth = cardWidth * scale
        const scaledHeight = cardHeight * scale
        const topLeftX = centerX - (scaledWidth / 2)
        const topLeftY = centerY - (scaledHeight / 2)
        const topLeftZ = zDepth

        // Check if top-left corner has reached dissipation point (100, 100, -568)
        const dissipationX = 100
        const dissipationY = 100
        const dissipationZ = -568

        // Calculate distance to dissipation point
        const distanceToTarget = Math.sqrt(
            Math.pow(topLeftX - dissipationX, 2) +
            Math.pow(topLeftY - dissipationY, 2) +
            Math.pow(topLeftZ - dissipationZ, 2)
        )

        // Original opacity calculation
        let opacity
        if (normalizedPos > 0.9) {
            // Fade out later (was 0.85)
            opacity = (1 - normalizedPos) / 0.1
        } else if (normalizedPos < 0.05) {
            // Fade in earlier (was 0.1)
            opacity = normalizedPos / 0.05
        } else {
            opacity = 1
        }
        // Increased from 0.9 to 1.0 for less transparency
        opacity = Math.max(0, Math.min(1, opacity * 1.0))

        // Apply dissipation when close to target point (within 200px radius)
        if (distanceToTarget < 200) {
            const dissipationFactor = distanceToTarget / 200
            opacity *= dissipationFactor
        }

        return { scale, zDepth, opacity, position }
    }

    return (
        <div
            className="card-slider active"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onWheel={handleWheel}
        >
            <div className="cards-container">
                {slides.map((slide, index) => {
                    const { scale, zDepth, opacity, position } = getCardPosition(index)

                    if (opacity <= 0.01) return null

                    return (
                        <div
                            key={index}
                            className="card"
                            style={{
                                background: cardStyles[index].background,
                                backgroundBlendMode: cardStyles[index].backgroundBlendMode || 'normal',
                                boxShadow: cardStyles[index].boxShadow,
                                transform: `translate(-50%, -50%) translateZ(${zDepth}px) scale(${scale})`,
                                opacity: opacity,
                                zIndex: Math.floor(100 - position * 10),
                                border: cardStyles[index].border || '3px solid rgba(255, 255, 255, 0.3)',
                                position: 'absolute',
                                left: '50%',
                                top: '50%',
                                transformOrigin: 'center center',
                                pointerEvents: 'none'
                            }}
                        >
                            {/* Ambient glass sheen reflection */}
                            <div
                                className="card-sheen"
                                style={{
                                    '--sheen-delay': `${sheenDelays[index]}s`
                                }}
                            ></div>
                            <div className="drift-container">
                                <div className="card-content" style={{
                                    opacity: opacity,
                                    position: 'relative',
                                    width: '100%',
                                    height: '100%',
                                    padding: '20px'
                                }}>
                                    {/* Draggable Title with crosshairs */}
                                    <div style={{ position: 'absolute', left: slide.titlePos.left, top: slide.titlePos.top }}>
                                        <h2
                                            className="card-title"
                                            style={{
                                                position: 'relative',
                                                cursor: isLocked ? 'pointer' : 'move',
                                                pointerEvents: 'auto',
                                                margin: 0
                                            }}
                                            onClick={() => isLocked && (window.location.href = slide.link)}
                                            onMouseDown={(e) => {
                                                if (isLocked) return
                                                const wrapper = e.currentTarget.parentElement
                                                const startX = e.clientX
                                                const startY = e.clientY
                                                const startLeft = wrapper.offsetLeft
                                                const startTop = wrapper.offsetTop

                                                const onMouseMove = (moveE) => {
                                                    const deltaX = moveE.clientX - startX
                                                    const deltaY = moveE.clientY - startY
                                                    wrapper.style.left = (startLeft + deltaX) + 'px'
                                                    wrapper.style.top = (startTop + deltaY) + 'px'
                                                }

                                                const onMouseUp = () => {
                                                    document.removeEventListener('mousemove', onMouseMove)
                                                    document.removeEventListener('mouseup', onMouseUp)
                                                    console.log('TITLE POSITION - left:', wrapper.style.left, 'top:', wrapper.style.top)
                                                    alert('Title position: Left: ' + wrapper.style.left + ', Top: ' + wrapper.style.top)
                                                }

                                                document.addEventListener('mousemove', onMouseMove)
                                                document.addEventListener('mouseup', onMouseUp)
                                                e.preventDefault()
                                            }}
                                        >{slide.title}</h2>
                                        {/* Crosshairs for title - visible when grid is on */}
                                        {isGridVisible && <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', backgroundColor: 'lime', pointerEvents: 'none' }} />}
                                        {isGridVisible && <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', backgroundColor: 'lime', pointerEvents: 'none' }} />}
                                    </div>

                                    {/* Draggable Epithet with crosshairs */}
                                    <div style={{ position: 'absolute', left: slide.epithetPos.left, top: slide.epithetPos.top }}>
                                        <p
                                            className="card-subtitle"
                                            style={{
                                                position: 'relative',
                                                cursor: isLocked ? 'pointer' : 'move',
                                                pointerEvents: 'auto',
                                                margin: 0
                                            }}
                                            onClick={() => isLocked && (window.location.href = slide.link)}
                                            onMouseDown={(e) => {
                                                if (isLocked) return
                                                const wrapper = e.currentTarget.parentElement
                                                const startX = e.clientX
                                                const startY = e.clientY
                                                const startLeft = wrapper.offsetLeft
                                                const startTop = wrapper.offsetTop

                                                const onMouseMove = (moveE) => {
                                                    const deltaX = moveE.clientX - startX
                                                    const deltaY = moveE.clientY - startY
                                                    wrapper.style.left = (startLeft + deltaX) + 'px'
                                                    wrapper.style.top = (startTop + deltaY) + 'px'
                                                }

                                                const onMouseUp = () => {
                                                    document.removeEventListener('mousemove', onMouseMove)
                                                    document.removeEventListener('mouseup', onMouseUp)
                                                    console.log('EPITHET POSITION - left:', wrapper.style.left, 'top:', wrapper.style.top)
                                                    alert('Epithet position: Left: ' + wrapper.style.left + ', Top: ' + wrapper.style.top)
                                                }

                                                document.addEventListener('mousemove', onMouseMove)
                                                document.addEventListener('mouseup', onMouseUp)
                                                e.preventDefault()
                                            }}
                                        >{slide.subtitle}</p>
                                        {/* Crosshairs for epithet - visible when grid is on */}
                                        {isGridVisible && <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', backgroundColor: 'cyan', pointerEvents: 'none' }} />}
                                        {isGridVisible && <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', backgroundColor: 'cyan', pointerEvents: 'none' }} />}
                                    </div>

                                    {/* Draggable Image with crosshairs */}
                                    <div style={{ position: 'absolute', left: slide.imagePos.left, top: slide.imagePos.top, transform: 'translate(-50%, -50%)' }}>
                                        <img
                                            src={slide.image}
                                            alt={slide.title}
                                            draggable={false}
                                            style={{
                                                height: imageScale + 'px',
                                                width: 'auto',
                                                objectFit: 'contain',
                                                cursor: isLocked ? 'pointer' : 'move',
                                                pointerEvents: 'auto',
                                                display: 'block',
                                                filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.9))'
                                            }}
                                            onClick={() => isLocked && (window.location.href = slide.link)}
                                            onMouseDown={(e) => {
                                                if (isLocked) return
                                                const wrapper = e.target.parentElement
                                                const startX = e.clientX
                                                const startY = e.clientY
                                                const startLeft = wrapper.offsetLeft
                                                const startTop = wrapper.offsetTop

                                                const onMouseMove = (moveE) => {
                                                    const deltaX = moveE.clientX - startX
                                                    const deltaY = moveE.clientY - startY
                                                    wrapper.style.left = (startLeft + deltaX) + 'px'
                                                    wrapper.style.top = (startTop + deltaY) + 'px'
                                                    wrapper.style.transform = 'translate(-50%, -50%)'
                                                }

                                                const onMouseUp = () => {
                                                    document.removeEventListener('mousemove', onMouseMove)
                                                    document.removeEventListener('mouseup', onMouseUp)
                                                    console.log('IMAGE POSITION - left:', wrapper.style.left, 'top:', wrapper.style.top)
                                                    alert('Image position: Left: ' + wrapper.style.left + ', Top: ' + wrapper.style.top)
                                                }

                                                document.addEventListener('mousemove', onMouseMove)
                                                document.addEventListener('mouseup', onMouseUp)
                                                e.preventDefault()
                                            }}
                                        />
                                        {/* Crosshairs for image - visible when grid is on */}
                                        {isGridVisible && <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', backgroundColor: 'red', pointerEvents: 'none' }} />}
                                        {isGridVisible && <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '2px', backgroundColor: 'red', pointerEvents: 'none' }} />}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default CardSlider
