"use client";

import React, { useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useRouter } from 'next/navigation';

const HomePage: React.FC = () => {
    const router = useRouter();
    const [svgContent, setSvgContent] = useState<string | null>(null);


    useEffect(() => {
        fetch('/Homepage-01.svg')
            .then(response => response.text())
            .then(data => {
                console.log('SVG content loaded');
                setSvgContent(data);
            })
            .catch(error => console.error('Error loading SVG:', error));
    }, []);

    useEffect(() => {
        const handleClick = (id: string) => {
            console.log(`Element with id ${id} clicked`);
            if (id === 'computer') {
                router.push("/album");
            } else if (id === 'Axo_Extrusion_00000145019790728532539220000007906557968264228762_') {
                router.push("/store");
            }
        };

        const handleSvgLoad = () => {
            const computer = document.getElementById("computer");
            const cd = document.getElementById("Axo_Extrusion_00000145019790728532539220000007906557968264228762_");

            if (computer) {
                computer.addEventListener("click", () => handleClick('computer'));
                console.log('Event listener added to computer');

                const computerImg = document.createElementNS("http://www.w3.org/2000/svg", "image");
                computerImg.setAttributeNS(null, "href", "/aa.gif"); 
                computerImg.setAttributeNS(null, "width", "15");
                computerImg.setAttributeNS(null, "height", "15");
                computerImg.setAttributeNS(null, "x", "640"); 
                computerImg.setAttributeNS(null, "y", "470");

                const computerBg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                computerBg.setAttributeNS(null, "x", "615");
                computerBg.setAttributeNS(null, "y", "490");
                computerBg.setAttributeNS(null, "width", "70");
                computerBg.setAttributeNS(null, "height", "20");
                computerBg.setAttributeNS(null, "rx", "5");
                computerBg.setAttributeNS(null, "fill", "white");

                const computerText = document.createElementNS("http://www.w3.org/2000/svg", "text");
                computerText.setAttributeNS(null, "x", "650");
                computerText.setAttributeNS(null, "y", "500");
                computerText.setAttributeNS(null, "fill", "black");
                computerText.setAttributeNS(null, "font-size", "12px");
                computerText.setAttributeNS(null, "text-anchor", "middle");
                computerText.setAttributeNS(null, "dominant-baseline", "middle");
                computerText.textContent = "Store";

                const svg = document.querySelector("svg"); 
                if (svg) {
                    svg.appendChild(computerImg); 
                    svg.appendChild(computerBg);
                    svg.appendChild(computerText);
                } else {
                    console.error("SVG element not found.");
                }
                computer.addEventListener("mouseenter", () => {
                    console.log('Mouse entered computer');
                    computerBg.style.visibility = "visible";
                    computerText.style.visibility = "visible";
                });
        
                computer.addEventListener("mouseleave", () => {
                    console.log('Mouse left computer');
                    computerBg.style.visibility = "hidden";
                    computerText.style.visibility = "hidden";
                });
            }

            if (cd) {
                cd.addEventListener("click", () => handleClick('Axo_Extrusion_00000145019790728532539220000007906557968264228762_'));
                console.log('Event listener added to cd');

                console.log('Event listener added to computer');

                const cdImg = document.createElementNS("http://www.w3.org/2000/svg", "image");
                cdImg.setAttributeNS(null, "href", "/aa.gif"); 
                cdImg.setAttributeNS(null, "width", "15");
                cdImg.setAttributeNS(null, "height", "15");
                cdImg.setAttributeNS(null, "x", "650"); 
                cdImg.setAttributeNS(null, "y", "310");

                const cdBg = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                cdBg.setAttributeNS(null, "x", "625");
                cdBg.setAttributeNS(null, "y", "330");
                cdBg.setAttributeNS(null, "width", "70");
                cdBg.setAttributeNS(null, "height", "20");
                cdBg.setAttributeNS(null, "rx", "5");
                cdBg.setAttributeNS(null, "fill", "white");

                const cdText = document.createElementNS("http://www.w3.org/2000/svg", "text");
                cdText.setAttributeNS(null, "x", "660");
                cdText.setAttributeNS(null, "y", "340");
                cdText.setAttributeNS(null, "fill", "black");
                cdText.setAttributeNS(null, "font-size", "12px");
                cdText.setAttributeNS(null, "text-anchor", "middle");
                cdText.setAttributeNS(null, "dominant-baseline", "middle");
                cdText.textContent = "Album";

                const svg = document.querySelector("svg"); 
                if (svg) {
                    svg.appendChild(cdImg); 
                    svg.appendChild(cdBg);
                    svg.appendChild(cdText);
                } else {
                    console.error("SVG element not found.");
                }
                cd.addEventListener("mouseenter", () => {
                    console.log('Mouse entered computer');
                    cdBg.style.visibility = "visible";
                    cdText.style.visibility = "visible";
                });
        
                cd.addEventListener("mouseleave", () => {
                    console.log('Mouse left computer');
                    cdBg.style.visibility = "hidden";
                    cdText.style.visibility = "hidden";
                });
            }
            return () => {
                console.log('Removing event listeners');
                if (computer) {
                    computer.removeEventListener("click", () => handleClick('computer'));
                    const computerImg = computer.querySelector("image[href='/aa.gif']");
                    const computerText = computer.querySelector("text");
                    const computerBg = computer.querySelector("rect");
                    if (computerImg) {
                        computer.removeChild(computerImg);
                    }
                    if (computerBg) {
                        computer.removeChild(computerBg);
                    }
                    if (computerText) {
                        computer.removeChild(computerText);
                    }
                }

                if (cd) {
                    cd.removeEventListener("click", () => handleClick('Axo_Extrusion_00000145019790728532539220000007906557968264228762_'));
                    const cdImg = cd.querySelector("image[href='/aa.gif']");
                    const cdText = cd.querySelector("text");
                    const cdBg = cd.querySelector("rect");
                    if (cdImg) {
                        cd.removeChild(cdImg);
                    }
                    if (cdBg) {
                        cd.removeChild(cdBg);
                    }
                    if (cdText) {
                        cd.removeChild(cdText);
                    }
                }
            };
        };

        if (svgContent) {
            setTimeout(handleSvgLoad, 0);
        }
    }, [svgContent, router]);

    return (
        <div className="img-bg flex items-center justify-center">
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