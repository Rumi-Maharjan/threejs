"use client";

import React from "react";
import Header from "@/components/Layout/header";
import TableLayout from "@/components/Layout/TableLayout";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ImBin } from "react-icons/im";
import { FaEdit } from "react-icons/fa";

interface Album  {
    id: number;
    name: string;
    track_no: string;
    price: string;
};


const AlbumPage: React.FC = () => {
    const [tableData, setTableData] = useState<Album[]>([]);
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

    const handleDelete = async (id: number) => {
        try {
            const index = tableData[id].id;
            await fetch('/api/album?id=' + index, {
                method: 'DELETE'
            });
            await getData();
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    const handleEdit = (id: number) => {
        const index = tableData[id].id;
        console.log(index, "clicked id is");
        router.push(`/admin/album/add-album?id=${index}`);
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
                actionsText={[<FaEdit key="edit" />, <ImBin key="delete" />]}
                onClickAction1={(id) => handleEdit(id)}
                onClickAction2={(id) => handleDelete(id)}
                onClickAction3={() => {}}
                onTopRightButtonAction={() => router.push("/admin/album/add-album")}
            />
        </Header>
    );
};

export default AlbumPage;
