"use client";

import { useEffect, useState } from "react";

export function CurrentDate() {
    const [date, setDate] = useState<string>("");

    useEffect(() => {
        setDate(new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        }));
    }, []);

    if (!date) return null; // Avoid rendering anything until hydrated

    return <span className="font-sans text-xs uppercase tracking-widest text-gray-500">{date}</span>;
}
