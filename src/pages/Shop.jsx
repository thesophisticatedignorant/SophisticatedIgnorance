import { useEffect, useRef, useState } from 'react'
import LocomotiveScroll from 'locomotive-scroll'
import 'locomotive-scroll/dist/locomotive-scroll.css'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './Shop.scss'
import ProductDisplay from '../components/ProductDisplay'
import HouseOfCrowns from '../components/HouseOfCrowns'
import ComingSoon from '../components/ComingSoon'
import Header from '../components/Header'
import MenuOverlay from '../components/MenuOverlay'
import CartDrawer from '../components/CartDrawer'
import { useCart } from '../context/CartContext'

gsap.registerPlugin(ScrollTrigger)

function Shop() {
    const scrollRef = useRef(null)
    const locomotiveRef = useRef(null)
    const [menuOpen, setMenuOpen] = useState(false)
    const [navOpen, setNavOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('foundations')
    const { isCartOpen } = useCart()

    // Section data with names, epithets, and products
    const sections = [
        {
            title: 'FOUNDATIONS',
            epithet: 'the architecture of self',
            num: '01',
            image: '/foundations.svg',
            body: 'FOUNDATIONS SERVES AS THE BASE LAYER OF REFINEMENT; THE STEPPING STONES OF YOUR WARDROBE DESIGNED FOR STRUCTURE, COMFORT AND EVERYDAY UNIFORMITY. THROUGH SIMPLICITY AND PRECISION, FOUNDATIONS DEFINES THE ESSENTIALS. WHERE FORM TAKES SHAPE AND SOPHISTICATION BEGINS.',
            products: [
                {
                    name: 'The Veil',
                    epithet: 'Protection through perception.',
                    price: '30',
                    colors: ['Black', 'Camo'],
                    sizes: [{ size: 'ONE SIZE', soldOut: false }],
                    specs: [
                        'Polyester / Spandex blend',
                        'Machine wash cold, line dry',
                        'Converts between balaclava, neck gaiter, and skull cap',
                        'Reflective Foundations insignia at side',
                        'Reflective Inferno logo at rear',
                        'Imported'
                    ]
                },
                {
                    name: 'The Cornerstone',
                    epithet: 'Simplicity as sophistication.',
                    price: '35',
                    sizes: [
                        { size: 'S', soldOut: true },
                        { size: 'M', soldOut: false },
                        { size: 'L', soldOut: false },
                        { size: 'XL', soldOut: false },
                        { size: 'XXL', soldOut: true }
                    ],
                    specs: [
                        '100% Cotton, Slim Fit',
                        'Ribbed crewneck collar',
                        '180 GSM medium-weight fabric',
                        'Metallic foil Foundations insignia at front left hem',
                        'Imported'
                    ]
                },
                {
                    name: 'The Breakaway',
                    epithet: 'Transformation in motion.',
                    price: '150',
                    colors: ['Grapefruit', 'Amethyst', 'Graphite'],
                    breakawaySizing: {
                        hoodieSizes: [
                            { size: 'S', soldOut: false },
                            { size: 'M', soldOut: false },
                            { size: 'L', soldOut: false },
                            { size: 'XL', soldOut: false },
                            { size: 'XXL', soldOut: false }
                        ],
                        pantsSizes: [
                            { size: 'S', soldOut: false },
                            { size: 'M', soldOut: false },
                            { size: 'L', soldOut: false },
                            { size: 'XL', soldOut: false },
                            { size: 'XXL', soldOut: false }
                        ]
                    },
                    specsColumns: [
                        {
                            header: 'Hoodie',
                            items: [
                                '100% Polyester, double-knit construction',
                                'Sublimated gradient design featuring the New York City skyline',
                                'Contoured hood for comfort and profile',
                                'Drop-tail hem and zippered side pockets',
                                'Embroidered Foundations insignia on left arm',
                                '260 GSM midweight fabric for structured flexibility',
                                'Machine wash cold, line dry'
                            ]
                        },
                        {
                            header: 'Trackpant',
                            items: [
                                '100% Polyester, double-knit construction',
                                'Coordinated gradient detailing along side seam',
                                'Tearaway snaps along side seam for adjustable styling',
                                'Embroidered Foundations insignia at left pocket',
                                'Elastic waistband with drawstring',
                                'Durable and breathable interior mesh lining',
                                'Machine wash cold, line dry'
                            ]
                        }
                    ]
                }
            ]
        },
        {
            title: 'FORTIFICATIONS',
            epithet: 'the shield of style',
            num: '02',
            image: '/fortifications.svg',
            body: 'FORTIFICATIONS REPRESENTS DEFENSE THROUGH DESIGN; LUXURIOUS GARMENTS BUILT AS ARMOR. EACH PIECE IN THIS TIER ACTS AS BOTH PROTECTION AND PROCLAMATION. CONSTRUCTED TO ENDURE, ENGINEERED TO IMPRESS.',
            products: [
                {
                    name: 'The Contradiction',
                    epithet: 'Elegance built on chaos.',
                    price: '420',
                    images: [
                        '/contradiction_exterior_interactive_360_viewer_complete.html',
                        '/contradiction_reversed_interactive_360_viewer_complete.html',
                        '/contradiction-ghost-mannequin/img_1.png',
                        '/contradiction-ghost-mannequin/img_2.png',
                        '/contradiction-ghost-mannequin/img_3.png',
                        '/contradiction-ghost-mannequin/img_4.png',
                        '/contradiction-ghost-mannequin/img_5.png',
                        '/contradiction-ghost-mannequin/img_6.png',
                        '/contradiction-rev-ghost-mannequin/img_1.png',
                        '/contradiction-rev-ghost-mannequin/img_2.png',
                        '/contradiction-rev-ghost-mannequin/img_3.png',
                        '/contradiction-rev-ghost-mannequin/img_4.png',
                        '/contradiction-rev-ghost-mannequin/img_5.png',
                        '/contradiction-rev-ghost-mannequin/img_6.png'
                    ],
                    colors: ['Multi'],
                    sizes: [
                        { size: 'S', soldOut: false },
                        { size: 'M', soldOut: false },
                        { size: 'L', soldOut: false },
                        { size: 'XL', soldOut: false },
                        { size: 'XXL', soldOut: false }
                    ],
                    specsColumns: [
                        {
                            header: 'Exterior Composition',
                            items: [
                                'Reversible construction:',
                                { text: 'Side 1: NASCAR-inspired appliqués', indent: true },
                                { text: 'Side 2: Fresco mural featuring Inferno insignia', indent: true },
                                'Contrast color trims and accent panels',
                                'Embroidered appliqués and detailed graphics'
                            ]
                        },
                        {
                            header: 'Technical Composition',
                            items: [
                                '100% Cotton midweight build for moderate temperatures',
                                'Ribbed knit cuffs and waist hem',
                                'Long sleeves, mock neck design',
                                'Two front slip pockets',
                                'Full snap closure, tonal hardware',
                                'Dry clean only',
                                'Imported'
                            ]
                        }
                    ]
                },
                {
                    name: 'The Intersect',
                    epithet: 'The worlds of asphalt and agility collide.',
                    price: '670',
                    colors: ['Multi'],
                    sizes: [
                        { size: 'S', soldOut: false },
                        { size: 'M', soldOut: false },
                        { size: 'L', soldOut: false },
                        { size: 'XL', soldOut: false },
                        { size: 'XXL', soldOut: false }
                    ],
                    specsColumns: [
                        {
                            header: 'Construction',
                            items: [
                                '100% premium leather shell',
                                'Ergonomic tailoring for dynamic mobility',
                                'Branded hardware and tonal stitching'
                            ]
                        },
                        {
                            header: 'Features',
                            items: [
                                'Reinforced elbow panels for durability and control',
                                'Fully lined interior for structural comfort',
                                'Optional back-protector compatibility',
                                'Inquire for bespoke customization options',
                                'Imported'
                            ]
                        }
                    ]
                }
            ]
        },
        {
            title: 'RELICS',
            epithet: 'the creed of craft',
            num: '03',
            image: '/relics.svg',
            body: 'RELICS SERVE AS TIMELESS LEATHER GOODS THAT EMBODY STRENGTH THROUGH SUBTLETY AND REFINEMENT THROUGH UTILITY. EACH PIECE IS DESIGNED TO BE CARRIED, AGED, AND REMEMBERED.',
            products: [
                {
                    name: 'The Creed',
                    epithet: 'Every strike makes a statement.',
                    price: '990',
                    colors: ['Amethyst'],
                    sizes: [
                        { size: '12oz', soldOut: false },
                        { size: '14oz', soldOut: false },
                        { size: '16oz', soldOut: false }
                    ],
                    specsColumns: [
                        {
                            items: [
                                'Individually hand-crafted from 100% genuine full-grain cowhide leather',
                                'Double-stitched seams for structural reinforcement',
                                'Hand-screen-printed texture application'
                            ]
                        },
                        {
                            items: [
                                'Triple-layer foam padding for maximum impact absorption',
                                'Embroidered Inferno logo and Foundations insignia',
                                'Bespoke customization options available upon inquiry',
                                'Imported'
                            ]
                        }
                    ]
                }
            ]
        },
        {
            title: 'DOMINION',
            epithet: 'the path of conquest',
            num: '04',
            image: '/dominion.svg',
            body: <>DOMINION REPRESENTS PROGRESSION THROUGH MOTION. <span className="redacted-text">FOOTWEAR</span> ENGINEERED FOR ELEVATION, <span className="redacted-text">DESIGNED TO COMMAND EVERY STEP</span>. EACH PIECE IN THIS TIER SYMBOLIZES FORWARD MOMENTUM.</>,
            comingSoon: true,
            products: []
        },
        {
            title: 'ADORNMENTS',
            epithet: 'the reign of detail',
            num: '05',
            image: '/adornments.svg',
            body: <>ADORNMENTS EMBODIES REFINEMENT THROUGH SUBTLETY. <span className="redacted-text">ACCESSORIES THAT</span> COMMAND ATTENTION WITHOUT EXCESS. EACH PIECE IN THIS TIER CELEBRATES INTENTION. WHERE THE DETAILS EVOKE DOMINANCE.</>,
            comingSoon: true,
            products: []
        },
        {
            title: 'CROWNWORKS',
            epithet: 'the pinnacle of refinement',
            num: '06',
            image: '/crownworks.svg',
            body: 'CROWNWORKS REPRESENTS THE EMBODIMENT OF POWER PERFECTED IN PRESENTATION: GARMENTS CRAFTED FOR MOMENTS OF COMMAND, CEREMONY, AND CONSEQUENCE. EACH CREATION IN THIS TIER SIGNIFIES COMPOSURE UNDER PRESSURE; THE DISCIPLINE TO REMAIN REGAL, THE ELEGANCE TO MOVE WITH AUTHORITY.',
            products: [
                {
                    name: 'The Heir',
                    epithet: 'Heritage in woven form.',
                    price: '950',
                    colors: ['Black'],
                    suitSizing: {
                        fits: ['Extra Slim', 'Slim', 'Classic', 'Relaxed'],
                        jacketFits: ['Short', 'Regular', 'Long'],
                        jacketSizes: ['36', '38', '39', '40', '42', '44', '48'],
                        pantWaist: ['28', '29', '30', '31', '32', '33', '34', '36', '38'],
                        pantLength: ['28', '30', '32', '34', '36']
                    },
                    specsColumns: [
                        {
                            header: 'Blazer',
                            items: [
                                'Crafted from a wrinkle-resistant wool blend with a refined stretch weave for enduring comfort and structure',
                                'Tailored in a relaxed profile with precise shoulder framing and contoured chest',
                                'Notch lapels, two-button front, flap pockets, and center-back vent',
                                'Virgin Wool / Polyester / Spandex blend',
                                'Fully lined interior for structure and longevity',
                                'Dry clean only • Imported'
                            ]
                        },
                        {
                            header: 'Pants',
                            items: [
                                'Coordinating trousers with wrinkle-resistant, stretch construction for fluid movement',
                                'Sits low on the waist, tapered through the thigh for a sculpted silhouette',
                                'Hook-and-bar closure, zip fly, buttoned back welt pockets, and slant hand pockets',
                                'Virgin Wool / Polyester / Spandex blend',
                                'Fully lined interior for comfort',
                                'Dry clean only • Imported'
                            ]
                        }
                    ]
                },
                {
                    name: 'The Standard',
                    epithet: 'The idealized norm of casual attire.',
                    price: '910',
                    colors: ['Chalk Grey', 'Zenith Blue', 'Agate Grey', 'Dark Sea Blue', 'Jet Black'],
                    suitSizing: {
                        fits: ['Extra Slim', 'Slim', 'Classic', 'Relaxed'],
                        jacketFits: ['Short', 'Regular', 'Long'],
                        jacketSizes: ['36', '38', '39', '40', '42', '44', '48'],
                        pantWaist: ['28', '29', '30', '31', '32', '33', '34', '36', '38'],
                        pantLength: ['28', '30', '32', '34', '36']
                    },
                    specsColumns: [
                        {
                            header: 'Blazer',
                            items: [
                                'Easy care and easy wear with wrinkle-resistant fabric containing just enough stretch for all-day comfort',
                                'Cut in an extra slim fit, narrow through the shoulders and slimmer through the chest',
                                'Notch lapels, 2 button front, long sleeves with button cuffs, flap hand pockets, center back vent',
                                'Lined for added durability',
                                'Virgin Wool / Polyester / Spandex',
                                'Dry clean only • Imported'
                            ]
                        },
                        {
                            header: 'Pants',
                            items: [
                                'Easy care with wrinkle-resistant fabric and comfortable stretch',
                                'Extra slim fit, sits low on the waist, more fitted through the thigh',
                                'Hook and bar closure, zip fly, buttoned back welt pockets, slant hand pockets',
                                'Virgin Wool / Polyester / Spandex',
                                'Dry clean only • Imported'
                            ]
                        }
                    ]
                },
                {
                    name: 'The Statesman',
                    epithet: 'Distinction tailored in layers.',
                    price: '1100',
                    colors: ['Chalk Grey', 'Dark Sea Blue', 'Jet Black'],
                    suitSizing: {
                        fits: ['Extra Slim', 'Slim', 'Classic', 'Relaxed'],
                        jacketFits: ['Short', 'Regular', 'Long'],
                        jacketSizes: ['36', '38', '39', '40', '42', '44', '48'],
                        vestSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
                        pantWaist: ['28', '29', '30', '31', '32', '33', '34', '36', '38'],
                        pantLength: ['28', '30', '32', '34', '36']
                    },
                    specsColumns: [
                        {
                            header: 'Blazer',
                            items: [
                                'Wrinkle-resistant wool blend with controlled stretch for uncompromised form',
                                'Notch lapels, two-button front, flap pockets, and center-back vent',
                                'Virgin Wool / Polyester / Spandex blend',
                                'Dry clean only • Imported'
                            ]
                        },
                        {
                            header: 'Vest',
                            items: [
                                'Slim fit through the shoulders and chest for a defined silhouette',
                                'Full button front, slant x  welt pockets, and adjustable slide-back tab',
                                'Fully lined interior for durability and structure',
                                'Virgin Wool / Polyester / Spandex blend',
                                'Dry clean only • Imported'
                            ]
                        },
                        {
                            header: 'Pants',
                            items: [
                                'Coordinating trousers designed for structured comfort and streamlined motion',
                                'Low-rise waist, tapered thigh, hook-and-bar closure, buttoned welt pockets',
                                'Fully lined for comfort and longevity',
                                'Virgin Wool / Polyester / Spandex blend',
                                'Dry clean only • Imported'
                            ]
                        }
                    ]
                }
            ]
        }
    ]

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    useEffect(() => {
        const el = scrollRef.current
        if (!el) return

        const scroll = new LocomotiveScroll({
            el: el,
            smooth: true,
            multiplier: 1,
            class: 'is-revealed'
        })
        locomotiveRef.current = scroll

        // Sync GSAP ScrollTrigger with Locomotive Scroll
        scroll.on('scroll', ScrollTrigger.update)

        ScrollTrigger.scrollerProxy(el, {
            scrollTop(value) {
                return arguments.length ? scroll.scrollTo(value, 0, 0) : scroll.scroll.instance.scroll.y
            },
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }
            },
            pinType: el.style.transform ? "transform" : "fixed"
        })

        ScrollTrigger.addEventListener('refresh', () => scroll.update())
        ScrollTrigger.refresh()

        let resizeTimeout;
        const resizeObserver = new ResizeObserver(() => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (scroll) scroll.update()
            }, 150);
        })
        resizeObserver.observe(document.body)
        if (el) {
            resizeObserver.observe(el)
            const wrappers = el.querySelectorAll('.category-wrapper, .house-of-crowns-section')
            wrappers.forEach(w => resizeObserver.observe(w))
        }

        // Ensure Locomotive Scroll recalculates heights when images and iframes load to prevent overlapping sections
        const images = el.querySelectorAll('img');
        images.forEach((img) => {
            if (img.complete) {
                if (scroll) scroll.update()
            }
            img.addEventListener('load', () => {
                if (scroll) scroll.update()
            });
        });

        const iframes = el.querySelectorAll('iframe');
        iframes.forEach((iframe) => {
            iframe.addEventListener('load', () => {
                if (scroll) scroll.update()
            });
        });

        // Intercept pinch-to-zoom (ctrlKey + wheel) to prevent Locomotive Scroll from massive jumps
        const handleWheel = (e) => {
            if (e.ctrlKey) {
                e.stopImmediatePropagation()
            }
        }
        window.addEventListener('wheel', handleWheel, { passive: false })

        // Intersection Observer for Active Section
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id)
                }
            })
        }, { threshold: 0.3 })

        const sectionElements = document.querySelectorAll('.category-wrapper section.hero')
        sectionElements.forEach(el => observer.observe(el))

        return () => {
            resizeObserver.disconnect()
            window.removeEventListener('wheel', handleWheel)
            if (scroll) scroll.destroy()
            ScrollTrigger.getAll().forEach(t => t.kill())
            observer.disconnect()
        }
    }, [])

    // Handle initial hash navigation
    useEffect(() => {
        if (locomotiveRef.current && window.location.hash) {
            const id = window.location.hash.substring(1)
            const target = document.getElementById(id)
            if (target) {
                // Small timeout to ensure layout is ready
                setTimeout(() => {
                    locomotiveRef.current.scrollTo(target)
                }, 100)
            }
        }
    }, [locomotiveRef.current])

    return (
        <div className="shop-page">
            <CartDrawer />
            
            {/* Left Navigation Bar */}
            <nav 
                className={`shop-left-nav ${navOpen ? 'nav-open' : ''}`}
                onMouseEnter={() => window.innerWidth > 768 && setNavOpen(true)}
                onMouseLeave={() => window.innerWidth > 768 && setNavOpen(false)}
                onClick={() => {
                    if (window.innerWidth <= 768 && !navOpen) {
                        setNavOpen(true)
                    }
                }}
            >
                <ul>
                    {sections.map((s, idx) => {
                        const id = s.title.toLowerCase()
                        return (
                            <li 
                                key={idx} 
                                className={activeSection === id ? 'active' : ''}
                                onClick={(e) => {
                                    e.preventDefault()
                                    if (window.innerWidth <= 768 && !navOpen) {
                                        return;
                                    }
                                    e.stopPropagation()
                                    const target = document.getElementById(id)
                                    if (target && locomotiveRef.current) {
                                        locomotiveRef.current.scrollTo(target)
                                        if (window.innerWidth <= 768) setNavOpen(false)
                                    }
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                <a href={`#${id}`}>
                                    {s.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            <Header onMenuClick={toggleMenu} />
            <MenuOverlay
                isOpen={menuOpen}
                onClose={toggleMenu}
                scrollToSection={(id) => {
                    const target = document.getElementById(id)
                    if (target && locomotiveRef.current) {
                        locomotiveRef.current.scrollTo(target)
                    }
                }}
            />

            <div data-scroll-container ref={scrollRef} className="main-container">
                <div data-scroll-section>
                    {/* Render each section with Hero + Products */}
                    {sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="category-wrapper">
                        {/* Hero Section */}
                        <section id={section.title.toLowerCase()} className={`section hero tier-${section.title.toLowerCase()}`}>
                            <h1 data-scroll data-scroll-speed="2">{section.title}</h1>
                            <p data-scroll data-scroll-speed="1">{section.epithet}</p>
                            <img
                                src={section.image}
                                alt={section.title}
                                className="hero-image"
                                data-scroll
                                data-scroll-speed="0.5"
                            />
                            {section.body && (
                                <p className="hero-body" data-scroll data-scroll-speed="0.8">
                                    {section.body}
                                </p>
                            )}
                        </section>

                        {/* Coming Soon or Product Displays */}
                        {section.comingSoon ? (
                            <ComingSoon sectionTitle={section.title} />
                        ) : (
                            section.products.map((product, productIndex) => (
                                <ProductDisplay
                                    key={productIndex}
                                    product={{
                                        title: product.name || section.title,
                                        epithet: product.epithet,
                                        num: section.num,
                                        price: product.price,
                                        image: section.image,
                                        images: product.images,
                                        colors: product.colors,
                                        sizes: product.sizes,
                                        specs: product.specs,
                                        specsColumns: product.specsColumns,
                                        suitSizing: product.suitSizing
                                    }}
                                    sectionLogo={`/${section.title.toLowerCase()}.svg`}
                                    reversed={productIndex % 2 === 1}
                                />
                            ))
                        )}
                    </div>
                ))}

                {/* House of Crowns Link */}
                <HouseOfCrowns number="07" />
                </div>

                <footer className="footer" data-scroll-section>
                    <p>© 2025 SOPHISTICATED IGNORANCE</p>
                </footer>
            </div>
        </div>
    )
}

export default Shop
