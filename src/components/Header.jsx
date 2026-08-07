import './Header.css'
import CartButton from './CartButton'

function Header({ onMenuClick }) {
    return (
        <header className="header">
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
