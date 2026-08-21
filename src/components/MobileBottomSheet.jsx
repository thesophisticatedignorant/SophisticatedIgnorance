import React, { useState } from 'react';
import './MobileBottomSheet.scss';

function MobileBottomSheet({ sections, activeSection, onNavClick }) {
    const [isOpen, setIsOpen] = useState(false);

    // Active index for progress
    const activeIndex = sections.findIndex(s => s.id === activeSection);
    const progress = sections.length > 1 ? (activeIndex / (sections.length - 1)) * 100 : 0;

    return (
        <div className="mobile-bottom-sheet-wrapper">
            {/* Edge Progress Indicator */}
            <div className="edge-progress" onClick={() => setIsOpen(true)}>
                <div className="progress-bg">
                    <div className="progress-bar" style={{ height: `${progress}%` }}></div>
                </div>
                <div className="notches">
                    {sections.map((_, i) => (
                        <div key={i} className={`notch ${i === activeIndex ? 'active' : ''}`} />
                    ))}
                </div>
            </div>

            {/* Bottom Sheet */}
            <div className={`bottom-sheet-overlay ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(false)}>
                <div className="bottom-sheet" onClick={e => e.stopPropagation()}>
                    <div className="sheet-handle" onClick={() => setIsOpen(false)}></div>
                    <h2 className="sheet-title">INDEX</h2>
                    <ul className="sheet-list">
                        {sections.map((s, idx) => (
                            <li key={idx} className={activeSection === s.id ? 'active' : ''}>
                                <a 
                                    href={`/shop/${s.id}`} 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onNavClick(s.id, e);
                                        setIsOpen(false);
                                    }}
                                >
                                    <span className="idx">{String(idx + 1).padStart(2, '0')} — </span>
                                    {s.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default MobileBottomSheet;
