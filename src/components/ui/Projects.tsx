"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

const articles = [
    {
        id: 1,
        title: "NeuroViz",
        subtitle: "Inside the Black Box",
        category: "Science & Tech",
        date: "2024",
        excerpt: "Visualizing neural network activation states with WebGL.",
        src: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974&auto=format&fit=crop",
        link: "#",
    },
    {
        id: 2,
        title: "DriftOPS",
        subtitle: "The Silent Guardian",
        category: "Infrastructure",
        date: "2023",
        excerpt: "CLI tool for preventing schema drift in data pipelines.",
        src: "https://images.unsplash.com/photo-1544197150-b99a580bbcbf?q=80&w=2000&auto=format&fit=crop",
        link: "#",
    },
    {
        id: 3,
        title: "Anti-Gravity",
        subtitle: "A Design Retrospective",
        category: "Design",
        date: "2023",
        excerpt: "Exploring physics-based motion on the web.",
        src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop",
        link: "#",
    },
];

export default function Projects() {
    const [activeProject, setActiveProject] = useState<number | null>(null);
    const ref = useRef<HTMLElement>(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth spring animation for the cursor follower
    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const xSpring = useSpring(x, springConfig);
    const ySpring = useSpring(y, springConfig);

    // Rotate the image slightly based on x velocity (optional flair)
    // const rotate = useTransform(xSpring, [0, 500], [-5, 5]); 

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        if (!ref.current) return;

        // Make coordinates relative to the section to handle scroll correctly if needed
        // But for fixed/absolute behavior relative to viewport or offsetParent:

        const rect = ref.current.getBoundingClientRect();

        // We want the image centered on the cursor
        // e.clientX is viewport relative. 
        // We need to position the image absolute or fixed. 
        // Let's rely on the image being 'fixed' or absolute to the section. 
        // If absolute to section:
        const relativeX = e.clientX - rect.left;
        const relativeY = e.clientY - rect.top;

        x.set(relativeX);
        y.set(relativeY);
    };

    return (
        <section
            ref={ref}
            onMouseMove={handleMouseMove}
            className="relative py-12 px-6 md:px-12 max-w-[1400px] mx-auto overflow-hidden md:overflow-visible"
        >
            <div className="flex justify-between items-baseline mb-8 border-b border-black pb-4">
                <h2 className="font-serif text-5xl md:text-7xl font-normal text-black w-full uppercase tracking-tight">
                    Projects
                </h2>
                <span className="hidden md:block font-sans text-xs font-bold uppercase tracking-widest text-gray-400 whitespace-nowrap">
                    ( {articles.length} )
                </span>
            </div>

            <div className="flex flex-col relative z-10">
                {articles.map((article, i) => (
                    <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        onMouseEnter={() => setActiveProject(i)}
                        onMouseLeave={() => setActiveProject(null)}
                        className="group relative border-b border-gray-200 last:border-black py-6 flex flex-col md:flex-row md:items-baseline justify-between gap-4 cursor-pointer hover:bg-gray-50/50 transition-colors duration-300"
                    >
                        <div className="flex flex-col md:w-1/2">
                            <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">
                                {article.category} — {article.date}
                            </span>
                            <h3 className="font-serif text-4xl md:text-6xl font-normal text-black group-hover:italic transition-all duration-300 z-10">
                                {article.title}
                            </h3>
                            <p className="font-serif text-lg text-gray-500 mt-2 group-hover:text-black transition-colors">
                                {article.subtitle}
                            </p>
                        </div>

                        <div className="md:w-1/3 flex items-center justify-between md:justify-end gap-6 opacity-0 md:opacity-100 transition-opacity">
                            <p className="hidden md:block font-sans text-xs text-gray-400 max-w-[200px] text-right">
                                {article.excerpt}
                            </p>
                            <ArrowUpRight className="w-6 h-6 transform group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Floating Image Preview - Desktop Only */}
            <motion.div
                style={{
                    x: xSpring,
                    y: ySpring,
                    translateX: "-50%",
                    translateY: "-50%",
                }}
                className="hidden md:block pointer-events-none absolute top-0 left-0 w-[400px] h-[300px] z-20 overflow-hidden rounded-lg shadow-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                    opacity: activeProject !== null ? 1 : 0,
                    scale: activeProject !== null ? 1 : 0.8
                }}
                transition={{ duration: 0.2 }}
            >
                {articles.map((article, i) => (
                    <div
                        key={article.id}
                        className={`absolute top-0 left-0 w-full h-full transition-opacity duration-300 ${activeProject === i ? "opacity-100" : "opacity-0"}`}
                    >
                        <Image
                            src={article.src}
                            alt={article.title}
                            fill
                            className="object-cover"
                            quality={100}
                            priority
                            sizes="400px"
                        />
                    </div>
                ))}
            </motion.div>
        </section>
    );
}
