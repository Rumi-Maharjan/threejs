"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoCloseCircle } from "react-icons/io5";

interface IFormInput {
    title: string;
    images: string;
    albumId: number;
    length: string;
    song_preview: string;
    ratings: number;
    collaborators: string[];
}

interface Album {
    id: number;
    name: string;
}

const AddSong: React.FC = () => {
    const [isEditMode, setEditMode] = useState(false);
    const [collaborators, setCollaborators] = useState<string[]>([""]);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const router = useRouter();
    const [albumData, setAlbumData] = useState<Album[]>([]);

    const { register, handleSubmit } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = async(data) => {
        // if (data.images && data.images[0]) {
        //     const file = data.images[0];
        //     data.images = file;
        // }
        data.collaborators = collaborators;
        console.log(data);

        const formData = new FormData();
    
        formData.append('title', data.title);
        formData.append('albumId', String(data.albumId));
        formData.append('ratings', String(data.ratings));
        formData.append('length', data.length);
        formData.append('collaborators', JSON.stringify(data.collaborators));
    
        if (data.images && data.images[0]) {
            formData.append('images', data.images[0]);
        }
    
        try {
            const response = await fetch('/api/song', {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        try {
            const res = await fetch('/api/album/');
            const json = await res.json();
            console.log("data:", json);
            setAlbumData(json.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    console.log("Album data:",albumData);

    const title = isEditMode ? "Edit Song" : "Add Song";

    const validateTime = (value: string) => {
        const regex = /^([0-5]?[0-9]):([0-5][0-9])$/;
        return regex.test(value) || "Invalid time format. Please use mm:ss.";
    };

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
                        <label htmlFor="title">Name</label>
                        <input
                            type="text"
                            {...register("title")}
                            placeholder=""
                            className=""
                            required
                        />
                    </div>
                    <div className="field">
                        <label htmlFor="albumId">Album</label>
                        <select {...register("albumId")} className="" required defaultValue="">
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
                        <label htmlFor="images">Image</label>
                        {/* {imagePreview ? (
                            <div className="image h-48 relative">
                                <img src={imagePreview} alt="Image Preview" className="w-full object-cover h-48 rounded-md" />
                                <button
                                    type="button"
                                    onClick={() => setImagePreview(null)}
                                    className="text-3xl text-red-500 absolute -top-3 -right-4"
                                >
                                    <IoCloseCircle />
                                </button>
                            </div>
                        ) : ( */}
                            <input
                                type="file"
                                {...register("images")}
                                accept="image/*"
                                onChange={handleImageChange}
                                className="h-full"
                                required
                            />
                        {/* )} */}
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
                    <div className="flex gap-3 flex-wrap w-[830px]">
                        {collaborators.map((collaborator, index) => (
                            <div key={index}>
                                <input
                                    type="text"
                                    value={collaborator}
                                    onChange={(e) => handleCollaboratorChange(index, e.target.value)}
                                    className="w-[268px]"
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

export default AddSong;
