import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useCart } from '../context/CartContext'
import './ProductDisplay.scss'
import InteractiveViewer from './InteractiveViewer'

const Dropdown = ({ label, options, selected, onSelect, renderOption, disabledOption }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="custom-dropdown" tabIndex="0" onBlur={() => setIsOpen(false)}>
            <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
                <span className="dropdown-label">{label}: </span>
                <span className="dropdown-selected">{renderOption ? renderOption(selected) : selected}</span>
                <span className="dropdown-arrow" style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}>▼</span>
            </div>
            {isOpen && (
                <div className="dropdown-menu">
                    {options.map((opt, i) => {
                        const isDisabled = disabledOption ? disabledOption(opt) : false;
                        return (
                            <div 
                                key={i} 
                                className={`dropdown-item ${isDisabled ? 'disabled' : ''} ${selected === opt ? 'active' : ''}`} 
                                onClick={() => {
                                    if (!isDisabled) {
                                        onSelect(opt);
                                        setIsOpen(false);
                                    }
                                }}
                            >
                                {renderOption ? renderOption(opt) : opt}
                            </div>
                        )
                    })}
                </div>
            )}
        </div>
    );
};

function ProductDisplay({ id, product, sectionLogo, reversed = false }) {
    const sectionRef = useRef(null)
    const imageRef = useRef(null)
    const titleRef = useRef(null)
    const optionsRef = useRef(null)
    const specsRef = useRef(null)
    const purchaseRef = useRef(null)
    const addToCartBtnRef = useRef(null)
    const [hasAnimated, setHasAnimated] = useState(false)
    const [isInView, setIsInView] = useState(false)
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
    const colors = [...(product.colors || defaultColors)].sort()
    const isStatesman = product.title === 'The Statesman' || product.id === 'dominion'

    const [selectedSize, setSelectedSize] = useState(
        sizes.find(s => !s.soldOut && s.size === 'L')?.size || sizes.find(s => !s.soldOut)?.size || 'L'
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

    const images = product.images || [product.image || "/placeholder.svg", "/placeholder.svg", "/placeholder.svg"]

    // Sync image carousel with selected color
    useEffect(() => {
        if (!selectedColor || !images || images.length === 0) return;
        const colorLower = selectedColor.toLowerCase();
        // Skip placeholder
        if (images[0] === "/placeholder.svg") return;
        
        const firstMatchIndex = images.findIndex(img => typeof img === 'string' && img.toLowerCase().includes(colorLower));
        if (firstMatchIndex !== -1) {
            setCurrentImageIndex(firstMatchIndex);
        }
    }, [selectedColor, images]);

    // GSAP Scroll-triggered animations using Intersection Observer
    useEffect(() => {
        const section = sectionRef.current
        if (!section || hasAnimated) return

        const loadObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsInView(true)
                        loadObserver.disconnect()
                    }
                })
            },
            { rootMargin: '150% 0px' }
        )
        loadObserver.observe(section)

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

        return () => {
            observer.disconnect()
            loadObserver.disconnect()
        }
    }, [reversed, hasAnimated])

    const handlePrev = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }

    const handleNext = () => {
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }

    const productId = id || (product.title ? product.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '');

    return (
        <div className="product-display-section" ref={sectionRef} id={productId}>
            <div className={`product-container ${reversed ? 'reversed' : ''}`}>
                {/* Left Side - Image Carousel */}
                <div className="product-visual" ref={imageRef}>
                    <div className="carousel-container">
                        <button className="carousel-nav prev" onClick={handlePrev}>←</button>
                        <div className="product-image-wrapper">
                            {/* Placeholder div if we don't have real images yet */}
                            <div className="placeholder-image-bg">
                                {isInView && (
                                    images && images.length > 0 ? (
                                        typeof images[currentImageIndex] === 'object' && images[currentImageIndex].is360 ? (
                                            <InteractiveViewer key={currentImageIndex} frames={images[currentImageIndex].frames} />
                                        ) : (
                                            <img src={images[currentImageIndex]} alt={product.title} className="product-image" />
                                        )
                                    ) : (
                                        <div className="product-image placeholder-fallback" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', height: '100%' }}>
                                            {sectionLogo && <img src={sectionLogo} alt="Placeholder Logo" style={{ width: '40%', opacity: 0.3, filter: 'grayscale(100%) brightness(150%)' }} />}
                                        </div>
                                    )
                                )}
                            </div>
                            {sectionLogo && (
                                <img
                                    src={sectionLogo}
                                    alt="Section Logo"
                                    className={`image-watermark ${reversed ? 'bottom-left' : 'bottom-right'}`}
                                />
                            )}
                        </div>
                        <button className="carousel-nav next" onClick={handleNext}>→</button>
                        
                        {/* Bottom center navigation dots */}
                        <div className="carousel-dots">
                            {images.map((_, idx) => (
                                <div 
                                    key={idx} 
                                    className={`dot ${idx === currentImageIndex ? 'active' : ''}`} 
                                    onClick={() => setCurrentImageIndex(idx)}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side - Details */}
                <div className="product-details">
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
                                {isStatesman ? (
                                    <div className="full-width color-dropdown-wrapper">
                                        <Dropdown 
                                            label="Color" 
                                            options={colors} 
                                            selected={selectedColor} 
                                            onSelect={setSelectedColor} 
                                        />
                                    </div>
                                ) : (
                                    <Dropdown 
                                        label="Color" 
                                        options={colors} 
                                        selected={selectedColor} 
                                        onSelect={setSelectedColor} 
                                    />
                                )}
                                <Dropdown 
                                    label="Fit" 
                                    options={[...product.suitSizing.fits].sort()} 
                                    selected={selectedFit} 
                                    onSelect={setSelectedFit} 
                                />
                                <Dropdown 
                                    label="Jacket Fit" 
                                    options={[...product.suitSizing.jacketFits].sort()} 
                                    selected={selectedJacketFit} 
                                    onSelect={setSelectedJacketFit} 
                                />
                                <Dropdown 
                                    label="Jacket Size" 
                                    options={[...product.suitSizing.jacketSizes].sort()} 
                                    selected={selectedJacketSize} 
                                    onSelect={setSelectedJacketSize} 
                                />
                                {product.suitSizing.vestSizes && (
                                    <Dropdown 
                                        label="Vest Size" 
                                        options={[...product.suitSizing.vestSizes].sort()} 
                                        selected={selectedVestSize} 
                                        onSelect={setSelectedVestSize} 
                                    />
                                )}
                                <Dropdown 
                                    label="Pant Waist" 
                                    options={[...product.suitSizing.pantWaist].sort()} 
                                    selected={selectedPantWaist} 
                                    onSelect={setSelectedPantWaist} 
                                />
                                <Dropdown 
                                    label="Pant Length" 
                                    options={[...product.suitSizing.pantLength].sort()} 
                                    selected={selectedPantLength} 
                                    onSelect={setSelectedPantLength} 
                                />
                            </div>
                        ) : (
                            <div className="non-suit-options">
                                {colors.length > 1 ? (
                                    <Dropdown 
                                        label="Color" 
                                        options={colors} 
                                        selected={selectedColor} 
                                        onSelect={setSelectedColor} 
                                    />
                                ) : (
                                    <div className="single-option"><span className="label">Color:</span> {colors[0]}</div>
                                )}
                                
                                {product.breakawaySizing ? (
                                    <>
                                        <Dropdown 
                                            label="Hoodie Size" 
                                            options={product.breakawaySizing.hoodieSizes} 
                                            selected={product.breakawaySizing.hoodieSizes.find(s => s.size === selectedSize) || product.breakawaySizing.hoodieSizes[0]} 
                                            onSelect={(opt) => setSelectedSize(opt.size)} 
                                            renderOption={(opt) => opt.size}
                                            disabledOption={(opt) => opt.soldOut}
                                        />
                                        <Dropdown 
                                            label="Pants Size" 
                                            options={product.breakawaySizing.pantsSizes} 
                                            selected={product.breakawaySizing.pantsSizes.find(s => s.size === selectedPantWaist) || product.breakawaySizing.pantsSizes[0]} 
                                            onSelect={(opt) => setSelectedPantWaist(opt.size)} 
                                            renderOption={(opt) => opt.size}
                                            disabledOption={(opt) => opt.soldOut}
                                        />
                                    </>
                                ) : (
                                    sizes.length > 1 ? (
                                        <Dropdown 
                                            label="Size" 
                                            options={sizes} 
                                            selected={sizes.find(s => s.size === selectedSize) || sizes[0]} 
                                            onSelect={(opt) => setSelectedSize(opt.size)} 
                                            renderOption={(opt) => opt.size}
                                            disabledOption={(opt) => opt.soldOut}
                                        />
                                    ) : (
                                        <div className="single-option"><span className="label">Size:</span> {sizes[0]?.size || sizes[0]}</div>
                                    )
                                )}
                            </div>
                        )}
                    </div>

                    {/* Specs Group - animates together */}
                    <div className="specs-group" ref={specsRef}>
                        {/* DESKTOP SPECS */}
                        <div className="desktop-specs">
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

                        {/* MOBILE SPECS */}
                        <div className="mobile-specs">
                            {product.specsColumns ? (
                                <div className="product-specs-columns">
                                    {Array.isArray(product.specsColumns) && product.specsColumns.map((col, index) => (
                                        <details key={index} className="specs-column spec-accordion">
                                            <summary>{col.header || 'Details'}</summary>
                                            <div className="accordion-content">
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
                                        </details>
                                    ))}
                                </div>
                            ) : (
                                <details className="specs-column spec-accordion">
                                    <summary>Details</summary>
                                    <div className="accordion-content">
                                        <ul className="product-specs">
                                            {specs.map((spec, index) => (
                                                <li key={index}>{spec}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </details>
                            )}
                        </div>
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
                                    image: (images && images.length > 0) 
                                        ? (typeof images[currentImageIndex] === 'object' && images[currentImageIndex].is360 ? images[currentImageIndex].frames[0] : images[currentImageIndex]) 
                                        : sectionLogo
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
                            <span className="btn-text">{isAdding ? 'ACCESS REQUESTED' : 'REQUEST ACCESS'}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDisplay
