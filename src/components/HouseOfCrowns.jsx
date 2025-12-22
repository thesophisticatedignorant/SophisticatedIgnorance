import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import './HouseOfCrowns.scss'

function HouseOfCrowns({ number }) {
    const sectionRef = useRef(null)
    const logoRef = useRef(null)
    const titleRef = useRef(null)
    const subtitleRef = useRef(null)
    const bgRef = useRef(null)
    const gateRef = useRef(null)
    const gateLeftRef = useRef(null)
    const gateRightRef = useRef(null)
    const [hasAnimated, setHasAnimated] = useState(false)
    const [hoverEnabled, setHoverEnabled] = useState(false)

    useEffect(() => {
        const section = sectionRef.current
        if (!section || hasAnimated) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setHasAnimated(true)

                        // Custom ease: resists at start like heavy doors overcoming inertia
                        const heavyEase = 'cubic-bezier(0.12, 0.02, 0.1, 1)'

                        // Gates open - 3 seconds total
                        gsap.to(gateLeftRef.current, {
                            x: '-100%',
                            duration: 3,
                            ease: heavyEase
                        })
                        gsap.to(gateRightRef.current, {
                            x: '100%',
                            duration: 3,
                            ease: heavyEase
                        })

                        // Crown logo ascends (starts as gates are opening)
                        gsap.from(logoRef.current, {
                            y: 100,
                            opacity: 0,
                            scale: 0.8,
                            duration: 2,
                            delay: 0.8,
                            ease: 'power3.out'
                        })

                        // Crown title expands into position
                        gsap.from(titleRef.current, {
                            y: 80,
                            opacity: 0,
                            letterSpacing: '-0.15em',
                            scale: 0.95,
                            duration: 2,
                            delay: 1.1,
                            ease: 'power3.out'
                        })

                        // Subtitle expands with letter-spacing
                        gsap.from(subtitleRef.current, {
                            opacity: 0,
                            letterSpacing: '-0.2em',
                            y: 40,
                            scale: 0.9,
                            duration: 1.6,
                            delay: 1.4,
                            ease: 'power3.out'
                        })

                        // Background bloom effect
                        gsap.fromTo(bgRef.current,
                            {
                                filter: 'brightness(0.3)',
                                scale: 1.1
                            },
                            {
                                filter: 'brightness(1)',
                                scale: 1,
                                duration: 2.5,
                                delay: 1.8,
                                ease: 'power2.out'
                            }
                        )

                        // Subtle bloom glow that fades
                        gsap.fromTo(bgRef.current,
                            { boxShadow: 'inset 0 0 100px rgba(255,215,0,0.3)' },
                            {
                                boxShadow: 'inset 0 0 100px rgba(255,215,0,0)',
                                duration: 2.5,
                                delay: 2.5,
                                ease: 'power2.out'
                            }
                        )

                        // Enable hover effects after all animations complete (4.5s total)
                        setTimeout(() => {
                            setHoverEnabled(true)
                        }, 4500)

                        observer.disconnect()
                    }
                })
            },
            { threshold: 0.3 }
        )

        observer.observe(section)

        return () => observer.disconnect()
    }, [hasAnimated])

    // Cinematic gate transition handler
    const handleEnterHouse = (e) => {
        e.preventDefault()

        // Show the gate overlay
        gsap.set(gateRef.current, { display: 'block' })

        // Vertical wipe from black reveals nothing (we're leaving)
        gsap.fromTo(gateRef.current,
            { clipPath: 'inset(100% 0 0 0)' },
            {
                clipPath: 'inset(0 0 0 0)',
                duration: 1.1,
                ease: 'power2.inOut',
                onComplete: () => {
                    // Navigate after animation
                    window.open('https://sophisticatedbrilliance.com', '_blank')

                    // Reset gate after a delay
                    setTimeout(() => {
                        gsap.to(gateRef.current, {
                            clipPath: 'inset(100% 0 0 0)',
                            duration: 0.6,
                            ease: 'power2.inOut',
                            onComplete: () => {
                                gsap.set(gateRef.current, { display: 'none' })
                            }
                        })
                    }, 500)
                }
            }
        )
    }

    return (
        <section id="house-of-crowns" className="house-of-crowns-section" data-scroll-section ref={sectionRef}>
            {/* Heaven Gates - rose gold panels that open from center */}
            <div className="heaven-gates">
                <div className="heaven-gate left" ref={gateLeftRef}></div>
                <div className="heaven-gate right" ref={gateRightRef}></div>
            </div>

            {/* Cinematic gate overlay for exit transition */}
            <div className="gate-overlay" ref={gateRef}></div>

            <div className={`hoc-link ${hoverEnabled ? 'hover-enabled' : ''}`} onClick={handleEnterHouse}>
                <div className="hoc-image-container" data-scroll data-scroll-speed="-1">
                    <img
                        src="/Metallic SB Logo.svg"
                        alt="Sophisticated Brilliance"
                        className="hoc-logo crown-king"
                        ref={logoRef}
                    />
                    <h1 className="hoc-title crown-title" ref={titleRef}>HOUSE OF CROWNS</h1>
                    <p className="hoc-subtitle" ref={subtitleRef}>The Seat of Power</p>
                    <div className="hoc-overlay">
                        <span>ENTER THE HOUSE</span>
                    </div>
                    {/* Background with bloom effect */}
                    <div className="hoc-bg" ref={bgRef}></div>
                </div>
            </div>
        </section>
    )
}

export default HouseOfCrowns

