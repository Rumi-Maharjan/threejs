"use client";
import React from "react";
import Sidebar from "./sidebar";
import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { IoIosLogOut } from "react-icons/io";

interface AdminProps{
    children: ReactNode;
}

const Header: React.FC<AdminProps> = ({ children }) => {
    return (
        <div className="bg-white flex text-black">
            <Sidebar/>
            <div className="px-10 h-[100px] border-b shadow-b-xl bg flex items-center justify-between fixed left-[260px] right-0 top-0 text-xl z-10 bg-white">
                <div>Admin Panel</div> 
                {/* <button className="mr-4">
                    <IoIosLogOut size={24} />
                </button> */}
            </div>
            <div className="flex ml-[260px] bg min-h-screen pt-[114px] w-full">
                <div className="w-full overflow-y-auto p-4 bg-white text-black">
                    {children}
                </div>
            </div>
            <div>

            </div>
        </div>
    );
};
export default Header;