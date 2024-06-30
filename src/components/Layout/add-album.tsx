"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
    name: string;
    art: string;
    price: number;
    genre: string;
    collaborators: string[];
    track_no: number;
    ratings: number;
}

const AddAlbum: React.FC = () => {
    const [isEditMode, setEditMode] = useState(false);
    const [collaborators, setCollaborators] = useState<string[]>([""]);
    const router = useRouter();

    const { register, handleSubmit } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        data.collaborators = collaborators;
        console.log(data);
    };

    const title = isEditMode ? "Edit Album" : "Add Album";

    const genreData = [
        { id: 1, name: "Genre1" },
        { id: 2, name: "Genre2" },
        { id: 3, name: "Genre3" },
        { id: 4, name: "Genre4" },
        { id: 5, name: "Genre5" },
        { id: 6, name: "Genre6" },
        { id: 7, name: "Genre7" },
        { id: 8, name: "Genre8" },
        { id: 9, name: "Genre9" },
        { id: 10, name: "Genre10" },
        { id: 11, name: "Genre11" },
    ];

    const addCollaborator = () => {
        setCollaborators([...collaborators, ""]);
    };

    const handleCollaboratorChange = (index: number, value: string) => {
        const newCollaborators = collaborators.slice();
        newCollaborators[index] = value;
        setCollaborators(newCollaborators);
    };

    return (
        <div className="pl-8">
            <div className="text-2xl font-medium mb-3">{title}</div>
            <form onSubmit={handleSubmit(onSubmit)} className="input-form">
                <div className="flex gap-7">
                    <div className="field">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            {...register("name")}
                            placeholder=""
                            className=""
                            required
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="genre">Genre</label>
                        <select {...register("genre")} className="" required defaultValue="">
                            <option value="" disabled hidden>Select Genre</option>
                            {genreData.map((genre) => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex gap-7">
                    <div className="field ">
                        <label htmlFor="art">Image</label>
                        <input
                            type="file"
                            {...register("art")}
                            accept="image/*"
                            placeholder=""
                            className="h-full"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="field">
                            <label htmlFor="price">Price</label>
                            <input
                                type="number"
                                {...register("price")}
                                placeholder=""
                                className=""
                                required
                                min={0}
                                step="0.01"
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="track_no">Track no.</label>
                            <input
                                type="number"
                                {...register("track_no")}
                                placeholder=""
                                className=""
                                required
                                min={0}
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="ratings">Ratings</label>
                            <input
                                type="number"
                                {...register("ratings")}
                                placeholder=""
                                className=""
                                required
                                min={0}
                                step="0.01"
                            />
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label htmlFor="collaborators">Collaborators</label>
                    <div className="flex gap-3 flex-wrap w-[900px]">
                        {collaborators.map((collaborator, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    value={collaborator}
                                    onChange={(e) => handleCollaboratorChange(index, e.target.value)}
                                    className=""
                                    required
                                />
                            </div>
                        ))}
                        <button type="button" onClick={addCollaborator} className="border border-gray-300 rounded-md shadow-xl px-3 py-2 w-fit">
                            Add Collaborator
                        </button>
                    </div>
                </div>
                <div className="flex gap-7 mt-5">
                    <button type="submit" className="bg-black rounded-md text-white px-14 py-3 w-fit text-lg">Submit</button>
                    <button className="border border-black rounded-md px-14 py-3 w-fit text-lg">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddAlbum;
