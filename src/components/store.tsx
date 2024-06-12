"use client";

import React from "react";
import { FiUser } from "react-icons/fi";
import { IoFolderOpenOutline } from "react-icons/io5";
import Link from "next/link";

const items = [
    { name: "Daily Mix 1", image: "/Picture.png", price: "$ 25.00" },
    { name: "Daily Mix 2", image: "/moon.jpg", price: "$ 65.00" },
    { name: "Liked Songs", image: "/owl planter.jpg", price: "$ 27.00" },
    { name: "Mix 1", image: "/cyro.png", price: "$ 20.00" },
    { name: "Mix 2", image: "/cow planter.jpg", price: "$ 30.00" },
    { name: "Mix 3", image: "/4357971.jpg", price: "$ 35.00" },
    { name: "Daily Mix 3", image: "/cat3.jpg", price: "$ 10.00" },
    { name: "Mix", image: "/nordic style candle holder.webp", price: "$ 15.00" },
    { name: "Mix Mix", image: "/Pot and candles.jpg", price: "$ 15.00" },
];

const Store: React.FC = () => {
    return (
        <div className="store-bg">
            <div className="flex w-[80%] mx-auto justify-between items-center py-5">
                <div className="text-5xl font-semibold">Hello</div>
                <div className="flex gap-3 text-3xl">
                    <FiUser/>
                    <IoFolderOpenOutline />
                </div>
            </div>

            <div className="w-full bg-black mb-20">
                <div className="w-[80%] mx-auto py-3 flex gap-7 text-sm font-serif text-stone-300 font-semibold">
                    <div>Home</div>
                    <div>Real Good Shit</div>
                    <div>Apparel</div>
                    <div>Prints</div>
                    <div>Music</div>
                    <div>Accessories</div>
                </div>
            </div>

            <div className="flex flex-wrap px-11 justify-between mb-40">
                {items.map((items, index) => (
                    <div key={index} className="mb-11 cursor-pointer">
                        <Link href="/store/details">
                            <div className="w-[30vw] h-[38vw] overflow-hidden">
                                <img src={items.image} className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105" />
                            </div>
                            <div className="pt-4">
                                <div className="text-xl mb-1">{items.name}</div>
                                <div>{items.price}</div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>

            <div className="bg-black py-11">
                <div className="w-[80%] mx-auto h-40 text-white">
                    Footer
                </div>
            </div>
        </div>
    );
};

export default Store;