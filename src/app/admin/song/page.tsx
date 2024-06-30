"use client";

import React from "react";
import Header from "@/components/Layout/header";
import TableLayout from "@/components/Layout/TableLayout";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SongPage: React.FC = () => {
    const [tableData, updateTableData] = useState([]);
    const router = useRouter();

    return (
        <Header>
            <TableLayout
                data={tableData}
                title="Songs"
                topRightButtonText="New"
                headings={{ Title: "" }}
                actionsText={["Edit", "Delete"]}
                onClickAction1={() => {}}
                onClickAction2={() => {}}
                onClickAction3={() => {}}
                onTopRightButtonAction={() => router.push("/admin/song/add-song")}
            />
        </Header>
    );
};

export default SongPage;
