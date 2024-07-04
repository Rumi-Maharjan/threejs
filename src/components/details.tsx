// Details.tsx
"use client";

import React, { useState, useEffect } from "react";
import { FiZoomIn, FiX } from "react-icons/fi";
import { RxUpload } from "react-icons/rx";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";

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
    size: string[];
    color: string[];
    quantity: number;
}

const items = [
    { id: 1, name: "Daily Mix 3", image: "/cat3.jpg", price: "$ 10.00" },
    { id: 2, name: "Mix", image: "/nordic style candle holder.webp", price: "$ 15.00" },
    { id: 3, name: "Mix Mix", image: "/Pot and candles.jpg", price: "$ 15.00" },
    { id: 4, name: "Daily Mix", image: "/slider1.jpg", price: "$ 15.00" },
];

const Details: React.FC = () => {
    const searchParams = useSearchParams();
    const [mainImage, setMainImage] = useState<string | null>(null);
    const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [quantity, setQuantity] = useState<number>(1);
    const [itemData, setItemData] = useState<Item | null>(null);

    const id = searchParams.get('id');
    console.log("id:", id);

    const openEnlargedView = (image: string) => {
        setEnlargedImage(image);
    };

    const closeEnlargedView = () => {
        setEnlargedImage(null);
    };
    
    const incrementQuantity = () => {
        setQuantity(prev => prev + 1);
    };

    const decrementQuantity = () => {
        setQuantity(prev => (prev > 1 ? prev - 1 : 1));
    };

    useEffect(() => {
        if (id) {
            getData(id);
        }
    }, [id]);

    useEffect(() => {
        if (itemData && itemData.images.length > 0) {
            setMainImage(itemData.images[0].url);
        }
    }, [itemData]);

    const getData = async (id: string) => {
        try {
            const res = await fetch(`/api/item/${id}`);
            const json = await res.json();
            console.log("data:", json);
            setItemData(json.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="store-bg">
            <div className="w-[80%] mx-auto flex gap-20">
                <div className="pt-10">
                    <motion.div
                        layoutId={mainImage || "mainImage"}
                        className="relative"
                        onClick={() => openEnlargedView(mainImage || "/moon.jpg")}
                    >
                        <motion.img
                            src={mainImage || "/moon.jpg"}
                            className="w-[33vw] h-[37vw] object-cover cursor-pointer"
                            onMouseEnter={() => setHoverIndex(0)}
                            onMouseLeave={() => setHoverIndex(null)}
                        />
                        {(hoverIndex === 0 && !enlargedImage) && (
                        <div className="absolute top-3 left-3 rounded-full bg-white h-7 w-7 flex items-center justify-center shadow-lg">
                            <FiZoomIn className="text-sm" />
                        </div>
                    )}
                    </motion.div>
                    <div className="w-[33vw] mt-3 grid grid-cols-2 gap-3">
                        {itemData && itemData.images.slice(1).map((image, index) => (
                            <div
                                key={index}
                                className="relative"
                                onClick={() => openEnlargedView(image.url)}
                            >
                                <img
                                    src={image.url}
                                    className="w-[16.5vw] h-[20vw] object-cover cursor-pointer"
                                    onMouseEnter={() => setHoverIndex(index + 1)}
                                    onMouseLeave={() => setHoverIndex(null)}
                                />
                                {(hoverIndex === index + 1 && !enlargedImage) && (
                                    <div className="absolute top-3 left-3 rounded-full bg-white h-7 w-7 flex items-center justify-center shadow-lg">
                                        <FiZoomIn className="text-sm" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="h-fit pt-10 sticky top-0">
                    <div className="text-5xl w-96 mb-3">{itemData?.name}</div>
                    <div>£{itemData?.price}</div>
                    <div className="my-5">
                        <div className="text-sm">Size</div>
                        <div className="text-sm mb-2"><u>Size Guide</u></div>
                        <div className="flex gap-3">
                            {itemData?.size.map((size, index) => (
                                <div key={index} className="px-5 py-1 border rounded-md border-black">{size}</div>
                            ))}
                        </div>
                    </div>
                    <div className="mb-7">
                        <div className="text-sm mb-1">Quantity</div>
                        <div className="flex items-center gap-3 border border-gray-500 w-36 gap-3 justify-center py-2">
                            <button onClick={decrementQuantity} className="text-2xl">-</button>
                            <span className="mx-5">{quantity}</span>
                            <button onClick={incrementQuantity} className="text-2xl">+</button>
                        </div>
                    </div>
                    <div className="border border-black box-shadow flex justify-center items-center py-2 rounded-md w-96 mb-2">Add to cart</div>
                    <div className="flex justify-center items-center py-2 text-white bg-indigo-700 rounded-md w-96 mb-3">Buy with shop</div>
                    <div className="w-96 text-center text-sm mb-7"><u>More payment options</u></div>
                    <div className="font-sans mb-5 max-w-[550px]">
                        {itemData?.description}
                    </div>
                    {/* <div className="font-sans mb-11 max-w-[550px]">
                        Ethically produced by Do Good Factory in their BSCI audited factory, to REACH standard. They pledge 1% of their sales to the preservation & restoration of the oceans with Surfers Against Sewage.
                    </div> */}
                    <div className="flex items-center text-sm gap-2"><RxUpload /><span>Share</span></div>
                </div>
            </div>

            {enlargedImage && (
                <div className="fixed inset-0 flex items-center justify-center px-[10%] overflow-y-scroll min-h-[100vh] w-[100vw] bg-white z-10" onClick={closeEnlargedView}>
                    <div className="w-full h-full flex justify-center items-center">
                        <img src={enlargedImage} className="object-content" />
                    </div>
                    <div
                        className="fixed top-3 right-7 cursor-pointer text-white m-4 border rounded-full p-1 border-gray-300"
                        onClick={closeEnlargedView}
                    >
                        <FiX className="text-3xl text-gray-300" />
                    </div>
                </div>
            )}

            <div className="w-[80%] mx-auto mt-14 mb-20 z-0">
                <div className="text-4xl mb-7">You may also like</div>
                <div className="flex grid grid-cols-4 gap-11">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            className="mb-11 cursor-pointer"
                        >
                            <Link href={`/store/details?id=${item.id}`}>
                                <div className="w-full h-[20vw] overflow-hidden">
                                    <motion.img
                                        src={item.image}
                                        className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
                                    />
                                </div>
                                <div className="pt-4">
                                    <div className="text-xl mb-1">{item.name}</div>
                                    <div>{item.price}</div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Details;
