"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus, Minus, ArrowDown } from "lucide-react";

const roles = [
    {
        id: 1,
        role: "Creative Technologist",
        company: "Univ. of Washington",
        period: "2023 — Present",
        description: "Leading the development of experimental web interfaces and tangible media projects. Bridging the gap between physical sensors and digital feedback loops."
    },
    {
        id: 2,
        role: "Frontend Engineer",
        company: "Freelance",
        period: "2021 — 2023",
        description: "Built high-performance marketing sites and e-commerce platforms for boutique brands. Specialized in Next.js transitions and headless CMS integrations."
    },
    {
        id: 3,
        role: "Design Intern",
        company: "Studio Alpha",
        period: "2020 — 2021",
        description: "Assisted in the creation of brand identity systems and digital campaigns. Learned the fundamentals of typographic hierarchy and grid systems."
    }
];

export default function Resume() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
            <div className="flex justify-between items-baseline mb-16 border-b border-black pb-4">
                <h2 className="font-serif text-4xl md:text-5xl font-normal text-black uppercase tracking-normal">About</h2>

            </div>

            <div className="flex flex-col">
                {roles.map((role, i) => (
                    <div
                        key={role.id}
                        className="border-b border-gray-200 last:border-black cursor-pointer group"
                        onClick={() => toggleAccordion(i)}
                    >
                        <div className="py-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-center gap-4 md:w-1/3">
                                <span className="font-sans text-xs font-bold uppercase tracking-widest text-gray-400 w-8">0{i + 1}</span>
                                <h3 className="font-serif text-2xl md:text-3xl font-medium group-hover:italic transition-all">{role.company}</h3>
                            </div>

                            <div className="md:w-1/3 text-left md:text-center">
                                <span className="font-sans text-xs font-bold uppercase tracking-widest text-black">{role.role}</span>
                            </div>

                            <div className="md:w-1/3 flex items-center justify-between md:justify-end gap-8">
                                <span className="font-serif italic text-gray-500">{role.period}</span>
                                <div className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full group-hover:border-black group-hover:bg-black group-hover:text-white transition-all">
                                    {activeIndex === i ? <Minus size={14} /> : <Plus size={14} />}
                                </div>
                            </div>
                        </div>

                        <AnimatePresence>
                            {activeIndex === i && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                    className="overflow-hidden"
                                >
                                    <div className="pb-8 pt-2 pl-0 md:pl-[calc(33.333%+2rem)] pr-0 md:pr-[calc(33.333%+2rem)]">
                                        <p className="font-serif text-lg leading-relaxed text-gray-600">
                                            {role.description}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            <div className="mt-16 flex justify-center md:justify-start">
                <a
                    href="/resume.pdf" // Placeholder path, user will need to provide file
                    download
                    className="group flex items-center gap-3 border-b border-black pb-1 hover:opacity-60 transition-opacity"
                >
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-black">Download Full Resume</span>
                    <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
                </a>
            </div>
        </section>
    );
}
