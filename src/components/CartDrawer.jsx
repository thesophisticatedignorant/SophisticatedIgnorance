import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { useCart } from '../context/CartContext'
import './CartDrawer.scss'

function CartDrawer() {
    const { cartItems, removeFromCart, updateQuantity, isCartOpen, closeCart, cartCount } = useCart()
    const drawerRef = useRef(null)
    const overlayRef = useRef(null)
    const contentRef = useRef(null)

    useEffect(() => {
        if (isCartOpen) {
            // Animate open
            gsap.to(overlayRef.current, {
                opacity: 1,
                duration: 0.3,
                ease: 'power2.out'
            })
            gsap.to(drawerRef.current, {
                x: 0,
                duration: 0.4,
                ease: 'power3.out'
            })
            // Animate items in
            gsap.fromTo(
                contentRef.current?.querySelectorAll('.cart-item'),
                { opacity: 0, x: 30 },
                { opacity: 1, x: 0, duration: 0.3, stagger: 0.05, delay: 0.2 }
            )
            document.body.style.overflow = 'hidden'
        } else {
            // Animate close
            gsap.to(overlayRef.current, {
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in'
            })
            gsap.to(drawerRef.current, {
                x: '100%',
                duration: 0.3,
                ease: 'power3.in'
            })
            document.body.style.overflow = ''
        }
    }, [isCartOpen])

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.price) || 0
            return total + (price * item.quantity)
        }, 0).toFixed(2)
    }

    return (
        <>
            <div
                className={`cart-overlay ${isCartOpen ? 'active' : ''}`}
                ref={overlayRef}
                onClick={closeCart}
            />
            <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`} ref={drawerRef}>
                <div className="cart-header">
                    <h2>YOUR BAG ({cartCount})</h2>
                    <button className="close-btn" onClick={closeCart} aria-label="Close cart">
                        ×
                    </button>
                </div>

                <div className="cart-content" ref={contentRef}>
                    {cartItems.length === 0 ? (
                        <div className="cart-empty">
                            <p>Your shopping bag is empty</p>
                        </div>
                    ) : (
                        <>
                            <div className="cart-items">
                                {cartItems.map((item) => (
                                    <div key={item.id} className="cart-item">
                                        <div className="item-image">
                                            {item.image && <img src={item.image} alt={item.title} />}
                                        </div>
                                        <div className="item-details">
                                            <h4>{item.title}</h4>
                                            <p className="item-meta">
                                                {item.color && <span>{item.color}</span>}
                                                {item.size && <span> / {item.size}</span>}
                                            </p>
                                            <div className="item-quantity">
                                                <button
                                                    className="qty-btn"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    −
                                                </button>
                                                <span className="qty-value">{item.quantity}</span>
                                                <button
                                                    className="qty-btn"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <p className="item-price">${item.price}</p>
                                        </div>
                                        <button
                                            className="remove-btn"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            REMOVE
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="cart-footer">
                                <div className="cart-total">
                                    <span>TOTAL</span>
                                    <span>${calculateTotal()}</span>
                                </div>
                                <button className="checkout-btn">
                                    PROCEED TO CHECKOUT
                                </button>
                                <button className="continue-btn" onClick={closeCart}>
                                    CONTINUE SHOPPING
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default CartDrawer
