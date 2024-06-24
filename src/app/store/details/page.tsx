import React from "react";
import Details from "@/components/details";
import MasterLayout from "@/components/MasterLayout/Masterlayout";
import { Suspense } from 'react'

const DetailsPage: React.FC = () => {
    return (
        <MasterLayout>
            <Suspense>
                <Details/>
            </Suspense>
        </MasterLayout>
    );
};

export default DetailsPage;