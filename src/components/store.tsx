// Store.tsx
"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const items = [
    { name: "Daily Mix 1", image: "/Picture.png", price: "25" },
    { name: "Daily Mix 2", image: "/moon.jpg", price: "65" },
    { name: "Liked Songs", image: "/owl planter.jpg", price: "27" },
    { name: "Mix 1", image: "/cyro.png", price: "20" },
    { name: "Mix 2", image: "/cow planter.jpg", price: "$ 30.00" },
    { name: "Mix 3", image: "/4357971.jpg", price: "$ 35.00" },
    { name: "Daily Mix 3", image: "/cat3.jpg", price: "$ 10.00" },
    { name: "Mix", image: "/nordic style candle holder.webp", price: "$ 15.00" },
    { name: "Mix Mix", image: "/Pot and candles.jpg", price: "$ 15.00" },
];

const Store: React.FC = () => {

    return (
        <>
        <div className="store-bg pt-10">
            <div className="flex flex-wrap px-11 justify-between mb-40">
                {items.map((item, index) => (
                    <div key={index} className="mb-11 cursor-pointer">
                        <Link href={`/store/details?image=${encodeURIComponent(item.image)}`}>
                            <motion.div layoutId={item.image} className="w-[30vw] h-[38vw] overflow-hidden">
                                <motion.img
                                    src={item.image}
                                    className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
                                    alt={item.name}
                                />
                            </motion.div>
                            <div className="pt-4">
                                <div className="text-xl mb-1">{item.name}</div>
                                <div>{item.price}</div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
        </>

    );
};

export default Store;
