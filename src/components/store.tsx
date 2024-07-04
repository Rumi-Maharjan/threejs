// Store.tsx
"use client";

import React, { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { IoFolderOpenOutline } from "react-icons/io5";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface Image {
    url: string;
}

interface Item {
    id: number;
    name: string;
    images: Image[];
    description: string;
    category_id: number;
    price: number;
    size: { value: string; label: string }[];
    color: { value: string; label: string }[];
    quantity: number;
}


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

    const [itemData, setItemData] = useState<Item[]>([]);
    const [id, setId] = useState();

    useEffect(() => {
        getData();
    }, []);
    
    const getData = async () => {
        try {
            const res = await fetch('/api/item/');
            const json = await res.json();
            console.log("data:", json);
            setItemData(json.data);
            setId(json.data.id);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    return (
        <div className="store-bg pt-10">
            <div className="flex flex-wrap px-11 justify-between pb-40">
                {itemData.map((item, index) => (
                    <div key={index} className="mb-11 cursor-pointer">
                        <Link href={`/store/details?id=${item.id}`}>
                            <motion.div layoutId={item.images[0].url} className="w-[30vw] h-[38vw] overflow-hidden">
                                <motion.img
                                    src={item.images[0].url}
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
    );
};

export default Store;
