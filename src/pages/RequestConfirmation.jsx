import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import './RequestConfirmation.scss';

function RequestConfirmation() {
    const location = useLocation();
    const navigate = useNavigate();
    
    // In a real app, generate this on the backend or use the firestore ID
    const firestoreId = location.state?.requestId || 'UNKNOWN';
    // Generate a formatted ID like SI-260822-0041 based on the firestore ID
    const formattedId = `SI-${new Date().toLocaleDateString('en-GB').replace(/\//g, '')}-${firestoreId.substring(0, 4).toUpperCase()}`;

    return (
        <div className="confirmation-page">
            <div className="confirmation-container">
                <h2>REQUEST RECEIVED</h2>
                
                <div className="reference-number">
                    {formattedId}
                </div>

                <div className="confirmation-message">
                    <p>
                        <em>
                            Your acquisition request has been received by the House. 
                            Availability and allocation will be reviewed privately. 
                            If approved, private checkout will be released to the contact information provided.
                        </em>
                    </p>
                </div>

                <div className="status-indicator">
                    <span className="status-label">STATUS — </span>
                    <span className="status-value">UNDER REVIEW</span>
                </div>

                <div className="actions">
                    <Link to="/shop" className="return-btn">RETURN TO BROWSE</Link>
                </div>
            </div>
        </div>
    );
}

export default RequestConfirmation;
