"use client";

import { useEffect, useRef } from "react";

// Shared config type
export interface BoidsConfig {
    separation: number;
    alignment: number;
    cohesion: number;
    perceptionRadius: number;
    maxSpeed: number;
    maxForce: number;
    mouseAttraction: number;
    count: number;
}

class Boid {
    x: number;
    y: number;
    vx: number;
    vy: number;
    ax: number;
    ay: number;
    history: { x: number; y: number }[];

    constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 4;
        this.vy = (Math.random() - 0.5) * 4;
        this.ax = 0;
        this.ay = 0;
        this.history = [];
    }

    update(
        boids: Boid[],
        width: number,
        height: number,
        params: BoidsConfig,
        mouse: { x: number; y: number }
    ) {
        let separation = { x: 0, y: 0 };
        let alignment = { x: 0, y: 0 };
        let cohesion = { x: 0, y: 0 };
        let total = 0;

        for (let other of boids) {
            let d = Math.hypot(this.x - other.x, this.y - other.y);
            if (other !== this && d < params.perceptionRadius) {
                // Hard Collision Avoidance (No Overlap)
                if (d < 20) {
                    separation.x += (this.x - other.x) / d * 50; // Stronger push
                    separation.y += (this.y - other.y) / d * 50;
                }

                // Separation
                separation.x += (this.x - other.x) / d;
                separation.y += (this.y - other.y) / d;

                // Alignment
                alignment.x += other.vx;
                alignment.y += other.vy;

                // Cohesion
                cohesion.x += other.x;
                cohesion.y += other.y;

                total++;
            }
        }

        if (total > 0) {
            separation.x /= total;
            separation.y /= total;

            alignment.x /= total;
            alignment.y /= total;
            // Normalize alignment
            const alignMag = Math.hypot(alignment.x, alignment.y);
            if (alignMag > 0) {
                alignment.x = (alignment.x / alignMag) * params.maxSpeed;
                alignment.y = (alignment.y / alignMag) * params.maxSpeed;
                alignment.x -= this.vx;
                alignment.y -= this.vy;
            }

            cohesion.x /= total;
            cohesion.y /= total;
            // Cohesion force towards center
            cohesion.x -= this.x;
            cohesion.y -= this.y;
            // Normalize cohesion
            const cohMag = Math.hypot(cohesion.x, cohesion.y);
            if (cohMag > 0) {
                cohesion.x = (cohesion.x / cohMag) * params.maxSpeed;
                cohesion.y = (cohesion.y / cohMag) * params.maxSpeed;
                cohesion.x -= this.vx;
                cohesion.y -= this.vy;
            }
        }

        // Mouse Attraction
        let attraction = { x: 0, y: 0 };
        const distToMouse = Math.hypot(mouse.x - this.x, mouse.y - this.y);
        if (distToMouse < 200 && distToMouse > 0) { // Reduced perception radius for tighter control
            attraction.x = (mouse.x - this.x);
            attraction.y = (mouse.y - this.y);
            // Normalize
            const attrMag = Math.hypot(attraction.x, attraction.y);
            attraction.x = (attraction.x / attrMag) * params.maxSpeed;
            attraction.y = (attraction.y / attrMag) * params.maxSpeed;
            attraction.x -= this.vx;
            attraction.y -= this.vy;
        }

        // Apply weights
        this.ax += separation.x * params.separation;
        this.ay += separation.y * params.separation;
        this.ax += alignment.x * params.alignment;
        this.ay += alignment.y * params.alignment;
        this.ax += cohesion.x * params.cohesion;
        this.ay += cohesion.y * params.cohesion;
        this.ax += attraction.x * params.mouseAttraction;
        this.ay += attraction.y * params.mouseAttraction;

        // Limit Force
        const forceMag = Math.hypot(this.ax, this.ay);
        if (forceMag > params.maxForce) {
            this.ax = (this.ax / forceMag) * params.maxForce;
            this.ay = (this.ay / forceMag) * params.maxForce;
        }

        // Update Velocity
        this.vx += this.ax;
        this.vy += this.ay;

        // Limit Speed
        const speed = Math.hypot(this.vx, this.vy);
        if (speed > params.maxSpeed) {
            this.vx = (this.vx / speed) * params.maxSpeed;
            this.vy = (this.vy / speed) * params.maxSpeed;
        }

        // Update Position
        this.x += this.vx;
        this.y += this.vy;

        // Reset Accel
        this.ax = 0;
        this.ay = 0;

        // Edge Wrapping
        if (this.x > width) this.x = 0;
        if (this.x < 0) this.x = width;
        if (this.y > height) this.y = 0;
        if (this.y < 0) this.y = height;
    }

    draw(ctx: CanvasRenderingContext2D) {
        const angle = Math.atan2(this.vy, this.vx);
        // Smaller "dart" shape matching the reference
        const length = 10;
        const width = 8;

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(angle);

        ctx.beginPath();
        ctx.moveTo(length / 2, 0);                 // Tip
        ctx.lineTo(-length / 2, width / 2);        // Back Right
        ctx.lineTo(-length / 2 + 2, 0);            // Back Notch (indent)
        ctx.lineTo(-length / 2, -width / 2);       // Back Left
        ctx.closePath();

        ctx.fillStyle = "black";
        ctx.fill();

        ctx.restore();
    }
}

interface Props {
    config: BoidsConfig;
}

export default function BoidsBackground({ config }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // We use a ref to store the latest config so the animation loop always sees the freshest values
    // without needing to restart the loop/useEffect.
    const configRef = useRef(config);
    useEffect(() => {
        configRef.current = config;
    }, [config]);

    const mouseRef = useRef({ x: -1000, y: -1000 });
    const boidsRef = useRef<Boid[]>([]);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = container.clientWidth;
        let height = container.clientHeight;
        let animationId: number;

        const resize = () => {
            width = container.clientWidth;
            height = container.clientHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener("resize", resize);
        resize();

        // Initialize boids
        if (boidsRef.current.length === 0 || boidsRef.current.length !== config.count) {
            boidsRef.current = [];
            for (let i = 0; i < config.count; i++) {
                boidsRef.current.push(new Boid(width, height));
            }
        }

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // Use the ref to get the latest config in the loop
            const currentConfig = configRef.current;

            boidsRef.current.forEach(boid => {
                boid.update(boidsRef.current, width, height, currentConfig, mouseRef.current);
                boid.draw(ctx);
            });

            animationId = requestAnimationFrame(render);
        };

        render();

        // Mouse tracking helper
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top
            };
        };
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", handleMouseMove);
            cancelAnimationFrame(animationId);
        };
    }, []); // Run once, relying on configRef for updates

    return (
        <div ref={containerRef} className="absolute inset-0 z-0 pointer-events-none">
            <canvas ref={canvasRef} className="w-full h-full block" />
        </div>
    );
}
