import { useState, useEffect } from 'react'
import './NewsletterPopup.css'
import { db } from '../firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

function NewsletterPopup({ onClose }) {
    const [closeEnabled, setCloseEnabled] = useState(false)
    const [email, setEmail] = useState('')

    useEffect(() => {
        const timer = setTimeout(() => {
            setCloseEnabled(true)
        }, 5000)
        return () => clearTimeout(timer)
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!email) return
        
        try {
            await addDoc(collection(db, 'newsletter_subscriptions'), {
                email,
                timestamp: serverTimestamp()
            })
            alert('Thank you for subscribing to our newsletter! You will receive a 10% discount code shortly.')
            if (onClose) onClose()
        } catch (error) {
            console.error('Error adding document: ', error)
            alert('There was an error. Make sure Firebase config is set up.')
        }
    }

    const handleClose = () => {
        if (closeEnabled && onClose) {
            onClose()
        }
    }

    return (
        <div className="newsletter-popup">
            <div className="newsletter-content">
                <button
                    className="newsletter-close"
                    onClick={handleClose}
                    disabled={!closeEnabled}
                >
                    ×
                </button>
                <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '16px', color: '#fff' }}>
                        JOIN THE SOPHISTICATED IGNORANCE COMMUNITY
                    </h2>
                    <p style={{ fontSize: '14px', color: '#999', lineHeight: '1.5' }}>
                        Join our mailing list to stay up to date with new arrivals, promotions, and exclusive events from Sophisticated Ignorance.
                    </p>
                </div>
                <form onSubmit={handleSubmit} style={{ marginBottom: '16px' }}>
                    <input
                        type="email"
                        placeholder="Enter email..."
                        required
                        className="newsletter-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button type="submit" className="newsletter-submit">
                        SUBSCRIBE
                    </button>
                </form>
                <p style={{ fontSize: '12px', color: '#666', textAlign: 'center', marginTop: '16px' }}>
                    By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
                </p>
            </div>
        </div>
    )
}
export default NewsletterPopup
