"use client";
import * as React from "react";

const BACKGROUND_TOP = "#161B24";
const BACKGROUND_MID = "#0F1217";
const BACKGROUND_BOTTOM = "#0a0d10";

interface Star {
    x: number; y: number; radius: number;
    speedX: number; speedY: number;
    baseAlpha: number; twinklePhase: number; twinkleSpeed: number;
}

export function StarryBackground() {
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const starsRef = React.useRef<Star[]>([]);
    const rafRef = React.useRef<number | null>(null);
    const scaleRef = React.useRef(1);

    React.useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const init = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            scaleRef.current = Math.min(canvas.width / 1000, canvas.height / 1000);
            const scale = scaleRef.current;
            const STAR_BASE_SPEED = 0.54 * scale;

            starsRef.current = Array.from({ length: 180 }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: (0.45 + Math.random() * 1.35) * scale,
                speedX: STAR_BASE_SPEED * (0.45 + Math.random() * 0.8),
                speedY: STAR_BASE_SPEED * (0.22 + Math.random() * 0.22),
                baseAlpha: 0.28 + Math.random() * 0.38,
                twinklePhase: Math.random() * Math.PI * 2,
                twinkleSpeed: 0.004 + Math.random() * 0.012,
            }));
        };

        const draw = () => {
            // Background gradient
            const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
            bg.addColorStop(0, BACKGROUND_TOP);
            bg.addColorStop(0.5, BACKGROUND_MID);
            bg.addColorStop(1, BACKGROUND_BOTTOM);
            ctx.fillStyle = bg;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Subtle red radial glow in centre
            const glow = ctx.createRadialGradient(
                canvas.width * 0.5, canvas.height * 0.4, canvas.height * 0.05,
                canvas.width * 0.5, canvas.height * 0.4, canvas.height * 0.8
            );
            glow.addColorStop(0, "rgba(207,42,68,0.07)");
            glow.addColorStop(1, "rgba(10,12,30,0)");
            ctx.fillStyle = glow;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Stars
            starsRef.current.forEach((star) => {
                star.x += star.speedX;
                star.y += star.speedY;
                star.twinklePhase += star.twinkleSpeed;

                if (star.x - star.radius > canvas.width) { star.x = -star.radius; star.y = Math.random() * canvas.height; }
                if (star.y - star.radius > canvas.height) { star.y = -star.radius; star.x = Math.random() * canvas.width; }

                const twinkle = 0.75 + 0.25 * Math.sin(star.twinklePhase);
                ctx.globalAlpha = Math.min(1, star.baseAlpha * twinkle);
                ctx.fillStyle = "#FFFFFF";
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();
            });
            ctx.globalAlpha = 1;

            rafRef.current = requestAnimationFrame(draw);
        };

        const onResize = () => { init(); };

        init();
        draw();
        window.addEventListener("resize", onResize);
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 w-full h-full pointer-events-none"
            aria-hidden="true"
        />
    );
}