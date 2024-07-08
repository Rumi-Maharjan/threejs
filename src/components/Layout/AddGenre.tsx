"use client";

import React, { useState, useEffect } from "react";
import TableLayout from "@/components/Layout/TableLayout";
import { useRouter } from "next/navigation";
import { Dialog } from "primereact/dialog";
import { ImBin } from "react-icons/im";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { ProgressSpinner } from "primereact/progressspinner";

interface IFormInput {
    name: string;
}

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
    const [index, setIndex] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    const handleTopRightButtonClick = () => {
        setEditMode(false);
        setModalOpen(true);
        setName("");
    };

    const handleCloseModal = () => {
        setModalOpen(false);
        setEditMode(false);
    };

    const handleFormSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        console.log("Genre Name:", name);
        await fetch(isEditMode? `/api/genre?id=${index}` : '/api/genre', {
            method: isEditMode ? 'PATCH' : 'POST',
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
        getData();
    };

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/genre/');
            const json = await res.json();
            console.log("data:", json);
            setTableData(json.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    }

    const getGenreData = async (id: number) => {
        try {
            const res = await fetch(`/api/genre/${id}`);
            const json = await res.json();
            console.log("Fetched Data:", json);
            setName(json.data.name);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const title = isEditMode ? "Edit Genre" : "Add Genre";

    const handleDelete = async (id: number) => {
        try {
            const index = tableData[id].id;
            await fetch('/api/genre?id=' + index, {
                method: 'DELETE'
            });
            await getData();
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    const handleEdit = (id: number) => {
        const dataId = tableData[id].id;
        setIndex(dataId);
        setModalOpen(true);
        console.log(index, "clicked id is");
        getGenreData(dataId);
        setEditMode(true);
    };

    return (
        <div>
            {loading && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white opacity-75 z-50">
                    <ProgressSpinner />
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                </div>
            )}
            <TableLayout
                data={tableData}
                title="Genres"
                topRightButtonText="New"
                headings={{ Title: "name" }}
                actionsText={[<FaEdit key="edit" />, <ImBin key="delete" />]}
                onClickAction1={(id) => handleEdit(id)}
                onClickAction2={(id) => handleDelete(id)}
                onClickAction3={() => {}}
                onTopRightButtonAction={handleTopRightButtonClick}
            />

            <Dialog
                header={title}
                visible={isModalOpen}
                style={{ width: '460px' }}
                onHide={handleCloseModal}
                footer={
                    <div className="flex gap-5 mt-5">
                        <button form="genreForm" type="submit" className="bg-black rounded-md text-white py-2 text-sm w-36">{title}</button>
                        <button onClick={handleCloseModal} className="border border-black rounded-md py-2 text-sm text-black w-36">Cancel</button>
                    </div>
                }
                className="bg-white p-7 rounded-md"
                headerClassName="font-medium text-2xl"
            >
                <form id="genreForm" onSubmit={handleFormSubmit} className="input-form mt-5 text-black">
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
