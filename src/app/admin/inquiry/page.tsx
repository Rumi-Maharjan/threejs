"use client";

import React from "react";
import Header from "@/components/Layout/header";
import TableLayout2 from "@/components/Layout/TableLayout2";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ImBin } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { ProgressSpinner } from "primereact/progressspinner";

interface Inquiry  {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    title: string;
    updatedAt: string;
};


const InquiryPage: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [tableData, setTableData] = useState<Inquiry[]>([]);
    const router = useRouter();

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/inquiry/');
            const json = await res.json();
            console.log("data:", json);
            const sortedData = json.data.sort((a: Inquiry, b: Inquiry) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
            setTableData(sortedData);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    setLoading(true);
                    const index = tableData[id].id;
                    const response = await fetch('/api/inquiry?id=' + index, {
                        method: 'DELETE'
                    });
                    if (response.ok) {
                        await getData();
                        Swal.fire(
                            'Deleted!',
                            'Inquiry has been deleted.',
                            'success'
                        );
                        setLoading(false);
                    } else {
                        Swal.fire(
                            'Error!',
                            'There was an error deleting the inquiry. Please try again later.',
                            'error'
                        );
                        setLoading(false);
                        throw new Error('Failed to delete inquiry');
                    }
                } catch (error) {
                    console.error("Error deleting data:", error);
                    Swal.fire(
                        'Error!',
                        'There was an error deleting the inquiry. Please try again later.',
                        'error'
                    );
                    setLoading(false);
                }
            }
        });
    };

    return (
        <Header>
            {loading && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white opacity-75 z-50">
                    <ProgressSpinner />
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                </div>
            )}
            <TableLayout2
                data={tableData}
                title="Inquiry"
                topRightButtonText="New"
                headings={{ 
                    Name: "name",
                    Email: "email",
                    Title: "title",
                    Subject: "subject", 
                    Message: "message",
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
