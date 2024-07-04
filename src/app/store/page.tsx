"use client"
import React from "react";
import Store from "@/components/store";
import MasterLayout from "@/components/MasterLayout/Masterlayout";
import { Elements } from "@stripe/react-stripe-js";

import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_API_KEY as string);
const StorePage : React.FC = () => {

    return (
        <MasterLayout>
            <Store/>
        </MasterLayout>
    );
};

export default StorePage;