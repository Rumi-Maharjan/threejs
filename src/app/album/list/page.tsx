import React from "react";
import List from "@/components/list";
import { Suspense } from 'react'

const ListPage: React.FC = () => {
    return (
        <>
            <Suspense>
                <List/>
            </Suspense>
        </>
    );
};

export default ListPage;