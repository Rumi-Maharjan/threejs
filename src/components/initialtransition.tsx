import React, { useState } from "react";
import { motion } from "framer-motion";

const InitialTransition: React.FC = () => {
    const [isAnimate, setAnimate] = useState(false);
    const [isFlipped, setFlipped] = useState(false);

    const blackBoxVariants = {
        initial: {
            height: "100vh",
            bottom: 0,
        },
        animate: {
            height: 0,
            transition: {
                when: "afterChildren",
                duration: 3,
                ease: [0.87, 0, 0.13, 1],
            },
        },
    };

    const svgVariants = {
        initial: {
            opacity: 0,
        },
        animate: {
            opacity: 1,
            transition: {
                duration: 2,
                ease: [0.87, 0, 0.13, 1],
            },
        },
    };

    const polygons = [
        { cls: "cls-1", points: "246.6 241.98 246.6 89.41 159.58 241.98 246.6 241.98", x: -500, y: -500 },
        { cls: "cls-2", points: "246.6 248.5 246.6 295.82 165.02 248.5 246.6 248.5", x: 500, y: -500 },
        { cls: "cls-3", points: "65.75 404.6 243.61 301.53 154.68 250.14 65.75 404.6", x: -500, y: 500 },
        { cls: "cls-4", points: "69.29 410.59 246.6 307.79 246.6 410.59 69.29 410.59", x: 200, y: 200 },
        { cls: "cls-1", points: "253.4 241.98 253.4 89.41 340.42 241.98 253.4 241.98", x: -200, y: -200 },
        { cls: "cls-2", points: "253.4 248.5 253.4 295.82 334.98 248.5 253.4 248.5", x: 200, y: -200 },
        { cls: "cls-3", points: "434.25 404.6 256.39 301.53 345.32 250.14 434.25 404.6", x: -200, y: 200 },
        { cls: "cls-4", points: "430.71 410.59 253.4 307.79 253.4 410.59 430.71 410.59", x: 200, y: 200 },
    ];

    const handleAnimationComplete = () => {
        const element = document.getElementById("initial-transition");
        if (element) {
            element.style.display = "none";
        }
    };

    const handleClick = () => {
        if (isAnimate) {
            setFlipped(!isFlipped);
        } else {
            setAnimate(true);
        }
    };

    return (
        <motion.div
            className="absolute z-50 flex items-center justify-center w-full h-full bg-black"
            initial="initial"
            id="initial-transition"
            animate={isAnimate ? "animate" : ""}
            variants={blackBoxVariants}
            onAnimationComplete={handleAnimationComplete}
            onClick={handleClick}
        >
            <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 500 500"
                className="w-full h-full"
                variants={svgVariants}
                initial="initial"
                animate="animate"
            >
                <defs>
                    <style>
                        {`.cls-1 { fill: #ec1c24; }
                          .cls-2 { fill: #283b97; }
                          .cls-3 { fill: #ecd710; }
                          .cls-4 { fill: #611d5d; }`}
                    </style>
                </defs>
                {polygons.map((polygon, index) => (
                    <motion.polygon
                        key={index}
                        className={polygon.cls}
                        points={polygon.points}
                        initial={{ opacity: 0, x: polygon.x, y: polygon.y }}
                        animate={{
                            opacity: 1,
                            x: 0,
                            y: 0,
                            rotateY: isFlipped ? 180 : 0,
                        }}
                        transition={{ duration: 2.5, ease: "easeOut", delay: index * 0.2 }}
                    />
                ))}
            </motion.svg>
            <div className="text-white absolute bottom-20 text-3xl font-semibold">PROHDEEN</div>
        </motion.div>
    );
};

export default InitialTransition;
