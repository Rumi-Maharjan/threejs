"use client";

import React, { useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import InitialTransition from "./initialtransition";

const HomePage: React.FC = () => {
    const router = useRouter();
    const [svgContent, setSvgContent] = useState<string | null>(null);

    useEffect(() => {
        fetch('/Homepage-01.svg')
            .then(response => response.text())
            .then(data => {
                console.log('SVG content loaded');
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(data, "image/svg+xml");

                const computerGroup = svgDoc.querySelector("#computer");
                if (computerGroup) {
                    const computerLink = document.createElementNS("http://www.w3.org/2000/svg", "a");
                    computerLink.setAttributeNS(null, "href", "/store");
                    while (computerGroup.firstChild) {
                        computerLink.appendChild(computerGroup.firstChild);
                    }
                    computerGroup.appendChild(computerLink);
                }

                const axoGroup = svgDoc.querySelector("#Axo_Extrusion_00000145019790728532539220000007906557968264228762_");
                if (axoGroup) {
                    const axoLink = document.createElementNS("http://www.w3.org/2000/svg", "a");
                    axoLink.setAttributeNS(null, "href", "/album");
                    while (axoGroup.firstChild) {
                        axoLink.appendChild(axoGroup.firstChild);
                    }
                    axoGroup.appendChild(axoLink);
                }

                const triangleGroup = svgDoc.querySelector("#triangle");
                if (triangleGroup) {
                    const triangleLink = document.createElementNS("http://www.w3.org/2000/svg", "a");
                    triangleLink.setAttributeNS(null, "href", "/store");
                    while (triangleGroup.firstChild) {
                        triangleLink.appendChild(triangleGroup.firstChild);
                    }
                    triangleGroup.appendChild(triangleLink);
                }

                const foreignObject1 = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
                foreignObject1.setAttribute("x", "630");
                foreignObject1.setAttribute("y", "440");
                foreignObject1.setAttribute("width", "50");
                foreignObject1.setAttribute("height", "50");
                foreignObject1.innerHTML = `
                    <div xmlns="http://www.w3.org/1999/xhtml" class="">
                        <a href="/store" class="p-4 pb-11">
                            <div class="dot-wrapper">
                                <div class="dot"></div>
                            </div>
                        </a>
                    </div>
                `;
                svgDoc.documentElement.appendChild(foreignObject1);

                const foreignObject11 = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
                foreignObject11.setAttribute("x", "625");
                foreignObject11.setAttribute("y", "425");
                foreignObject11.setAttribute("width", "55");
                foreignObject11.setAttribute("height", "25");
                foreignObject11.innerHTML = `
                    <div xmlns="http://www.w3.org/1999/xhtml">
                        <div class="w-15 px-2 rounded-md bg-black text-gray-300">Store</div>
                    </div>
                `;
                svgDoc.documentElement.appendChild(foreignObject11);

                const foreignObject2 = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
                foreignObject2.setAttribute("x", "639");
                foreignObject2.setAttribute("y", "295");
                foreignObject2.setAttribute("width", "50");
                foreignObject2.setAttribute("height", "50");
                foreignObject2.innerHTML = `
                    <div xmlns="http://www.w3.org/1999/xhtml" class="">
                        <a href="/album" class="p-4 pb-11">
                            <div class="dot-wrapper">
                                <div class="dot"></div>
                            </div>
                        </a>
                    </div>
                `;
                svgDoc.documentElement.appendChild(foreignObject2);

                const foreignObject22 = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
                foreignObject22.setAttribute("x", "635");
                foreignObject22.setAttribute("y", "280");
                foreignObject22.setAttribute("width", "65");
                foreignObject22.setAttribute("height", "25");
                foreignObject22.innerHTML = `
                    <div xmlns="http://www.w3.org/1999/xhtml">
                        <div class="w-16 px-2 rounded-md bg-black text-gray-300">Album</div>
                    </div>
                `;
                svgDoc.documentElement.appendChild(foreignObject22);

                setSvgContent(new XMLSerializer().serializeToString(svgDoc));
            })
            .catch(error => console.error('Error loading SVG:', error));
    }, []);


    return (
        <div className="img-bg flex items-center justify-center">
            <InitialTransition/>
            <TransformWrapper wheel={{ step: 300 }}>
                <TransformComponent>
                    <div className="relative h-[100vh] w-[100vw] flex items-center justify-center">
                        {svgContent && <div dangerouslySetInnerHTML={{ __html: svgContent }} className="w-[80vw]" />}
                    </div>
                </TransformComponent>
            </TransformWrapper>
        </div>
    );
};

export default HomePage;
