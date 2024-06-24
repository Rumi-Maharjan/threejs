"use client";

import React from "react";
import Link from "next/link";

const gallery = [
    { name: "Abstract Colors", image: "/Picture.png" },
    { name: "Renaissance Woman", image: "/moon.jpg" },
    { name: "Countryside Serenity", image: "/owl planter.jpg" },
];

const blogs = [
    { name: "The Art of Brush Strokes", image: "/Picture.png", date: "March 15, 2023", description: "Explore the techniques behind creating stunning brush strokes in your painting." },
    { name: "Mixing Colors Like a Pro", image: "/moon.jpg", date: "February 28, 2023", description: "Learn the secrets to mixing colors to achieve the [erfect shades for your painting." },
    { name: "Sketching Essentials", image: "/owl planter.jpg", date: "January 10, 2023", description: "Discover the essentials tools and techniques for sketching your next painting." },
];

const Gallery: React.FC = () => {
    return (
        <div className="w-[80%] mx-auto">
            <div>
                <div className="font-bold text-3xl mb-11">Gallery</div>
                <div className="flex justify-between">
                    {gallery.map((image, index) => (
                        <div key={index}>
                            <Link href="">
                            <div className="w-[25vw] h-[20vw] overflow-hidden mb-2">
                                <img src={image.image} className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"/>
                            </div>
                                <div className="font-semibold">{image.name}</div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <div className="py-7">
                <div className="font-bold text-3xl mb-11">Blog</div>
                <div className="flex flex-col gap-7">
                    {blogs.map((blog, index) => (
                        <div key={index} className="flex gap-5 items-start">
                            <div className="w-48 h-32 overflow-hidden">
                                <img src={blog.image} className="w-full h-full object-cover transform transition-transfrom duration-700 hover:scale-105"/>
                            </div>
                            <div className="w-[32%]">
                                <div className="font-semibold">{blog.name}</div>
                                <div className="text-sm">{blog.date}</div>
                                <div className="text-sm line-clamp-1">{blog.description}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default Gallery;