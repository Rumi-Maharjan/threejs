"use client";

import React from "react";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';

const Explore: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: { opacity: 1, y: 0 },
    };

    const links = [
        { href: "/store", label: "Store" },
        { href: "/album", label: "Album" },
        { href: "/gallery", label: "Gallery & Blogs" },
        { href: "/contact", label: "Contact Us" },
    ];

    return (
        <div>
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        variants={containerVariants}
                        className="flex flex-col gap-3 py-7"
                    >
                        {links.map((link, index) => (
                            <motion.li
                                key={link.href}
                                custom={links.length - index - 1}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                variants={itemVariants}
                                transition={{ delay: (links.length - index - 1) * 0.2 }}
                            >
                                <Link href={link.href}>{link.label}</Link>
                            </motion.li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
            <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer explore-bg p-1 bg-opacity-30 rounded-md w-fit">
                Explore
            </div>
        </div>
    );
};

export default Explore;
