import { useEffect, useRef, useState } from 'react';

// Temporary on-screen FPS/frame-time readout for diagnosing the card-slider
// lag report on real devices, where we can't attach devtools. Remove once
// the lag is resolved and confirmed.
export default function PerfOverlay() {
    const [stats, setStats] = useState({ fps: 0, avgMs: 0, worstMs: 0, dropped: 0 });
    const framesRef = useRef([]);
    const lastRef = useRef(null);
    const rafRef = useRef(null);
    const lastUpdateRef = useRef(performance.now());

    useEffect(() => {
        const tick = (now) => {
            if (lastRef.current === null) {
                // Skip the first delta - it spans page-load/mount time, not a real frame.
                lastRef.current = now;
                rafRef.current = requestAnimationFrame(tick);
                return;
            }
            const dt = now - lastRef.current;
            lastRef.current = now;
            const frames = framesRef.current;
            frames.push(dt);
            // Keep a rolling ~2s window
            while (frames.length > 240) frames.shift();

            if (now - lastUpdateRef.current > 250) {
                lastUpdateRef.current = now;
                const windowFrames = frames.slice(-120); // last ~2s at 60fps
                const avg = windowFrames.reduce((a, b) => a + b, 0) / windowFrames.length;
                const worst = Math.max(...windowFrames);
                const dropped = windowFrames.filter((f) => f > 33.3).length;
                setStats({
                    fps: Math.round(1000 / avg),
                    avgMs: avg.toFixed(1),
                    worstMs: worst.toFixed(0),
                    dropped,
                });
            }

            rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(rafRef.current);
    }, []);

    const bad = stats.fps > 0 && stats.fps < 45;

    return (
        <div
            style={{
                position: 'fixed',
                top: 8,
                left: 8,
                zIndex: 999999,
                background: 'rgba(0,0,0,0.85)',
                color: bad ? '#ff5555' : '#00ff88',
                padding: '6px 10px',
                borderRadius: 6,
                fontFamily: 'monospace',
                fontSize: 12,
                lineHeight: 1.4,
                pointerEvents: 'none',
                border: `1px solid ${bad ? '#ff5555' : '#00ff88'}`,
                whiteSpace: 'pre',
            }}
        >
            {`FPS ${stats.fps}  avg ${stats.avgMs}ms  worst ${stats.worstMs}ms\ndropped(>33ms)/2s: ${stats.dropped}  dpr:${window.devicePixelRatio}`}
        </div>
    );
}
