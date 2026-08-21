import { useState, useEffect } from 'react'
import './Header.css'
import CartButton from './CartButton'

function Header({ onMenuClick, isVisible = true }) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        // Initial check
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`header ${isVisible ? 'visible' : 'hidden'} ${scrolled ? 'scrolled' : 'transparent'}`}>
            {/* Menu Button */}
            <button className="menu-btn" onClick={onMenuClick}>
                <span className="menu-line"></span>
                <span className="menu-line"></span>
                <span className="menu-line"></span>
            </button>

            {/* Centered Logo */}
            <div className="logo-container">
                <a href="/">
                    <img src="/header%20logo.svg" alt="Sophisticated Ignorance" className="header-logo" />
                </a>
            </div>

            {/* Placeholder for right side - for balance */}
            {/* Cart Button */}
            <div className="header-right">
                <CartButton />
            </div>
        </header>
    )
}

export default Header
