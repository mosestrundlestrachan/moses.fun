"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SectionWrapperProps {
    children: ReactNode;
    className?: string;
    id?: string;
}

export default function SectionWrapper({ children, className = "", id }: SectionWrapperProps) {
    return (
        <motion.div
            id={id}
            initial={{ opacity: 0, y: 100, filter: "blur(5px)", scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            viewport={{ once: false, amount: 0.2, margin: "-100px" }}
            transition={{ type: "spring", stiffness: 75, damping: 20, mass: 1 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
