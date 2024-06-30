"use client";

import React from "react";
import Header from "@/components/Layout/header";
import TableLayout from "@/components/Layout/TableLayout";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const StoreItemPage: React.FC = () => {
    const [tableData, updateTableData] = useState([]);
    const router = useRouter();

    return (
        <Header>
            <TableLayout
                data={tableData}
                title="Store Items"
                topRightButtonText="New"
                headings={{ Title: "" }}
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
