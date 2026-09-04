import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, orderBy, getDocs, updateDoc, doc } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import MenuOverlay from '../components/MenuOverlay';
import './HouseAdmin.scss';

function HouseAdmin() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (!loading) {
            if (!user || user.email !== 'cireconglomerate@gmail.com') {
                navigate('/');
            }
        }
    }, [user, loading, navigate]);

    useEffect(() => {
        const fetchAllRequests = async () => {
            if (!user || user.email !== 'cireconglomerate@gmail.com') return;
            try {
                const q = query(collection(db, 'acquisitionRequests'), orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);
                const reqs = [];
                querySnapshot.forEach((d) => {
                    reqs.push({ id: d.id, ...d.data(), newStatus: d.data().status, newLink: d.data().checkoutLink || '' });
                });
                setRequests(reqs);
            } catch (err) {
                console.error("Error fetching requests: ", err);
            } finally {
                setFetching(false);
            }
        };

        if (user && user.email === 'cireconglomerate@gmail.com') {
            fetchAllRequests();
        }
    }, [user]);

    const handleUpdate = async (reqId, currentStatus, currentLink, idx) => {
        const req = requests[idx];
        if (req.newStatus === currentStatus && req.newLink === currentLink) return;

        try {
            const reqRef = doc(db, 'acquisitionRequests', reqId);
            await updateDoc(reqRef, {
                status: req.newStatus,
                checkoutLink: req.newLink
            });
            alert('Request updated successfully.');
        } catch (err) {
            console.error(err);
            alert('Failed to update request.');
        }
    };

    if (loading || fetching) {
        return <div className="admin-page loading"><p>AUTHENTICATING ADMIN...</p></div>;
    }

    return (
        <div className="admin-page">
            <Header isMinimal={false} onMenuClick={() => setMenuOpen(true)} />
            <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
            
            <div className="admin-container">
                <div className="admin-header">
                    <h2>HOUSE ADMIN</h2>
                    <p>ACQUISITION REQUEST MANAGEMENT</p>
                </div>

                <div className="admin-requests-list">
                    {requests.length === 0 ? (
                        <p>No requests found.</p>
                    ) : (
                        requests.map((req, idx) => (
                            <div key={req.id} className="admin-req-card">
                                <div className="req-top">
                                    <span className="req-id">{req.id.toUpperCase()}</span>
                                    <span className="req-date">
                                        {req.createdAt?.toDate ? req.createdAt.toDate().toLocaleString() : 'N/A'}
                                    </span>
                                </div>
                                <div className="req-user">
                                    <strong>{req.displayName || req.email}</strong><br/>
                                    {req.email}
                                </div>
                                
                                <div className="req-items">
                                    {req.items.map((item, i) => (
                                        <div key={i} className="req-item">
                                            {item.quantity}x {item.title} ({item.size} / {item.color})
                                        </div>
                                    ))}
                                </div>

                                <div className="req-remarks">
                                    <strong>REMARKS:</strong> {req.remarks || 'None'}
                                </div>
                                
                                <div className="req-socials">
                                    <strong>SOCIALS:</strong> 
                                    {req.socials && req.socials.length > 0 ? (
                                        req.socials.map((social, sIdx) => (
                                            <span key={sIdx} className="social-tag">{social}</span>
                                        ))
                                    ) : (
                                        'None provided'
                                    )}
                                </div>

                                <div className="req-total">
                                    <strong>TOTAL:</strong> ${req.total?.toFixed(2) || '0.00'}
                                </div>

                                <div className="req-controls">
                                    <div className="control-group">
                                        <label>STATUS</label>
                                        <select 
                                            value={req.newStatus} 
                                            onChange={(e) => {
                                                const updated = [...requests];
                                                updated[idx].newStatus = e.target.value;
                                                setRequests(updated);
                                            }}
                                        >
                                            <option value="Submitted">Submitted</option>
                                            <option value="Under Review">Under Review</option>
                                            <option value="Approved">Approved</option>
                                            <option value="Denied">Denied</option>
                                        </select>
                                    </div>
                                    <div className="control-group">
                                        <label>PAYPAL INVOICE / CHECKOUT LINK</label>
                                        <input 
                                            type="text" 
                                            placeholder="Paste Stripe/Shopify/PayPal link" 
                                            value={req.newLink}
                                            onChange={(e) => {
                                                const updated = [...requests];
                                                updated[idx].newLink = e.target.value;
                                                setRequests(updated);
                                            }}
                                        />
                                    </div>
                                    <button 
                                        className="update-btn"
                                        onClick={() => handleUpdate(req.id, req.status, req.checkoutLink, idx)}
                                    >
                                        SAVE CHANGES
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default HouseAdmin;
