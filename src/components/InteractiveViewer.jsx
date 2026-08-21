import React, { useState, useEffect, useRef } from 'react';
import './InteractiveViewer.scss';

const InteractiveViewer = ({ frames }) => {
    const [currentFrame, setCurrentFrame] = useState(0);
    const [autoplay, setAutoplay] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const dragStartX = useRef(0);
    const dragStartFrame = useRef(0);

    const [isVisible, setIsVisible] = useState(false);
    const viewerRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setIsVisible(entry.isIntersecting);
        }, { threshold: 0.1 });
        
        if (viewerRef.current) {
            observer.observe(viewerRef.current);
        }
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!autoplay || isDragging || !isVisible) return;
        const interval = setInterval(() => {
            setCurrentFrame((prev) => (prev + 1) % frames.length);
        }, 600);
        return () => clearInterval(interval);
    }, [autoplay, isDragging, isVisible, frames.length]);

    const handlePointerDown = (e) => {
        setIsDragging(true);
        dragStartX.current = e.clientX;
        dragStartFrame.current = currentFrame;
    };

    const handlePointerMove = (e) => {
        if (!isDragging) return;
        const deltaX = e.clientX - dragStartX.current;
        // Sensitivity: 1 frame per 30px dragged
        const framesToMove = Math.floor(deltaX / 30);
        let newFrame = (dragStartFrame.current + framesToMove) % frames.length;
        if (newFrame < 0) newFrame += frames.length;
        setCurrentFrame(newFrame);
    };

    const handlePointerUp = () => {
        setIsDragging(false);
    };

    return (
        <div 
            className="interactive-viewer"
            ref={viewerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
        >
            {frames.map((src, index) => (
                <img 
                    key={index} 
                    src={src} 
                    alt={`Frame ${index}`} 
                    className={`viewer-frame ${index === currentFrame ? 'active' : ''}`}
                    draggable="false"
                />
            ))}
            <div className="viewer-controls">
                <button 
                    className="autoplay-toggle"
                    onClick={(e) => {
                        e.stopPropagation();
                        setAutoplay(!autoplay);
                    }}
                >
                    {autoplay ? '360° | |' : '360° ▻'}
                </button>
            </div>
        </div>
    );
};

export default InteractiveViewer;
