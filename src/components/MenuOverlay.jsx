import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { useAuth } from '../context/AuthContext'
import './MenuOverlay.css'

function MenuOverlay({ isOpen, onClose, scrollToSection }) {
    const navigate = useNavigate()
    const location = useLocation()
    const { user, logout } = useAuth()
    const [shopOpen, setShopOpen] = useState(false)
    const [email, setEmail] = useState('')

    const shopItems = [
        'FOUNDATIONS',
        'FORTIFICATIONS',
        'RELICS',
        'DOMINION',
        'ADORNMENTS',
        'CROWNWORKS',
        'HOUSE OF CROWNS'
    ]

    // Reset shop dropdown when menu closes
    useEffect(() => {
        if (!isOpen) {
            setShopOpen(false)
        }
    }, [isOpen])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose()
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [isOpen, onClose])

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
        const sectionId = item.toLowerCase().replace(/ /g, '-')
        if (location.pathname === '/shop' || location.pathname.startsWith('/shop/')) {
            if (scrollToSection) {
                scrollToSection(sectionId)
            }
        } else {
            navigate(`/shop/${sectionId}`)
        }
        onClose()
    }

    const handleNewsletterSubmit = async (e) => {
        e.preventDefault()
        if (!email) return
        
        try {
            await addDoc(collection(db, 'newsletter_subscriptions'), {
                email,
                timestamp: serverTimestamp()
            })
            alert('Successfully subscribed to the CIRE newsletter!')
            setEmail('')
        } catch (error) {
            console.error('Error adding document: ', error)
            alert('There was an error. Make sure Firebase config is set up.')
        }
    }

    return (
        <div className={`menu-overlay ${isOpen ? 'open' : ''}`}>
            <button className="close-btn" onClick={onClose}>×</button>
            
            <div className="menu-scroll-container">
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
                                    href={`/shop/${item.toLowerCase().replace(/ /g, '-')}`} 
                                    className="shop-sublink elegant" 
                                    onClick={(e) => handleShopSectionClick(e, item)}
                                    style={{ animationDelay: `${0.3 + (index * 0.05)}s` }}
                                >
                                    <span className="idx" style={{ opacity: 0.3 }}>{String(index + 1).padStart(2, '0')} — </span>
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>

                    <a href="https://cireconglomerate.com" target="_blank" rel="noopener noreferrer" className="menu-link">CIRE CONGLOMERATE</a>
                    <a href="#the-continuum" className="menu-link continuum-link" data-hover="COMING SOON">THE CONTINUUM</a>
                    
                    {user ? (
                        <>
                            {user.email === 'cireconglomerate@gmail.com' && (
                                <a href="/house-admin" className="menu-link" onClick={(e) => { e.preventDefault(); navigate('/house-admin'); onClose(); }}>HOUSE ADMIN</a>
                            )}
                            <a href="/dashboard" className="menu-link" onClick={(e) => { e.preventDefault(); navigate('/dashboard'); onClose(); }}>MY ACCOUNT</a>
                            <button className="menu-link" style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: 0.5, marginTop: '20px', display: 'block', padding: 0 }} onClick={async () => { await logout(); onClose(); }}>LOG OUT</button>
                        </>
                    ) : (
                        <a href="/login" className="menu-link" onClick={(e) => { e.preventDefault(); navigate('/login'); onClose(); }}>LOGIN</a>
                    )}

                    <a href="#contact" className="menu-link">CONTACT</a>

                    {/* CONNECT Section with Social Icons */}
                    <div className="menu-connect">
                        <span className="menu-label">CONNECT</span>
                        <div className="menu-social-icons">
                            <a href="https://www.instagram.com/cireconglomerate/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Instagram">
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
            </div>

            {/* Newsletter Section */}
            <div className="menu-newsletter">
                <p className="newsletter-label">NEWSLETTER</p>
                <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="newsletter-field" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit" className="newsletter-btn">→</button>
                </form>
            </div>
        </div>
    )
}

export default MenuOverlay

