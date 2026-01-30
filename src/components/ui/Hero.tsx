"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import BoidsBackground, { BoidsConfig } from "./BoidsBackground";
import { Settings, X } from "lucide-react";

export default function Hero() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

    // Boids Configuration State
    // Default separation bumped to 4.0 to prevent overlaps
    const [boidsConfig, setBoidsConfig] = useState<BoidsConfig>({
        separation: 3.0,
        alignment: 2.0,
        cohesion: 2.0,
        perceptionRadius: 60,
        maxSpeed: 2.0,
        maxForce: 0.05,
        mouseAttraction: 2.0,
        count: 80 // Slightly fewer for cleaner look with bigger shapes
    });

    const [showControls, setShowControls] = useState(false);

    const navItems = [
        { label: "Projects", href: "#projects" },
        { label: "About", href: "#about" },
        { label: "Photos", href: "#photos" },
        { label: "Contact", href: "#contact" }
    ];

    return (
        <header ref={containerRef} className="relative w-full min-h-screen px-6 pt-12 pb-24 max-w-[1400px] mx-auto flex flex-col justify-between overflow-hidden">
            <BoidsBackground config={boidsConfig} />

            {/* Top Row: Name Left, Controls Right */}
            <div className="relative z-10 flex justify-between items-start border-b-2 border-black pb-6 mb-12">
                <div className="flex items-center gap-6">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-none"
                    >
                        Moses Trundle-Strachan
                    </motion.h1>
                </div>

                {/* Meta / Date (Optional placeholder for right side) */}
                <div className="hidden md:flex items-center justify-end gap-4 mt-6">
                    {/* Toggle Button */}
                    <button
                        onClick={() => setShowControls(!showControls)}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors text-black hover:opacity-70 order-last"
                        aria-label="Toggle Simulation Controls"
                    >
                        <Settings size={20} />
                    </button>

                    {/* Inline Controls (visible when toggled) */}
                    <AnimatePresence>
                        {showControls && (
                            <motion.div
                                initial={{ opacity: 0, width: 0, x: 20 }}
                                animate={{ opacity: 1, width: "auto", x: 0 }}
                                exit={{ opacity: 0, width: 0, x: 20 }}
                                className="flex items-center gap-6 overflow-hidden mr-2"
                            >
                                <ControlGroup label="Separation">
                                    <input
                                        type="range" min="0" max="20" step="0.1"
                                        value={boidsConfig.separation}
                                        onChange={(e) => setBoidsConfig({ ...boidsConfig, separation: parseFloat(e.target.value) })}
                                        className="w-24 accent-black h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                </ControlGroup>

                                <ControlGroup label="Cohesion">
                                    <input
                                        type="range" min="0" max="5" step="0.1"
                                        value={boidsConfig.cohesion}
                                        onChange={(e) => setBoidsConfig({ ...boidsConfig, cohesion: parseFloat(e.target.value) })}
                                        className="w-24 accent-black h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                </ControlGroup>

                                <ControlGroup label="Alignment">
                                    <input
                                        type="range" min="0" max="5" step="0.1"
                                        value={boidsConfig.alignment}
                                        onChange={(e) => setBoidsConfig({ ...boidsConfig, alignment: parseFloat(e.target.value) })}
                                        className="w-24 accent-black h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                </ControlGroup>

                                <ControlGroup label="Radius">
                                    <input
                                        type="range" min="20" max="150" step="5"
                                        value={boidsConfig.perceptionRadius}
                                        onChange={(e) => setBoidsConfig({ ...boidsConfig, perceptionRadius: parseFloat(e.target.value) })}
                                        className="w-24 accent-black h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                    />
                                </ControlGroup>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="relative z-10 flex-grow grid grid-cols-1 md:grid-cols-12 gap-6 content-center">

                {/* Left: Intro / Headline */}
                <div className="md:col-start-2 md:col-span-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <h2 className="font-serif text-4xl md:text-6xl font-normal leading-tight mb-4">
                            A Record of <br />
                            Thought, Form <br />
                            <span className="italic">& Structure.</span>
                        </h2>

                        <div className="max-w-xl prose prose-lg font-serif text-gray-600 leading-relaxed">
                            <p>
                                Moses is a multidisciplinary technologist exploring the friction between
                                <b> rigid data structures</b> and <b>fluid user experiences</b>.
                                Currently building at the University of Washington.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Right: Vertical Nav */}
                <div className="relative z-10 md:col-start-8 md:col-span-4 border-l-2 border-black pl-8 flex flex-col justify-center">
                    <nav className="flex flex-col space-y-1">
                        {navItems.map((item, i) => (
                            <motion.a
                                key={item.label}
                                href={item.href}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
                                className="group block"
                            >
                                <span className="font-serif text-5xl md:text-6xl font-normal text-black group-hover:italic transition-all cursor-pointer">
                                    {item.label}
                                </span>
                            </motion.a>
                        ))}
                    </nav>
                </div>
            </div>
        </header>
    );
}

function ControlGroup({ label, children }: { label: string, children: React.ReactNode }) {
    return (
        <div className="flex flex-col items-center gap-3">
            <span className="font-serif text-sm text-black">{label}</span>
            {children}
        </div>
    )
}
