"use client";

import React from "react";
import Header from "@/components/Layout/header";
import TableLayout from "@/components/Layout/TableLayout";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ImBin } from "react-icons/im";
import { FaEdit } from "react-icons/fa";

interface Inquiry  {
    id: number
    name: string
    email: string
    subject: string
    message: string
    title: string
};


const InquiryPage: React.FC = () => {
    const [tableData, setTableData] = useState<Inquiry[]>([]);
    const router = useRouter();

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const res = await fetch('/api/inquiry/');
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

    // const handleEdit = (id: number) => {
    //     const index = tableData[id].id;
    //     console.log(index, "clicked id is");
    //     router.push(`/admin/album/add-album?id=${index}`);
    // };

    return (
        <Header>
            <TableLayout
                data={tableData}
                title="Inquiry"
                topRightButtonText="New"
                headings={{ 
                    Title: "name",
                    Email: "email",
                    Subject: "subject", 
                    // Genre: "genreId"
                }}
                actionsText={[<ImBin key="delete" />]}
                onClickAction2={() => {}}
                onClickAction1={(id) => handleDelete(id)}
                onClickAction3={() => {}}
                onTopRightButtonAction={() => {}}
            />
        </Header>
    );
};

export default InquiryPage;
