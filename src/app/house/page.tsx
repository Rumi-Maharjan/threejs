import React from "react";
import dynamic from "next/dynamic";

const House: React.FC = () => {
  return (
    <>
      <DynamicScene1 />
    </>
  );
};

const DynamicScene1 = dynamic(() => import("@/components/house"), {
  ssr: false,
});

export default House;