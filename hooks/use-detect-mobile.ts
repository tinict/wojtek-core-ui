"use client";

import { createContext, useContext, useState, useEffect } from "react";

export const IsSsrMobileContext = createContext(false);

export function useDetectMobile(): boolean {
    const ssrIsMobile = useContext(IsSsrMobileContext);
    const [isMobile, setIsMobile] = useState(ssrIsMobile);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 1024px)");
        setIsMobile(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    return isMobile;
}