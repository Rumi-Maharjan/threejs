import React from "react";
import dynamic from "next/dynamic";

const Scene: React.FC = () => {
    return (
        <>
        <DynamicScene1 />
        </>
    );
};

const DynamicScene1 = dynamic(() => import("@/components/scene"), {
    ssr: false,
});

export default Scene;
