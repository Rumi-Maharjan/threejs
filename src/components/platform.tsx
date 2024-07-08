"use client";

import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { ProgressSpinner } from "primereact/progressspinner";
import Link from "next/link";

interface PlatformData {
    id: number;
    name: string[];
    value: string[];
}

const Platform: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [platformData, setPlatformData] = useState<PlatformData>({
        id: 0,
        name: [],
        value: []
    });

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const res = await fetch('/api/listen/');
            const json = await res.json();
            console.log("data:", json);
            if (json.data.length > 0) {
                setPlatformData(json.data[0]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="w-[80%] mx-auto">
            <div className="relative">
                <div className="h-[30vw]">
                    <img src="/mic4.jpg" className="w-full object-cover h-full object-right-top rounded-md"/>
                </div>
            </div>
            <div className="mt-20 flex justify-center">
                <div>
                    <div>
                        <div className="font-semibold text-xl mb-7">Listen On:</div>
                        <div className="flex gap-3 mb-11 flex-wrap">
                            {platformData.name.map((name, index) => (
                                <a key={index} href={platformData.value[index]} target="_blank" rel="noopener noreferrer">
                                    <div className="rounded-md py-3 flex gap-3 w-44 justify-center text-gray-500 shadow-md border font-semibold">{name}</div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Platform;
