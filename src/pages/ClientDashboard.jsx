import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import MenuOverlay from '../components/MenuOverlay';
import './ClientDashboard.scss';

function ClientDashboard() {
    const { user, loading } = useAuth();
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [fetching, setFetching] = useState(true);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        if (!loading && !user) {
            navigate('/auth?redirect=/dashboard');
        }
    }, [user, loading, navigate]);

    useEffect(() => {
        const fetchRequests = async () => {
            if (!user) return;
            try {
                const q = query(
                    collection(db, 'acquisitionRequests'),
                    where('userId', '==', user.uid),
                    orderBy('createdAt', 'desc')
                );
                const querySnapshot = await getDocs(q);
                const reqs = [];
                querySnapshot.forEach((doc) => {
                    reqs.push({ id: doc.id, ...doc.data() });
                });
                setRequests(reqs);
            } catch (err) {
                console.error("Error fetching requests: ", err);
            } finally {
                setFetching(false);
            }
        };

        if (user) {
            fetchRequests();
        }
    }, [user]);

    if (loading || fetching) {
        return <div className="dashboard-page loading"><p>AUTHENTICATING...</p></div>;
    }

    return (
        <div className="dashboard-page">
            <Header isMinimal={false} onMenuClick={() => setMenuOpen(true)} />
            <MenuOverlay isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
            
            <div className="dashboard-container">
                <div className="dashboard-header">
                    <h2>THE DOSSIER</h2>
                    <p>ACQUISITION HISTORY FOR {user?.email?.toUpperCase()}</p>
                </div>

                <div className="requests-list">
                    {requests.length === 0 ? (
                        <div className="empty-state">
                            <p>NO ACQUISITION REQUESTS FOUND.</p>
                            <button onClick={() => navigate('/shop')}>RETURN TO SHOP</button>
                        </div>
                    ) : (
                        requests.map(req => (
                            <div key={req.id} className="request-card">
                                <div className="req-header">
                                    <span className="req-id">ID: {req.id.slice(-6).toUpperCase()}</span>
                                    <span className={`req-status ${req.status.toLowerCase().replace(' ', '-')}`}>
                                        {req.status.toUpperCase()}
                                    </span>
                                </div>
                                <div className="req-date">
                                    {req.createdAt?.toDate ? req.createdAt.toDate().toLocaleDateString() : 'Just now'}
                                </div>
                                
                                <div className="req-items">
                                    {req.items.map((item, i) => (
                                        <div key={i} className="req-item-row">
                                            <span>{item.quantity}x {item.title}</span>
                                            <span>${(parseFloat(item.price) * item.quantity).toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="req-total">
                                    <span>TOTAL</span>
                                    <span>${req.total?.toFixed(2) || '0.00'}</span>
                                </div>

                                {req.checkoutLink && (
                                    <div className="req-action">
                                        <a href={req.checkoutLink} target="_blank" rel="noopener noreferrer" className="checkout-btn">
                                            COMPLETE ACQUISITION
                                        </a>
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default ClientDashboard;
