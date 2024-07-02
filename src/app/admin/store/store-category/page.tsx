"use client";

import React from "react";
import Header from "@/components/Layout/header";
import TableLayout from "@/components/Layout/TableLayout";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ImBin } from "react-icons/im";
import { FaEdit } from "react-icons/fa";

interface Category  {
    id: number;
    name: string;
};

const StoreCategoryPage: React.FC = () => {
    const [tableData, setTableData] = useState<Category[]>([]);
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

    const handleDelete = async (id: number) => {
        try {
            const index = tableData[id].id;
            await fetch('/api/category?id=' + index, {
                method: 'DELETE'
            });
            await getData();
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    return (
        <Header>
            <TableLayout
                data={tableData}
                title="Store Categories"
                topRightButtonText="New"
                headings={{ Title: "name" }}
                actionsText={[<FaEdit key="edit" />, <ImBin key="delete" />]}
                onClickAction1={() => {}}
                onClickAction2={(id) => handleDelete(id)}
                onClickAction3={() => {}}
                onTopRightButtonAction={() => router.push("/admin/store/store-category/add-store-category")}
            />
        </Header>
    );
};

export default StoreCategoryPage;
