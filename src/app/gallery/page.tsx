import React from "react";
import Gallery from "@/components/gallery";
import MasterLayout from "@/components/MasterLayout/Masterlayout";

const GalleryPage: React.FC = () => {
    return (
        <MasterLayout>
            <Gallery/>
        </MasterLayout>
    );
};


export default GalleryPage;