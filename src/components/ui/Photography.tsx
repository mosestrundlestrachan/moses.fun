"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

const photos = [
    { id: 1, src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop&q=60", caption: "Fig 1. Solitude in the peaks." },
    { id: 2, src: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&auto=format&fit=crop&q=60", caption: "Fig 2. Texture of urban life." },
    { id: 3, src: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=60", caption: "Fig 3. Light filtering through." },
];

export default function Photography() {
    return (
        <section className="py-24 px-6 md:px-12 max-w-[1400px] mx-auto">
            <h2 className="font-serif text-5xl md:text-6xl font-normal text-black">Photos</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {photos.map((photo, i) => (
                    <motion.div
                        key={photo.id}
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                        className="group relative overflow-hidden"
                    >
                        <div className="aspect-[4/5] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700 relative">
                            <Image
                                src={photo.src}
                                alt={photo.caption}
                                fill
                                className="object-cover scale-100 group-hover:scale-105 transition-transform duration-700"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                        <div className="absolute bottom-4 left-4 bg-white/80 backdrop-blur-sm px-3 py-1 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            <p className="font-sans text-[10px] font-bold uppercase tracking-widest text-black">
                                {photo.caption}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-16 flex justify-center md:justify-start">
                <a
                    href="/gallery"
                    className="group flex items-center gap-3 border-b border-black pb-1 hover:opacity-60 transition-opacity"
                >
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-black">View Gallery</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </a>
            </div>
        </section>
    );
}
