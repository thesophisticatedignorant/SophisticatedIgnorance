import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './RequestReview.scss';
import Header from '../components/Header';

function RequestReview() {
    const { user, loading } = useAuth();
    const { cartItems, cartCount, clearCart } = useCart();
    const navigate = useNavigate();
    const [submitting, setSubmitting] = useState(false);
    const [remarks, setRemarks] = useState('');
    const [socials, setSocials] = useState(['']); // Start with one mandatory empty field
    const [zipCode, setZipCode] = useState('');
    const [taxRate, setTaxRate] = useState(0);

    const handleZipChange = (e) => {
        const val = e.target.value.replace(/\D/g, '').slice(0, 5);
        setZipCode(val);
        if (val.length === 5) {
            setTaxRate(0.08875);
        } else {
            setTaxRate(0);
        }
    };

    const subtotal = cartItems.reduce((acc, item) => acc + (parseFloat(item.price) * item.quantity), 0);
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    useEffect(() => {
        if (!loading && !user) {
            navigate('/auth', { state: { from: { pathname: '/request-review' } } });
        }
    }, [user, loading, navigate]);

    if (loading) return <div className="loading-screen">Authenticating...</div>;
    if (!user) return null;

    const handleSubmit = async () => {
        if (cartItems.length === 0) return;
        
        // Ensure at least one social media handle is provided
        const filteredSocials = socials.map(s => s.trim()).filter(s => s !== '');
        if (filteredSocials.length === 0) {
            alert("Please provide at least one social media account.");
            return;
        }
        
        setSubmitting(true);
        try {
            const requestRef = await addDoc(collection(db, 'acquisitionRequests'), {
                userId: user.uid,
                email: user.email,
                displayName: user.displayName,
                items: cartItems,
                status: 'Submitted',
                remarks: remarks,
                socials: filteredSocials,
                zipCode: zipCode,
                taxRate: taxRate,
                tax: tax,
                subtotal: subtotal,
                total: total,
                createdAt: serverTimestamp()
            });

            // Activity Log
            await addDoc(collection(db, 'activity'), {
                type: 'acquisition_request',
                userId: user.uid,
                requestId: requestRef.id,
                timestamp: serverTimestamp(),
                details: `Requested access to ${cartItems.length} items.`
            });

            // Clear the cart/request list
            clearCart();
            
            // Navigate to confirmation with ID
            navigate('/request-confirmation', { state: { requestId: requestRef.id } });
        } catch (error) {
            console.error("Error submitting request:", error);
            alert("There was an error submitting your request. Please try again.");
            setSubmitting(false);
        }
    };

    return (
        <div className="request-review-page">
            <Header isMinimal={true} />
            <div className="review-container">
                <h2>FINALIZE INQUIRY</h2>
                <p className="subtitle">Review the items you are requesting access to.</p>

                {cartItems.length === 0 ? (
                    <div className="empty-state">
                        <p>Your request list is currently empty.</p>
                        <button className="back-btn" onClick={() => navigate('/shop')}>RETURN TO BROWSE</button>
                    </div>
                ) : (
                    <>
                        <div className="request-items">
                            {cartItems.map((item) => (
                                <div key={item.id} className="review-item">
                                    <div className="item-image-preview">
                                        {item.image && <img src={item.image} alt={item.title} />}
                                    </div>
                                    <div className="item-details-wrapper">
                                        <div className="item-info">
                                            <h4>{item.title}</h4>
                                            <p className="meta">
                                                {item.color && `${item.color} | `}{item.size && `${item.size} | `}Qty: {item.quantity}
                                            </p>
                                        </div>
                                        <div className="item-price">
                                            ${parseFloat(item.price * item.quantity).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="request-summary">
                            <div className="summary-row">
                                <span>SUBTOTAL</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="summary-row zip-tax-row">
                                <span className="tax-label">
                                    TAX (ZIP CODE: 
                                    <input 
                                        type="text" 
                                        value={zipCode} 
                                        onChange={handleZipChange} 
                                        placeholder="5-DIGIT" 
                                    />)
                                </span>
                                <span>${tax.toFixed(2)}</span>
                            </div>
                            <div className="summary-row total">
                                <span>TOTAL VALUE</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="social-media-section">
                            <label>SOCIAL MEDIA PROFILES *</label>
                            <p className="social-hint">Please provide at least one social media account for verification.</p>
                            {socials.map((social, idx) => (
                                <input 
                                    key={idx}
                                    type="text" 
                                    className="social-input"
                                    value={social} 
                                    onChange={(e) => {
                                        const newSocials = [...socials];
                                        newSocials[idx] = e.target.value;
                                        setSocials(newSocials);
                                    }}
                                    placeholder={idx === 0 ? "@username or URL (Required)" : "Additional Account (Optional)"}
                                    required={idx === 0}
                                />
                            ))}
                            <button 
                                className="add-social-btn" 
                                onClick={() => setSocials([...socials, ''])}
                            >
                                + ADD ANOTHER ACCOUNT
                            </button>
                        </div>

                        <div className="special-remarks">
                            <label htmlFor="remarks">SPECIAL REMARKS / CUSTOMIZATION (OPTIONAL)</label>
                            <textarea 
                                id="remarks" 
                                value={remarks} 
                                onChange={(e) => setRemarks(e.target.value)}
                                placeholder="Enter any specific requests, sizing details, or customization inquiries..."
                                rows="4"
                            />
                        </div>

                        <div className="actions">
                            <button 
                                className={`submit-btn ${submitting ? 'submitting' : ''}`} 
                                onClick={handleSubmit}
                                disabled={submitting}
                            >
                                {submitting ? 'SUBMITTING...' : 'CONFIRM REQUEST'}
                            </button>
                            <button className="cancel-btn" onClick={() => navigate('/shop')} disabled={submitting}>
                                CANCEL
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default RequestReview;
