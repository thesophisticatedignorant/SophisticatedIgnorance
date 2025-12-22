import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useCart } from '../context/CartContext'
import './ProductDisplay.scss'

function ProductDisplay({ product, sectionLogo, reversed = false }) {
    const sectionRef = useRef(null)
    const imageRef = useRef(null)
    const titleRef = useRef(null)
    const optionsRef = useRef(null)
    const specsRef = useRef(null)
    const purchaseRef = useRef(null)
    const addToCartBtnRef = useRef(null)
    const [hasAnimated, setHasAnimated] = useState(false)
    const [isAdding, setIsAdding] = useState(false)
    const { addToCart } = useCart()

    // Default sizes if not provided
    const defaultSizes = [
        { size: 'M', soldOut: false },
        { size: 'L', soldOut: false },
        { size: 'XL', soldOut: false },
        { size: '2XL', soldOut: false }
    ]

    // Default specs if not provided
    const defaultSpecs = [
        'Loose fit for a relaxed silhouette',
        'Heavyweight 300GSM fabric',
        '100% cotton — ultra-soft, breathable, and durable',
        'High-density Mazalito Crown silicone print on the back'
    ]

    // Default colors if not provided
    const defaultColors = ['Black', 'White']

    const sizes = product.sizes || defaultSizes
    const specs = product.specs || defaultSpecs
    const colors = product.colors || defaultColors

    const [selectedSize, setSelectedSize] = useState(
        sizes.find(s => !s.soldOut)?.size || 'M'
    )
    const [selectedColor, setSelectedColor] = useState(colors[0])
    const [selectedFit, setSelectedFit] = useState('Classic')
    const [selectedJacketFit, setSelectedJacketFit] = useState('Regular')
    const [selectedJacketSize, setSelectedJacketSize] = useState('40')
    const [selectedPantWaist, setSelectedPantWaist] = useState('32')
    const [selectedPantLength, setSelectedPantLength] = useState('32')
    const [selectedVestSize, setSelectedVestSize] = useState('M')
    const [quantity, setQuantity] = useState(1)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)

    // GSAP Scroll-triggered animations using Intersection Observer
    useEffect(() => {
        const section = sectionRef.current
        if (!section || hasAnimated) return

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setHasAnimated(true)

                        // Animation directions based on reference image arrows
                        const tl = gsap.timeline()

                        // Image: slides from top-right (or top-left if reversed)
                        tl.fromTo(imageRef.current,
                            { opacity: 0, x: reversed ? -50 : 50, y: -30 },
                            { opacity: 1, x: 0, y: 0, duration: 0.8, ease: 'power3.out' }
                        )
                            // Title block: slides from RIGHT (arrow points right → left bracket)
                            .fromTo(titleRef.current,
                                { opacity: 0, x: 60 },
                                { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' },
                                '-=0.5'
                            )
                            // Options: slides from left
                            .fromTo(optionsRef.current,
                                { opacity: 0, x: -50 },
                                { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' },
                                '-=0.3'
                            )
                            // Specs: slides from bottom-left
                            .fromTo(specsRef.current,
                                { opacity: 0, x: -40, y: 30 },
                                { opacity: 1, x: 0, y: 0, duration: 0.5, ease: 'power3.out' },
                                '-=0.2'
                            )
                            // Purchase controls: slides up from bottom
                            .fromTo(purchaseRef.current,
                                { opacity: 0, y: 40 },
                                { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
                                '-=0.2'
                            )

                        observer.disconnect()
                    }
                })
            },
            { threshold: 0.2 }
        )

        observer.observe(section)

        return () => observer.disconnect()
    }, [reversed, hasAnimated])

    const handlePrev = () => {
        console.log('Prev image')
    }

    const handleNext = () => {
        console.log('Next image')
    }

    return (
        <div className="product-display-section" data-scroll-section ref={sectionRef}>
            <div className={`product-container ${reversed ? 'reversed' : ''}`}>
                {/* Left Side - Image Carousel */}
                <div className="product-visual" ref={imageRef}>
                    <div className="carousel-container">
                        <button className="carousel-nav prev" onClick={handlePrev}>←</button>
                        <div className="product-image-wrapper">
                            <img src={product.image || "/placeholder.svg"} alt={product.title} className="product-image" />
                            {sectionLogo && (
                                <img
                                    src={sectionLogo}
                                    alt="Section Logo"
                                    className={`image-watermark ${reversed ? 'bottom-left' : 'bottom-right'}`}
                                />
                            )}
                        </div>
                        <button className="carousel-nav next" onClick={handleNext}>→</button>
                    </div>
                </div>

                {/* Right Side - Details */}
                <div className="product-details" data-scroll data-scroll-speed="2">
                    {/* Watermark Logo - positioned above title */}
                    {/* Title Group - animates together */}
                    <div className="title-group" ref={titleRef}>
                        <h2 className="product-title">{product.title}</h2>
                        {product.epithet && (
                            <p className="product-epithet">{product.epithet}</p>
                        )}
                        <div className="product-price">${product.price || '77.77'}</div>
                    </div>

                    {/* Options Group - animates together */}
                    <div className="product-options" ref={optionsRef}>
                        {/* Suit Sizing with multiple categories */}
                        {product.suitSizing ? (
                            <div className="suit-sizing">
                                {/* Color - spans full width */}
                                <div className="size-category full-width">
                                    <span className="category-label"><strong>Color</strong></span>
                                    <div className="size-row">
                                        {colors.map((color, index) => (
                                            <button
                                                key={index}
                                                className={`size-btn ${selectedColor === color ? 'active' : ''}`}
                                                onClick={() => setSelectedColor(color)}
                                            >
                                                {color}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Fit - Body fit style */}
                                <div className="size-category">
                                    <span className="category-label"><strong>Fit</strong></span>
                                    <div className="size-row">
                                        {product.suitSizing.fits.map((fit, index) => (
                                            <button
                                                key={index}
                                                className={`size-btn ${selectedFit === fit ? 'active' : ''}`}
                                                onClick={() => setSelectedFit(fit)}
                                            >
                                                {fit}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Jacket Fit - Length fit */}
                                <div className="size-category">
                                    <span className="category-label"><strong>Jacket Fit</strong></span>
                                    <div className="size-row">
                                        {product.suitSizing.jacketFits.map((fit, index) => (
                                            <button
                                                key={index}
                                                className={`size-btn ${selectedJacketFit === fit ? 'active' : ''}`}
                                                onClick={() => setSelectedJacketFit(fit)}
                                            >
                                                {fit}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Jacket Size */}
                                <div className="size-category">
                                    <span className="category-label"><strong>Jacket Size</strong></span>
                                    <div className="size-row">
                                        {product.suitSizing.jacketSizes.map((size, index) => (
                                            <button
                                                key={index}
                                                className={`size-btn ${selectedJacketSize === size ? 'active' : ''}`}
                                                onClick={() => setSelectedJacketSize(size)}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Vest Size - only if product has vest */}
                                {product.suitSizing.vestSizes && (
                                    <div className="size-category">
                                        <span className="category-label"><strong>Vest Size</strong></span>
                                        <div className="size-row">
                                            {product.suitSizing.vestSizes.map((size, index) => (
                                                <button
                                                    key={index}
                                                    className={`size-btn ${selectedVestSize === size ? 'active' : ''}`}
                                                    onClick={() => setSelectedVestSize(size)}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Pant Waist */}
                                <div className="size-category">
                                    <span className="category-label"><strong>Pant Waist</strong></span>
                                    <div className="size-row">
                                        {product.suitSizing.pantWaist.map((size, index) => (
                                            <button
                                                key={index}
                                                className={`size-btn ${selectedPantWaist === size ? 'active' : ''}`}
                                                onClick={() => setSelectedPantWaist(size)}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Pant Length */}
                                <div className="size-category">
                                    <span className="category-label"><strong>Pant Length</strong></span>
                                    <div className="size-row">
                                        {product.suitSizing.pantLength.map((size, index) => (
                                            <button
                                                key={index}
                                                className={`size-btn ${selectedPantLength === size ? 'active' : ''}`}
                                                onClick={() => setSelectedPantLength(size)}
                                            >
                                                {size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="non-suit-options">
                                {/* Color for non-suit products */}
                                <div className="size-category">
                                    <span className="category-label"><strong>Color</strong></span>
                                    <div className="size-row">
                                        {colors.map((color, index) => (
                                            <button
                                                key={index}
                                                className={`size-btn ${selectedColor === color ? 'active' : ''}`}
                                                onClick={() => setSelectedColor(color)}
                                            >
                                                {color}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="size-category">
                                    <span className="category-label"><strong>Size</strong></span>
                                    <div className="size-row">
                                        {sizes.map((sizeObj, index) => (
                                            <button
                                                key={index}
                                                className={`size-btn ${selectedSize === sizeObj.size ? 'active' : ''} ${sizeObj.soldOut ? 'sold-out' : ''}`}
                                                onClick={() => !sizeObj.soldOut && setSelectedSize(sizeObj.size)}
                                                disabled={sizeObj.soldOut}
                                            >
                                                {sizeObj.soldOut ? <s>{sizeObj.size}</s> : sizeObj.size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Specs Group - animates together */}
                    <div className="specs-group" ref={specsRef}>
                        {product.specsColumns ? (
                            <div className="product-specs-columns">
                                {Array.isArray(product.specsColumns) && product.specsColumns.map((col, index) => (
                                    <div key={index} className="specs-column">
                                        {col.header && <h4>{col.header}</h4>}
                                        <ul>
                                            {col.items?.map((item, itemIndex) => {
                                                const isObject = typeof item === 'object';
                                                const text = isObject ? item.text : item;
                                                const isIndented = isObject ? item.indent : false;
                                                return (
                                                    <li
                                                        key={itemIndex}
                                                        className={isIndented ? 'indented' : ''}
                                                    >
                                                        {text}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <ul className="product-specs">
                                {specs.map((spec, index) => (
                                    <li key={index}>{spec}</li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Purchase Group - animates from bottom */}
                    <div className="purchase-controls" ref={purchaseRef}>
                        <div className="quantity-selector">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                            <span>{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)}>+</button>
                        </div>
                        <button
                            className={`add-to-cart-btn ${isAdding ? 'adding' : ''}`}
                            ref={addToCartBtnRef}
                            onClick={() => {
                                setIsAdding(true)

                                // Create unique ID for cart item
                                const itemId = `${product.title}-${selectedColor}-${product.suitSizing ? `${selectedFit}-${selectedJacketSize}-${selectedPantWaist}` : selectedSize}`

                                addToCart({
                                    id: itemId,
                                    title: product.title,
                                    price: product.price,
                                    color: selectedColor,
                                    size: product.suitSizing ? `${selectedJacketSize} / ${selectedPantWaist}x${selectedPantLength}` : selectedSize,
                                    quantity: quantity,
                                    image: sectionLogo
                                })

                                // Button animation
                                gsap.to(addToCartBtnRef.current, {
                                    scale: 0.95,
                                    duration: 0.1,
                                    yoyo: true,
                                    repeat: 1,
                                    onComplete: () => {
                                        setTimeout(() => setIsAdding(false), 1500)
                                    }
                                })
                            }}
                            disabled={isAdding}
                        >
                            <span className="btn-text">{isAdding ? 'ADDED TO BAG' : 'ADD TO BAG'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDisplay
