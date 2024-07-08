"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoCloseCircle } from "react-icons/io5";
import Swal from "sweetalert2";
import { ProgressSpinner } from "primereact/progressspinner";
import Link from "next/link";

interface IFormInput {
    title: string;
    images: FileList | null;
    albumId: number;
    length: string;
    song_preview: string;
    ratings: number;
    collaborators: string[];
    url: string;
}

interface Album {
    id: number;
    name: string;
}

const AddSong: React.FC = () => {
    const [isEditMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [collaborators, setCollaborators] = useState<string[]>([""]);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [albumData, setAlbumData] = useState<Album[]>([]);
    const [songData, setSongData] = useState<IFormInput>({
        title: "",
        images: null,
        albumId: 0,
        length: "",
        song_preview: "",
        ratings: 0,
        collaborators: [],
        url: "",
    });

    const index = searchParams.get('id');
    console.log("id:",index);

    const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = async(data) => {
        const validCollaborators = collaborators.filter(collab => collab.trim() !== "");
        data.collaborators = validCollaborators;
        console.log(data);

        const formData = new FormData();
    
        formData.append('title', data.title);
        formData.append('url', data.url);
        formData.append('albumId', String(data.albumId));
        formData.append('ratings', String(data.ratings));
        formData.append('length', data.length);
        for (let i = 0; i < data.collaborators.length; i++) {
            formData.append('collaborators', data.collaborators[i]);
        }
    
        if (data.images && data.images[0]) {
            formData.append('images', data.images[0]);
        }
    
        try {
            setLoading(true);
            const response = await fetch(index ? `/api/song?id=${index}` : '/api/song', {
                method: index ? 'PATCH' : 'POST',
                body: formData,
            });

            if (response.ok) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Song created sucessfully.',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
                // const responseData = await response.json();
                // console.log(responseData);
                reset();
                setLoading(false);
                router.back();
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Error in creating song. Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
                setLoading(false);
                throw new Error('Failed to send message');
            }
    
            // if (!response.ok) {
            //     throw new Error('Network response was not ok');
            // }
    
            // const responseData = await response.json();
            // console.log(responseData);
            reset();
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Error in creating song. Please try again later.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            setLoading(false);
        }
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleImageClear = () => {
        setImagePreview(null);
        setValue("images", null);
    }

    useEffect(() => {
        getData();
        if (index) {
            setEditMode(true);
            getSongData(index);
        }
    }, [index]);

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

    const getSongData = async (id: string) => {
        try {
            setLoading(true);
            const res = await fetch(`/api/song/${id}`);
            const json = await res.json();
            console.log("Fetched Data:", json);
            setSongData(json.data);
            setValue("title", json.data.title);
            setValue("length", json.data.length);
            setValue("albumId", json.data.albumId);
            setValue("ratings", json.data.ratings);
            setValue("song_preview", json.data.song_preview);
            setValue("ratings", json.data.ratings);
            setValue("url", json.data.url);
            const collaboratorsNames = json.data.collaborators.map((collab: { name: string }) => collab.name);
            setCollaborators(collaboratorsNames);
            setValue("collaborators", collaboratorsNames);
            if (json.data.images) {
                setImagePreview(json.data.images.url);
                const imageUrl = json.data.images.url;
                const blob = await fetch(imageUrl).then((r) => r.blob());
                const file = new File([blob], "album_image.png", { type: blob.type });
                const dataTransfer = new DataTransfer();
                dataTransfer.items.add(file);
                const fileList = dataTransfer.files;
                setValue("images", fileList);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

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
            {loading && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white opacity-75 z-50">
                    <ProgressSpinner />
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                </div>
            )}
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
                        <div className="relative h-full w-[400px]">
                            <input
                                type="file"
                                {...register("images")}
                                accept="image/*"
                                onChange={handleImageChange}
                                className="h-full w-full"
                                required={!isEditMode || (!imagePreview && isEditMode)}
                            />
                            {imagePreview && (
                                <div className="image absolute top-0">
                                    <img src={imagePreview} alt="Image Preview" className="object-cover rounded-md h-48 w-full" />
                                    <button
                                        type="button"
                                        onClick={handleImageClear}
                                        className="text-3xl text-red-500 absolute -top-3 -right-4"
                                    >
                                        <IoCloseCircle />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <div className="field">
                            <div className="flex gap-3">
                                <label htmlFor="length">Length</label>
                                {errors.length && (
                                    <span className="text-red-500 text-sm">Invalid time format. Please use mm:ss.</span>
                                )}
                            </div>
                            <input
                                type="text"
                                {...register("length", { validate: validateTime })}
                                placeholder="mm:ss"
                                className=""
                                required
                            />
                        </div>
                        {/* <div className="field">
                            <label htmlFor="song_preview">Song Preview</label>
                            <input
                                type="file"
                                {...register("song_preview")}
                                accept="audio/*"
                                placeholder=""
                                className=""
                            />
                        </div> */}
                        <div className="field">
                            <label htmlFor="url">Spotify URL</label>
                            <input
                                type="text"
                                {...register("url")}
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
                    <Link href="/admin/song"><button className="border border-black rounded-md px-14 py-3 w-fit text-lg">Cancel</button></Link>
                </div>
            </form>
        </div>
    );
};

export default AddSong;
