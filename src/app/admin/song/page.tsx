"use client";

import React from "react";
import Header from "@/components/Layout/header";
import TableLayout from "@/components/Layout/TableLayout";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const SongPage: React.FC = () => {
    const [tableData, setTableData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const res = await fetch('/api/song/')
        const json = await res.json()
        console.log("data:",json)
        setTableData(json.data);

        if (!json) {
            // router.push('/404')
            console.log("Error fetching data.")
            return
        }
    }

    const handleDelete = async (id: number) => {
        await fetch('/api/song?id=' + id, {
            method: 'DELETE'
        })

        router.refresh()
    }

    return (
        <Header>
            <TableLayout
                data={tableData}
                title="Songs"
                topRightButtonText="New"
                headings={{ 
                    Title: "title",
                    // Album: "",
                    Length: "length",
                    Ratings: "ratings",
                }}
                actionsText={["Edit", "Delete"]}
                onClickAction1={() => {}}
                onClickAction2={(id) => handleDelete(id)}
                onClickAction3={() => {}}
                onTopRightButtonAction={() => router.push("/admin/song/add-song")}
            />
        </Header>
    );
};

export default SongPage;
