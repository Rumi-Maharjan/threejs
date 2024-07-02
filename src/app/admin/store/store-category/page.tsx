"use client";

import React from "react";
import Header from "@/components/Layout/header";
import TableLayout from "@/components/Layout/TableLayout";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const StoreCategoryPage: React.FC = () => {
    const [tableData, setTableData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const res = await fetch('/api/category/');
            const json = await res.json();
            console.log("data:", json);
            setTableData(json.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <Header>
            <TableLayout
                data={tableData}
                title="Store Categories"
                topRightButtonText="New"
                headings={{ Title: "name" }}
                actionsText={["Edit", "Delete"]}
                onClickAction1={() => {}}
                onClickAction2={() => {}}
                onClickAction3={() => {}}
                onTopRightButtonAction={() => router.push("/admin/store/store-category/add-store-category")}
            />
        </Header>
    );
};

export default StoreCategoryPage;
