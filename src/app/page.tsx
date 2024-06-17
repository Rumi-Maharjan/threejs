"use client";

import React, { useState, useEffect } from "react";
import HomePage from "@/components/homepage";

const Home: React.FC = () => {
  const [contentLoaded, setContentLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setContentLoaded(true);
    }, 2000);
  }, []);


    return (
        <>
            {!contentLoaded ? (
              <div className="background-gradient flex items-center justify-center ">
                <img src="/prohdeen.jpg"/>
              </div>
            ) : (
              <HomePage />
            )}
        </>
    );
};


export default Home;