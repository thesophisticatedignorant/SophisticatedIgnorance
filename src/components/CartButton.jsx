import { useCart } from '../context/CartContext'
import './CartButton.css'

function CartButton() {
    const { cartCount, openCart } = useCart()

    return (
        <button className="cart-btn" aria-label="Cart" onClick={openCart}>
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="cart-icon"
            >
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            {cartCount > 0 && (
                <span className="cart-count">{cartCount}</span>
            )}
        </button>
    )
}

export default CartButton
