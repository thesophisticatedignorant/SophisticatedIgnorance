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
    const { isCartOpen } = useCart()

    // Section data with names, epithets, and products
    const sections = [
        {
            title: 'FOUNDATIONS',
            epithet: 'the architecture of self',
            num: '01',
            image: '/foundations.svg',
            body: 'Foundations serves as the base layer of refinement: the stepping stones of your wardrobe, designed for structure, comfort, and everyday uniformity. Through simplicity and precision, Foundations defines the essentials that ground identity — where form takes shape and sophistication begins.',
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
                    sizes: [
                        { size: 'S', soldOut: false },
                        { size: 'M', soldOut: false },
                        { size: 'L', soldOut: false },
                        { size: 'XL', soldOut: false },
                        { size: 'XXL', soldOut: false }
                    ],
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
            body: 'Fortifications represents defense through design — luxurious garments built as armor. Each piece in this tier acts as both protection and proclamation — constructed to endure, engineered to impress.',
            products: [
                {
                    name: 'The Contradiction',
                    epithet: 'Elegance built on chaos.',
                    price: '420',
                    colors: ['Black', 'White', 'Red'],
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
                    colors: ['Ivory'],
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
            body: 'Relics serve as the tactile memory of the brand: timeless leather goods that embody strength through subtlety and refinement through utility. Each piece is designed to be carried, aged, and remembered.',
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
            body: 'Dominion represents progression through motion — the pursuit of power made physical. Footwear engineered for elevation, designed to command every step. Each piece in this tier symbolizes forward momentum.',
            comingSoon: true,
            products: []
        },
        {
            title: 'ADORNMENTS',
            epithet: 'the reign of detail',
            num: '05',
            image: '/adornments.svg',
            body: 'Adornments embodies refinement through subtlety — accessories that command attention without excess. Each piece in this tier celebrates intention — where the details evoke dominance.',
            comingSoon: true,
            products: []
        },
        {
            title: 'CROWNWORKS',
            epithet: 'the pinnacle of refinement',
            num: '06',
            image: '/crownworks.svg',
            body: 'Crownworks represents the embodiment of power perfected in presentation: garments crafted for moments of command, ceremony, and consequence. Each creation in this tier signifies composure under pressure — the discipline to remain regal, the elegance to move with authority.',
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

        return () => {
            if (scroll) scroll.destroy()
            ScrollTrigger.getAll().forEach(t => t.kill())
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
            <div data-scroll-container ref={scrollRef} className="main-container">
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

                {/* Render each section with Hero + Products */}
                {sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="category-wrapper">
                        {/* Hero Section */}
                        <section id={section.title.toLowerCase()} className={`section hero tier-${section.title.toLowerCase()}`} data-scroll-section>
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

                <footer className="footer" data-scroll-section>
                    <p>© 2025 SOPHISTICATED IGNORANCE</p>
                </footer>
            </div>
        </div>
    )
}

export default Shop
