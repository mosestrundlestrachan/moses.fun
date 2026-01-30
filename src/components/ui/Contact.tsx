"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Contact() {
    return (
        <section className="pt-24 pb-12 px-6 md:px-12 max-w-[1400px] mx-auto bg-white text-black">
            <div className="flex flex-col items-start text-left">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="font-serif text-5xl md:text-7xl font-normal mb-8 tracking-tight"
                >
                    Let's Talk.
                </motion.h2>
                <p className="font-serif text-xl text-gray-500 max-w-lg leading-relaxed mb-12">
                    Open for collaboration on data-driven interfaces and experimental web design.
                </p>

                <div className="flex gap-8 font-sans text-xs font-bold uppercase tracking-widest">
                    <a href="mailto:trundle.moses@gmail.com" className="hover:text-gray-600 transition-colors">Email</a>
                    <a href="https://www.linkedin.com/in/moses-trundle-strachan/" className="hover:text-gray-600 transition-colors">LinkedIn</a>
                    <a href="https://github.com/mosestrundlestrachan" className="hover:text-gray-600 transition-colors">GitHub</a>
                    <a href="https://www.instagram.com/mosestrundlestrachan/" className="hover:text-gray-600 transition-colors">Instagram</a>
                </div>
            </div>
        </section>
    );
}
