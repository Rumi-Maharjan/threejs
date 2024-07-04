"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar: React.FC = () =>{
    return (
        <div>
            <div className="h-full bg w-[260px] fixed top-0 left-0 flex flex-col border-r border-gray shadow-xl z-10 text-black">
                <Link href="/admin" className="flex justify-center border-b w-full">
                    <div className="flex items-center justify-center h-[99px]">PROHDEEN</div>
                </Link>
                <div className="w-full flex justify-center mt-4">
                    <div className="flex flex-col my-4 w-full gap-7 items-center">
                        <Link href="/admin/genre"><div>Genre</div></Link>
                        <Link href="/admin/album"><div>Album</div></Link>
                        <Link href="/admin/song"><div>Song</div></Link>
                        <Link href="/admin/store/store-category"><div>Store Category</div></Link>
                        <Link href="/admin/store/store-item"><div>Store Item</div></Link>
                        <Link href="/admin/inquiry"><div>Inquiry</div></Link>
                        <Link href="/admin/contact"><div>Contact</div></Link>
                        <Link href="/admin/platform"><div>Platform</div></Link>
                        <div>Gallery</div>
                        <div>Blogs</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Sidebar;