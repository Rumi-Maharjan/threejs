"use client";

import React from "react";
import { motion } from "framer-motion";

const InitialTransition: React.FC = () => {
    const blackBox = {
        initial: {
            height: "100vh",
            bottom: 0,
        },
        animate: {
            height: 0,
            transition: {
                when: "afterChildren",
                duration: 2,
                ease: [0.87, 0, 0.13, 1],
            },
        },
    };

    const textContainer = {
        initial: {
            opacity: 1,
        },
        animate: {
            opacity: 0,
            transition: {
                duration: 0.25,
                when: "afterChildren",
            },
        },
    };

    const text = {
        initial: {
            y: 40,
        },
        animate: {
            y: 80,
            transition: {
                duration: 1.5,
                ease: [0.87, 0, 0.13, 1],
            },
        },
    };

    const handleAnimationComplete = () => {
        const element = document.getElementById('initial-transition');
        if (element) {
            element.style.display = 'none';
        }
    };

    return (
            <motion.div
                className="absolute z-50 flex items-center justify-center w-full bg-black"
                initial="initial"
                id="initial-transition"
                animate="animate"
                variants={blackBox}
                onAnimationComplete={handleAnimationComplete}
            >
                <motion.svg variants={textContainer} className="absolute z-50 flex">
                    <pattern
                        id="pattern"
                        patternUnits="userSpaceOnUse"
                        width={750}
                        height={800}
                        className="text-white"
                    >
                        <rect className="w-full h-full fill-current" />
                        <motion.rect variants={text} className="w-full h-full text-gray-600 fill-current" />
                    </pattern>
                    <text
                        className="text-4xl font-bold"
                        textAnchor="middle"
                        x="50%"
                        y="50%"
                        style={{ fill: "url(#pattern)" }}
                    >
                        PROHDEEN
                    </text>
                </motion.svg>
            </motion.div>
    );
};

export default InitialTransition;
