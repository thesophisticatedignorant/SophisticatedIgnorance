import React, { useEffect, useRef } from 'react';
import './MobileCategoryIntro.scss';

function MobileCategoryIntro({ section }) {
    const containerRef = useRef(null);

    useEffect(() => {
        // Set up the intersection observer to trigger the sequence when scrolled into view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, { threshold: 0.3 });

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) observer.unobserve(containerRef.current);
        };
    }, []);

    return (
        <section 
            id={`mobile-${section.id}`} 
            className={`mobile-category-intro tier-${section.id}`}
            ref={containerRef}
        >
            <div className="cinematic-bg"></div>
            
            <div className="sequence-container">
                <h1 className="seq-name">{section.title}</h1>
                <p className="seq-thesis">{section.epithet}</p>
                <img 
                    src={section.image} 
                    alt={section.title} 
                    className="seq-symbol" 
                />
                {section.body && (
                    <p className="seq-manifesto">{section.body}</p>
                )}
            </div>
        </section>
    );
}

export default MobileCategoryIntro;
