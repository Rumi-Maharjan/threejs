"use client";

import React from "react";
import Header from "@/components/Layout/header";
import TableLayout from "@/components/Layout/TableLayout";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AlbumPage: React.FC = () => {
    const [tableData, setTableData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const res = await fetch('/api/album/');
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
                title="Albums"
                topRightButtonText="New"
                headings={{ 
                    Title: "name",
                    Track_No: "track_no",
                    Price: "price", 
                    // Genre: "genreId"
                }}
                actionsText={["Edit", "Delete"]}
                onClickAction1={() => {}}
                onClickAction2={() => {}}
                onClickAction3={() => {}}
                onTopRightButtonAction={() => router.push("/admin/album/add-album")}
            />
        </Header>
    );
};

export default AlbumPage;
