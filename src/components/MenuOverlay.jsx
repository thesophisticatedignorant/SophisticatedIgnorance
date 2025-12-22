import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './MenuOverlay.css'

function MenuOverlay({ isOpen, onClose, scrollToSection }) {
    const navigate = useNavigate()
    const location = useLocation()
    const [shopOpen, setShopOpen] = useState(false)

    const shopItems = [
        'FOUNDATIONS',
        'FORTIFICATIONS',
        'RELICS',
        'DOMINION',
        'ADORNMENTS',
        'CROWNWORKS'
    ]

    // Reset shop dropdown when menu closes
    useEffect(() => {
        if (!isOpen) {
            setShopOpen(false)
        }
    }, [isOpen])

    const handleHomeClick = (e) => {
        e.preventDefault()
        if (location.pathname === '/') {
            // If already on home, maybe scroll to top or just close
            onClose()
        } else {
            navigate('/')
            onClose()
        }
    }

    const handleShopSectionClick = (e, item) => {
        e.preventDefault()
        const sectionId = item.toLowerCase()
        if (location.pathname === '/shop') {
            if (scrollToSection) {
                scrollToSection(sectionId)
            }
        } else {
            navigate(`/shop#${sectionId}`)
        }
        onClose()
    }

    return (
        <div className={`menu-overlay ${isOpen ? 'open' : ''}`}>
            <button className="close-btn" onClick={onClose}>×</button>
            <nav className="menu-nav">
                <a href="/" className="menu-link" onClick={handleHomeClick}>HOME</a>

                {/* SHOP with nested dropdown */}
                <div className="menu-dropdown">
                    <button
                        className="menu-link menu-dropdown-trigger"
                        onClick={() => setShopOpen(!shopOpen)}
                    >
                        SHOP {shopOpen ? '−' : '+'}
                    </button>
                    <div className={`menu-dropdown-content ${shopOpen ? 'open' : ''}`}>
                        {shopItems.map((item, index) => (
                            <a
                                key={index}
                                href={`#${item.toLowerCase()}`}
                                className="menu-dropdown-link"
                                onClick={(e) => handleShopSectionClick(e, item)}
                                style={{
                                    transition: shopOpen
                                        ? `opacity 0.3s ease ${index * 60}ms, transform 0.3s ease ${index * 60}ms, color 0.15s ease 0s, background 0.15s ease 0s, box-shadow 0.15s ease 0s`
                                        : 'opacity 0.3s ease 0s, transform 0.3s ease 0s, color 0.15s ease 0s, background 0.15s ease 0s, box-shadow 0.15s ease 0s'
                                }}
                            >
                                {item}
                            </a>
                        ))}
                        {/* House of Crowns - Section Link */}
                        <a
                            href="#house-of-crowns"
                            className="menu-dropdown-link"
                            onClick={(e) => handleShopSectionClick(e, 'house-of-crowns')}
                            style={{
                                transition: shopOpen
                                    ? `opacity 0.3s ease ${shopItems.length * 60}ms, transform 0.3s ease ${shopItems.length * 60}ms, color 0.15s ease 0s, background 0.15s ease 0s, box-shadow 0.15s ease 0s`
                                    : 'opacity 0.3s ease 0s, transform 0.3s ease 0s, color 0.15s ease 0s, background 0.15s ease 0s, box-shadow 0.15s ease 0s'
                            }}
                        >
                            HOUSE OF CROWNS
                        </a>
                    </div>
                </div>

                <a href="#maison-manifest" className="menu-link">MAISON MANIFEST</a>
                <a href="#the-continuum" className="menu-link">THE CONTINUUM</a>
                <a href="#contact" className="menu-link">CONTACT</a>

                {/* CONNECT Section with Social Icons */}
                <div className="menu-connect">
                    <span className="menu-label">CONNECT</span>
                    <div className="menu-social-icons">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                <circle cx="12" cy="12" r="4" />
                                <circle cx="18" cy="6" r="1.5" fill="currentColor" stroke="none" />
                            </svg>
                        </a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="YouTube">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <rect x="2" y="4" width="20" height="16" rx="3" ry="3" />
                                <polygon points="10,8 16,12 10,16" fill="currentColor" stroke="none" />
                            </svg>
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z" />
                            </svg>
                        </a>
                        <a href="https://music.apple.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Apple Music">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M9 18V5l12-2v13" />
                                <circle cx="6" cy="18" r="3" />
                                <circle cx="18" cy="16" r="3" />
                            </svg>
                        </a>
                        <a href="https://podcasts.apple.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Podcast">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                                <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3v5z" />
                                <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3v5z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </nav>

            {/* Newsletter Section - Fixed at bottom */}
            <div className="menu-newsletter">
                <p className="newsletter-label">NEWSLETTER</p>
                <div className="newsletter-form">
                    <input type="email" placeholder="Enter your email" className="newsletter-field" />
                    <button className="newsletter-btn">→</button>
                </div>
            </div>
        </div>
    )
}

export default MenuOverlay

