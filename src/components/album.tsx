"use client";

import React from "react";
import { FaRegBell } from "react-icons/fa6";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import Link from "next/link";

const albums = [
    { name: "Daily Mix 1", image: "/Picture.png" },
    { name: "Daily Mix 2", image: "/moon.jpg" },
    { name: "Liked Songs", image: "/owl planter.jpg" },
    { name: "Mix 1", image: "/cyro.png" },
    { name: "Mix 2", image: "/cow planter.jpg" },
    { name: "Mix 3", image: "/4357971.jpg" },
    { name: "Daily Mix 3", image: "/cat3.jpg" },
    { name: "Mix", image: "/nordic style candle holder.webp" },
];

const Album: React.FC = () => {
    return (
        <div className="min-h-[100vh] gradient-bg p-7 text-white">
            <div className="text-white flex justify-between text-3xl mb-3">
                <div className="flex gap-5 arrow">
                    <IoChevronBackOutline className="rounded-full p-1 bg-black bg-opacity-30 direction"/>
                    <IoChevronForwardOutline className="rounded-full p-1 bg-black bg-opacity-30 direction" />
                </div>
                <div className="flex gap-5">
                    <FaRegBell className="rounded-full p-2 bg-black bg-opacity-30" />
                    <HiOutlineUserGroup className="rounded-full p-1 bg-black bg-opacity-30" />
                </div>
            </div>

            <div className="flex gap-2 mb-5">
                <div className="rounded-full px-3 album-bg py-1">All</div>
                <div className="album-bg rounded-full px-3 px-3 py-1">Music</div>
            </div>

            <div className="flex flex-wrap justify-between">
                {albums.map((album, index) => (
                    <div key={index} className="w-[24%] album-bg font-semibold rounded-md mb-4">
                        <Link href="/album/list" className="flex gap-5 items-center">
                            <img src={album.image} className="h-20 w-20 rounded-l-md object-cover"/>
                            <div>{album.name}</div>
                        </Link>
                    </div>
                ))}
            </div>

            <div>
                <div className="mt-7 mb-3 flex justify-between">
                    <div className="font-semibold">Made For You</div>
                    <div className="text-sm">Show all</div>
                </div>
                <div className="flex gap-5">
                    {albums.slice(0,6).map((album, index) => (
                        <div key={index}>
                            <Link href="/album/list">
                                <img src={album.image} className="w-36 h-36 object-cover rounded-md mb-2"/>
                                <div className="text-sm">{album.name}</div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <div>
                <div className="mt-10 mb-3 flex justify-between">
                    <div className="font-semibold">Jump back in</div>
                    <div className="text-sm">Show all</div>
                </div>
                <div className="flex gap-5">
                    {albums.slice(0,7).map((album, index) => (
                        <div key={index}>
                            <Link href="/album/list">
                                <div className="w-36 h-36 rounded-full mb-2 overflow-hidden ">
                                    <img src={album.image} className="object-cover w-full h-full"/>
                                </div>
                                <div className="w-36 flex flex-col items-center gap-2">
                                    <div className="text-sm">{album.name}</div>
                                    <div className="text-gray-500 text-xs">Artist</div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            <div><Link className="block z-20 w-[11px] h-[11px]" style={{position:'absolute', left:'57.70758551520272%',top:'44.702315276195904%'}} href="/list"><span className="block p-4 md:p-0 absolute -top-4 -left-4 md:static  before:block before:bg-white before:rounded-full before:w-[11px] before:h-[11px] before:shadow-[0_0_10px_5px_#00000040]" style={{transform: 'scale(0.8) translateZ(0px)'}}></span><span className="block absolute bg-white/5 border border-white rounded-full pointer-events-none -top-[40px] -bottom-[40px] -left-[40px] -right-[40px]" style={{opacity: '0.802914', transform: 'scale(0.197086) translateZ(0px)'}}></span><div className="transition duration-150 ease-in-out block absolute top-full bg-white font-bold text-base py-2 px-4 rounded-full left-1/2 -translate-x-1/2  opacity-0 pointer-events-none" style={{ whiteSpace: 'nowrap', lineHeight: 1, boxShadow: '0 0 10px #00000040', transform: 'translateX(-50%) translateY(12px)' }}><span className="block absolute -top-1 left-1/2 -translate-x-1/2 z-10 rotate-45 w-2 h-2 bg-white rounded-[2px_0_0] shadow-[0_0_10px_#0000001a]"></span>October's Very Own</div></Link></div>
        </div>
    );
};

export default Album;