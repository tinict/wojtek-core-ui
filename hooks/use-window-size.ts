import { useEffect, useState } from "react";

export const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState<{
        width?: number;
        height?: number;
    }>({
        width: undefined,
        height: undefined
    });

    useEffect(() => {
        if (typeof window === 'undefined') {
            console.log('useWindowSize: window undefined');
            return;
        }

        function handleResize() {
            const newSize = {
                width: window.innerWidth,
                height: window.innerHeight
            };
            console.log('useWindowSize handleResize:', newSize);
            setWindowSize(newSize);
        }

        window.addEventListener("resize", handleResize);

        handleResize();
        
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowSize;
};