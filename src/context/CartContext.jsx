import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function useCart() {
    return useContext(CartContext)
}

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem('cartItems')
            return savedCart ? JSON.parse(savedCart) : []
        } catch (error) {
            console.error('Failed to load cart from localStorage:', error)
            return []
        }
    })

    const [isCartOpen, setIsCartOpen] = useState(false)

    useEffect(() => {
        try {
            localStorage.setItem('cartItems', JSON.stringify(cartItems))
        } catch (error) {
            console.error('Failed to save cart to localStorage:', error)
        }
    }, [cartItems])

    const openCart = () => setIsCartOpen(true)
    const closeCart = () => setIsCartOpen(false)
    const toggleCart = () => setIsCartOpen(prev => !prev)

    const addToCart = (item) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.id === item.id)
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1, image: item.image } : i)
            }
            return [...prev, { ...item, quantity: 1 }]
        })
        // Automatically open cart when adding item
        openCart()
    }

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(i => i.id !== id))
    }

    const updateQuantity = (id, quantity) => {
        if (quantity < 1) {
            removeFromCart(id)
            return
        }
        setCartItems(prev => prev.map(i => i.id === id ? { ...i, quantity } : i))
    }

    const clearCart = () => {
        setCartItems([])
    }

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        isCartOpen,
        openCart,
        closeCart,
        toggleCart
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
