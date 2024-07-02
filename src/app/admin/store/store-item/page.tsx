"use client";

import React from "react";
import Header from "@/components/Layout/header";
import TableLayout from "@/components/Layout/TableLayout";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const StoreItemPage: React.FC = () => {
    const [tableData, setTableData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const res = await fetch('/api/item/');
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
                title="Store Items"
                topRightButtonText="New"
                headings={{ 
                    Title: "name",
                    Price: "price",
                    Category: "",
                    Quantity: "quantity",
                }}
                actionsText={["Edit", "Delete"]}
                onClickAction1={() => {}}
                onClickAction2={() => {}}
                onClickAction3={() => {}}
                onTopRightButtonAction={() => router.push("/admin/store/store-item/add-store-item")}
            />
        </Header>
    );
};

export default StoreItemPage;
