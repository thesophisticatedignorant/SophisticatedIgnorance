import React, { useState, useEffect } from 'react';
import { useGrid } from '../../context/GridContext';

export default function CoordinateOverlay() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const { isGridVisible } = useGrid(); // Shared state with crosshairs

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    if (!isGridVisible) return null;

    const centerX = window.innerWidth / 2;
    const relativeX = Math.round(mousePos.x - centerX);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 9999,
        }}>
            {/* Grid Lines */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundImage: `
          linear-gradient(to right, rgba(0, 255, 255, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
        `,
                backgroundSize: '100px 100px',
            }} />

            {/* Center Line */}
            <div style={{
                position: 'absolute',
                left: '50%',
                top: 0,
                bottom: 0,
                width: '1px',
                background: 'rgba(255, 0, 0, 0.5)',
            }} />

            {/* Cursor Crosshairs - Vertical Blue Line */}
            <div style={{
                position: 'absolute',
                left: mousePos.x,
                top: 0,
                bottom: 0,
                width: '1px',
                background: 'rgba(0, 150, 255, 0.6)',
                pointerEvents: 'none',
            }} />

            {/* Cursor Crosshairs - Horizontal Blue Line */}
            <div style={{
                position: 'absolute',
                top: mousePos.y,
                left: 0,
                right: 0,
                height: '1px',
                background: 'rgba(0, 150, 255, 0.6)',
                pointerEvents: 'none',
            }} />

            {/* Info Box - Bottom Right */}
            <div style={{
                position: 'fixed',
                bottom: 20,
                right: 20,
                background: 'rgba(0, 0, 0, 0.8)',
                color: '#00ffff',
                padding: '10px',
                borderRadius: '4px',
                fontFamily: 'monospace',
                fontSize: '14px',
                border: '1px solid #00ffff',
            }}>
                <div>Mouse X: {mousePos.x}</div>
                <div>Mouse Y: {mousePos.y}</div>
                <div style={{ color: '#ff00ff', marginTop: '5px' }}>
                    Center Offset X: {relativeX}
                </div>
                <div style={{ fontSize: '10px', color: '#888', marginTop: '5px' }}>
                    Press 'G' to toggle grid
                </div>
            </div>
        </div>
    );
}
