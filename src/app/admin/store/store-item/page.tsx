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

interface Item  {
    id: number;
    name: string;
    price: string;
    qunatity: string;
    updatedAt: string;
    category_id: number;
    categoryName?: string;
};

interface Category {
    id: number;
    name: string;
}

const StoreItemPage: React.FC = () => {
    const [tableData, setTableData] = useState<Item[]>([]);
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            setLoading(true);
            const [itemRes, categoryRes] = await Promise.all([
                fetch('/api/item/'),
                fetch('/api/category/')
            ]);
            const itemJson = await itemRes.json();
            const categoryJson = await categoryRes.json();

            console.log("items data:", itemJson);
            console.log("categorys data:", categoryJson);

            const categoryMap = new Map<number, string>();
            categoryJson.data.forEach((category: Category) => {
                categoryMap.set(category.id, category.name);
            });

            const sortedData = itemJson.data
                .map((item: Item) => ({
                    ...item,
                    categoryName: categoryMap.get(item.category_id)
                }))
                .sort((a: Item, b: Item) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());

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
                    const response = await fetch('/api/item?id=' + index, {
                        method: 'DELETE'
                    });
                    if (response.ok) {
                        await getData();
                        Swal.fire(
                            'Deleted!',
                            'Store Item has been deleted.',
                            'success'
                        );
                        setLoading(false);
                    } else {
                        Swal.fire(
                            'Error!',
                            'There was an error deleting the store item. Please try again later.',
                            'error'
                        );
                        setLoading(false);
                        throw new Error('Failed to delete store item');
                    }
                } catch (error) {
                    console.error("Error deleting data:", error);
                    Swal.fire(
                        'Error!',
                        'There was an error deleting the store item. Please try again later.',
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
        router.push(`/admin/store/store-item/add-store-item?id=${index}`);
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
                title="Store Items"
                topRightButtonText="New"
                headings={{ 
                    Title: "name",
                    Price: "price",
                    Category: "categoryName",
                    Quantity: "quantity",
                }}
                actionsText={[<FaEdit key="edit" />, <ImBin key="delete" />]}
                onClickAction1={(id) => handleEdit(id)}
                onClickAction2={(id) => handleDelete(id)}
                onClickAction3={() => {}}
                onTopRightButtonAction={() => router.push("/admin/store/store-item/add-store-item")}
            />
        </Header>
    );
};

export default StoreItemPage;
