"use client";

import React, { useState } from "react";
import TableLayout from "@/components/Layout/TableLayout";
import { useRouter } from "next/navigation";
import { Dialog } from "primereact/dialog";

const AddGenre: React.FC = () => {
    const [tableData, updateTableData] = useState([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [genreName, setGenreName] = useState("");
    const router = useRouter();
    const [isEditMode, setEditMode] = useState(false);

    const handleTopRightButtonClick = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Genre Name:", genreName);
        setModalOpen(false);
    };

    const title = isEditMode ? "Edit Genre" : "Add Genre";

    return (
        <div>
            <TableLayout
                data={tableData}
                title="Genres"
                topRightButtonText="New"
                headings={{ Title: "" }}
                actionsText={["Edit", "Delete"]}
                onClickAction1={() => {}}
                onClickAction2={() => {}}
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
                        <button onClick={handleCloseModal} className="border border-black rounded-md px-14 py-3 w-fit text-lg">Cancel</button>
                    </div>
                }
            >
                <form id="genreForm" onSubmit={handleFormSubmit} className="input-form">
                    <div className="field">
                        <label htmlFor="genreName">Genre Name</label>
                        <input
                            type="text"
                            id="genreName"
                            value={genreName}
                            onChange={(e) => setGenreName(e.target.value)}
                            required
                        />
                    </div>
                </form>
            </Dialog>
        </div>
    );
};

export default AddGenre;
