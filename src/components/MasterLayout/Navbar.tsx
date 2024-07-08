"use client";

import React from "react";
import { FiUser } from "react-icons/fi";
import { IoFolderOpenOutline } from "react-icons/io5";
import Link from "next/link";

const Navbar: React.FC = () => {
    return (
        <div className="store-bg pb-10">
            <div className="flex w-[80%] mx-auto justify-between items-center py-5">
                <div className="text-5xl font-semibold text-black">Prodheen</div>
                <div className="flex gap-3 text-3xl">
                    <FiUser />
                    <IoFolderOpenOutline />
                </div>
            </div>

            <div className="w-full bg-black">
                <div className="w-[80%] mx-auto py-3 flex gap-7 text-sm font-serif text-stone-300 font-semibold">
                    <Link href="/"><div>Home</div></Link>
                    <Link href="/store"><div>Store</div></Link>
                    <Link href="/album"><div>Album</div></Link>
                    <Link href="/gallery"><div>Gallery & Blogs</div></Link>
                    <Link href="/platform"><div>Platform</div></Link>
                    <Link href="/contact"><div>Contact Us</div></Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
