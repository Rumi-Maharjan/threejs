"use client";

import React, { useState, useEffect } from "react";
import TableLayout from "@/components/Layout/TableLayout";
import { useRouter } from "next/navigation";
import { Dialog } from "primereact/dialog";

interface Genre  {
    id: number;
    name: string;
};

const AddGenre: React.FC = () => {
    const [tableData, setTableData] = useState<Genre[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [name, setName] = useState("");
    const router = useRouter();
    const [isEditMode, setEditMode] = useState(false);

    const handleTopRightButtonClick = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleFormSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        console.log("Genre Name:", name);
        await fetch('/api/genre', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name
            })
        }).then((res) => {
            console.log(res)
        }).catch((e) => {
            console.log(e)
        })
        setModalOpen(false);
    };

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const res = await fetch('/api/genre/');
            const json = await res.json();
            console.log("data:", json);
            setTableData(json.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const title = isEditMode ? "Edit Genre" : "Add Genre";

    const handleDelete = async (id: number) => {
        const index = tableData[id].id;
        await fetch(`/api/genre/${index}`, {
            method: 'DELETE'
        }).then((res) => {
            console.log(res)
            setTableData((prevData) => prevData.filter(item => item.id !== id));
        }).catch((e) => {
            console.log(e)
        });
    };

    return (
        <div>
            <TableLayout
                data={tableData}
                title="Genres"
                topRightButtonText="New"
                headings={{ Title: "name" }}
                actionsText={["Edit", "Delete"]}
                onClickAction1={() => {}}
                onClickAction2={(id) => handleDelete(id)}
                onClickAction3={() => {}}
                onTopRightButtonAction={handleTopRightButtonClick}
            />

            <Dialog
                header={title}
                visible={isModalOpen}
                style={{ width: '500px' }}
                onHide={handleCloseModal}
                footer={
                    <div className="flex gap-7 mt-5">
                        <button form="genreForm" type="submit" className="bg-black rounded-md text-white px-14 py-3 w-fit text-lg">Add Genre</button>
                        <button onClick={handleCloseModal} className="border border-black rounded-md px-14 py-3 w-fit text-lg text-black">Cancel</button>
                    </div>
                }
            >
                <form id="genreForm" onSubmit={handleFormSubmit} className="input-form">
                    <div className="field">
                        <label htmlFor="name">Genre Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                </form>
            </Dialog>
        </div>
    );
};

export default AddGenre;
