import { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import './Shop.scss'
import ProductDisplay from '../components/ProductDisplay'
import HouseOfCrowns from '../components/HouseOfCrowns'
import ComingSoon from '../components/ComingSoon'
import Header from '../components/Header'
import MenuOverlay from '../components/MenuOverlay'
import CartDrawer from '../components/CartDrawer'
import MobileCategoryIntro from '../components/MobileCategoryIntro'
import MobileBottomSheet from '../components/MobileBottomSheet'
import { useCart } from '../context/CartContext'
import { sections } from '../data/catalogue'

gsap.registerPlugin(ScrollTrigger)

function Shop() {
    const { productId } = useParams()
    const navigate = useNavigate()
    const scrollRef = useRef(null)
    const [menuOpen, setMenuOpen] = useState(false)
    const [navOpen, setNavOpen] = useState(false)
    const [activeSection, setActiveSection] = useState('foundations')
    const { isCartOpen } = useCart()

    const toggleMenu = () => {
        setMenuOpen(!menuOpen)
    }

    // Initialize ScrollTrigger
    useEffect(() => {
        // Ensure ScrollTrigger uses the native scroll container (window)
        ScrollTrigger.defaults({
            scroller: window
        })
        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill())
        }
    }, [])

    // Scroll mapping logic for deep links
    useLayoutEffect(() => {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual'
        }

        // Wait a tick for React to mount the shells
        const timer = setTimeout(() => {
            const targetId = productId || sessionStorage.getItem('lastActiveSlug')
            if (targetId) {
                const target = document.getElementById(targetId)
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop,
                        behavior: 'instant'
                    })
                    setActiveSection(targetId)
                }
            } else {
                window.scrollTo(0, 0)
            }
        }, 50)

        return () => clearTimeout(timer)
    }, []) // Run once on mount

    // Dynamic scroll tracking for URL updates and Nav sync
    useEffect(() => {
        let scrollTimeout;
        const handleScroll = () => {
            if (scrollTimeout) return;
            scrollTimeout = setTimeout(() => {
                scrollTimeout = null;
                const viewportHeight = window.innerHeight;
                
                // Find what element is currently taking up the majority of the viewport
                let currentActive = null;
                const elements = document.querySelectorAll('.hero, .product-display-section, .house-of-crowns-section');
                
                for (const el of elements) {
                    const rect = el.getBoundingClientRect();
                    // If the element's top is above the middle of the screen and bottom is below the middle
                    if (rect.top <= viewportHeight / 2 && rect.bottom >= viewportHeight / 2) {
                        currentActive = el.id;
                        break;
                    }
                }
                
                if (currentActive && currentActive !== activeSection) {
                    setActiveSection(currentActive);
                    // Update URL without pushing state to avoid breaking back button
                    if (productId !== currentActive) {
                        window.history.replaceState(null, '', `/shop/${currentActive}`);
                        sessionStorage.setItem('lastActiveSlug', currentActive);
                    }
                }
            }, 100); // Debounce
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeSection, productId]);

    // Resize preservation logic
    useEffect(() => {
        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const targetId = sessionStorage.getItem('lastActiveSlug');
                if (targetId) {
                    const target = document.getElementById(targetId);
                    if (target) {
                        window.scrollTo({
                            top: target.offsetTop,
                            behavior: 'instant'
                        });
                    }
                }
            }, 150);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleNavClick = (id, e) => {
        if (e) e.preventDefault()
        if (e) e.stopPropagation()
        const target = document.getElementById(id)
        if (target) {
            // Get the element's position relative to the viewport and add current scroll
            const rect = target.getBoundingClientRect();
            const absoluteTop = rect.top + window.scrollY;
            window.scrollTo({
                top: absoluteTop,
                behavior: 'smooth'
            })
            if (window.innerWidth > 768) setNavOpen(false)
        }
    }

    return (
        <div className="shop-page">
            <CartDrawer />
            
            {/* Left Navigation Bar */}
            <nav 
                className={`shop-left-nav desktop-only ${navOpen ? 'nav-open' : ''}`}
                onMouseEnter={() => window.innerWidth > 768 && setNavOpen(true)}
                onMouseLeave={() => window.innerWidth > 768 && setNavOpen(false)}
            >
                <ul>
                    {sections.map((s, idx) => {
                        const id = s.id
                        return (
                            <li 
                                key={idx} 
                                className={activeSection === id ? 'active' : ''}
                                onClick={(e) => handleNavClick(id, e)}
                                style={{ cursor: 'pointer' }}
                            >
                                <a href={`/shop/${id}`} onClick={(e) => e.preventDefault()}>
                                    {s.title}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            </nav>

            <MobileBottomSheet 
                sections={sections} 
                activeSection={activeSection} 
                onNavClick={handleNavClick} 
            />

            <Header onMenuClick={toggleMenu} />
            <MenuOverlay
                isOpen={menuOpen}
                onClose={toggleMenu}
                scrollToSection={(id) => {
                    const target = document.getElementById(id)
                    if (target) {
                        window.scrollTo({
                            top: target.offsetTop,
                            behavior: 'smooth'
                        })
                    }
                }}
            />

            <div ref={scrollRef} className="main-container">
                {sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="category-wrapper" id={section.id}>
                        {/* Hero Section */}
                        <div className="desktop-category-intro">
                            <section className={`section hero tier-${section.id}`}>
                                <h1 className="hero-title">{section.title}</h1>
                                <p className="hero-epithet">{section.epithet}</p>
                                <img
                                    src={section.image}
                                    alt={section.title}
                                    className="hero-image"
                                />
                                {section.body && (
                                    <p className="hero-body">
                                        {section.body}
                                    </p>
                                )}
                            </section>
                        </div>
                        <div className="mobile-category-intro-wrapper">
                            <MobileCategoryIntro section={section} />
                        </div>

                        {/* Coming Soon or Product Displays */}
                        {section.comingSoon ? (
                            <ComingSoon sectionTitle={section.title} />
                        ) : (
                            section.products.map((product, productIndex) => (
                                <ProductDisplay
                                    key={product.id}
                                    id={product.id}
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
                                    sectionLogo={`/${section.id}.svg`}
                                    reversed={productIndex % 2 === 1}
                                />
                            ))
                        )}
                    </div>
                ))}

                {/* House of Crowns Link */}
                <HouseOfCrowns number="07" />

                <footer className="footer">
                    <p>© 2025 SOPHISTICATED IGNORANCE</p>
                </footer>
            </div>
        </div>
    )
}

export default Shop
