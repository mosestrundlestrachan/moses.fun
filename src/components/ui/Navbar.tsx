"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export default function Navbar() {
    const { scrollY } = useScroll();
    const [hidden, setHidden] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() || 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: "-100%" },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 px-6 md:px-12 py-4"
        >
            <div className="max-w-[1400px] mx-auto flex justify-between items-center">
                <a href="#" className="font-serif text-xl font-bold tracking-tight text-black hover:opacity-70 transition-opacity">
                    M.
                </a>

                <div className="flex gap-8">
                    {[
                        { name: "Work", href: "#work" },
                        { name: "Photos", href: "#photos" },
                        { name: "Contact", href: "#contact" },
                    ].map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="font-sans text-[10px] md:text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-black transition-colors"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </div>
        </motion.nav>
    );
}
