"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
    name: string;
    art: string;
    album: string;
    length: string;
    song_preview: string;
    ratings: number;
}

const AddSong: React.FC = () => {
    const [isEditMode, setEditMode] = useState(false);
    const router = useRouter();

    const { register, handleSubmit } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data);
    };

    const title = isEditMode ? "Edit Song" : "Add Song";

    const albumData = [
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

    const validateTime = (value: string) => {
        const regex = /^([0-5]?[0-9]):([0-5][0-9])$/;
        return regex.test(value) || "Invalid time format. Please use mm:ss.";
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
                        <label htmlFor="album">Album</label>
                        <select {...register("album")} className="" required defaultValue="">
                            <option value="" disabled hidden>Select Album</option>
                            {albumData.map((album) => (
                                <option key={album.id} value={album.id}>
                                    {album.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex gap-7">
                    <div className="field">
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
                            <label htmlFor="length">Length</label>
                            <input
                                type="text"
                                {...register("length", { validate: validateTime })}
                                placeholder="mm:ss"
                                className=""
                                required
                            />
                        </div>
                        <div className="field">
                            <label htmlFor="song_preview">Song Preview</label>
                            <input
                                type="file"
                                {...register("song_preview")}
                                // accept="audio/*"
                                placeholder=""
                                className=""
                                required
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
                <div className="flex gap-7 mt-5">
                    <button type="submit" className="bg-black rounded-md text-white px-14 py-3 w-fit text-lg">Submit</button>
                    <button className="border border-black rounded-md px-14 py-3 w-fit text-lg">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddSong;
