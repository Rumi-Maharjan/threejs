"use client";

import React from "react";
import Header from "@/components/Layout/header";
import TableLayout from "@/components/Layout/TableLayout";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ImBin } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { ProgressSpinner } from "primereact/progressspinner";

interface Category  {
    id: number;
    name: string;
    updatedAt: string;
};

const StoreCategoryPage: React.FC = () => {
    const [tableData, setTableData] = useState<Category[]>([]);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/category/');
            const json = await res.json();
            console.log("data:", json);
            const sortedData = json.data.sort((a: Category, b: Category) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
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
                    const response = await fetch('/api/category?id=' + index, {
                        method: 'DELETE'
                    });
                    if (response.ok) {
                        await getData();
                        Swal.fire(
                            'Deleted!',
                            'Store Category has been deleted.',
                            'success'
                        );
                        setLoading(false);
                    } else {
                        Swal.fire(
                            'Error!',
                            'There was an error deleting the store category. Please try again later.',
                            'error'
                        );
                        setLoading(false);
                        throw new Error('Failed to delete store category');
                    }
                } catch (error) {
                    console.error("Error deleting data:", error);
                    Swal.fire(
                        'Error!',
                        'There was an error deleting the store category. Please try again later.',
                        'error'
                    );
                    setLoading(false);
                }
            }
        });
    };

    const handleEdit = (id: number) => {
        const index = tableData[id].id;
        console.log(index, "clicked id is");
        router.push(`/admin/store/store-category/add-store-category?id=${index}`);
    };

    return (
        <Header>
            {loading && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white opacity-75 z-50">
                    <ProgressSpinner />
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                </div>
            )}
            <TableLayout
                data={tableData}
                title="Store Categories"
                topRightButtonText="New"
                headings={{ Title: "name" }}
                actionsText={[<FaEdit key="edit" />, <ImBin key="delete" />]}
                onClickAction1={(id) => handleEdit(id)}
                onClickAction2={(id) => handleDelete(id)}
                onClickAction3={() => {}}
                onTopRightButtonAction={() => router.push("/admin/store/store-category/add-store-category")}
            />
        </Header>
    );
};

export default StoreCategoryPage;
