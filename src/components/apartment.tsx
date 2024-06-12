"use client";

import React, { useRef, useEffect, useState } from "react";
import Link from "next/link";

const Apartment: React.FC = () => {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState<number>(0);
    const [containerHeight, setContainerHeight] = useState<number>(0);

    useEffect(() => {
        const handleResize = () => {
            if (sectionRef.current) {
                setContainerWidth(sectionRef.current.offsetWidth);
                setContainerHeight(sectionRef.current.offsetHeight);
            }
        };

        // Initial size on mount
        handleResize();

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    useEffect(() => {
        const handleScroll = (event: WheelEvent) => {
            if (sectionRef.current) {
                const deltaY = event.deltaY;
                const currentScale = parseFloat(sectionRef.current.style.transform.replace("scale(", "").replace(")", "")) || 1;

                // Adjust the scale factor based on scroll direction
                const newScale = deltaY > 0 ? currentScale - 0.1 : currentScale + 0.1;
                
                // Set minimum and maximum scale values
                const minScale = 0.5;
                const maxScale = 2;
                if (newScale >= minScale && newScale <= maxScale) {
                    sectionRef.current.style.transform = `scale(${newScale})`;
                }
            }
        };

        window.addEventListener("wheel", handleScroll);

        return () => {
            window.removeEventListener("wheel", handleScroll);
        };
    }, []);

    const handleImageLoad = () => {
        // Calculate initial dimensions after image load
        if (sectionRef.current) {
            setContainerWidth(sectionRef.current.offsetWidth);
            setContainerHeight(sectionRef.current.offsetHeight);
        }
    };

    useEffect(() => {
        // Ensure initial dimensions are calculated after image load
        handleImageLoad();
    }, []); // Empty dependency array to run only once on mount

    return (
        <div className="apartment">
            {/* Section */}
            <div ref={sectionRef} style={{ position: "relative" }}>
                <img
                    src="/Apartment.svg"
                    width={800}
                    onLoad={handleImageLoad} // Ensure dimensions are recalculated after image load
                />
                <Link href="/house">
                    <div className="tv" style={{
                        position: "absolute",
                        left: `${containerWidth * 0.62}px`,
                        top: `${containerHeight * 0.38}px`,
                    }}></div>
                </Link>
                <Link href="/">
                    <div className="fridge" style={{
                        position: "absolute",
                        left: `${containerWidth * 0.64}px`,
                        top: `${containerHeight * 0.459}px`,
                    }}></div>
                </Link>
                <Link href="/store">
                    <div className="laptop" style={{
                        position: "absolute",
                        left: `${containerWidth * 0.43}px`,
                        top: `${containerHeight * 0.483}px`,
                    }}></div>
                </Link>
                <div className="laptop-arrow" style={{
                        position: "absolute",
                        left: `${containerWidth * 0.441}px`,
                        top: `${containerHeight * 0.425}px`,
                    }}>
                        <div className="bg-black text-white rounded-md text-sm p-1 -mb-3">Store</div>
                        <img src="/arrow3.gif"/>
                    </div>
                <Link href="/album">
                    <div className="book-shelf" style={{
                        position: "absolute",
                        left: `${containerWidth * 0.56}px`,
                        top: `${containerHeight * 0.285}px`,
                    }}></div>
                </Link>
                <div className="book-shelf-arrow" style={{
                        position: "absolute",
                        left: `${containerWidth * 0.565}px`,
                        top: `${containerHeight * 0.23}px`,
                    }}>
                        <div className="bg-black text-white rounded-md text-sm p-1 -mb-3">Album</div>
                        <img src="/arrow.gif"/>
                    </div>
            </div>
        </div>
    );
};

export default Apartment;
