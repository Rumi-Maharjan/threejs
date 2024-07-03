"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoCloseCircle } from "react-icons/io5";

interface IFormInput {
    name: string;
    images: string;
    price: number;
    genreId: number;
    track_no: number;
    ratings: number;
}

interface Genre {
    id: number;
    name: string;
}

const AddAlbum: React.FC = () => {
    const [isEditMode, setEditMode] = useState<boolean>(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [genreData, setGenreData] = useState<Genre[]>([]);
    const [albumData, setAlbumData] = useState<IFormInput>({
        name: "",
        images: "",
        price: 0,
        genreId: 0,
        track_no: 0,
        ratings: 0,
    })

    const index = searchParams.get('id');
    console.log("id:",index);

    const { register, handleSubmit, setValue, reset } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        

        const formData = new FormData();
    
        formData.append('name', data.name);
        formData.append('price', String(data.price));
        formData.append('genreId', String(data.genreId));
        formData.append('track_no', String(data.track_no));
        formData.append('ratings', String(data.ratings));
    
        if (data.images && data.images[0]) {
            formData.append('images', data.images[0]);
        }
    
        try {
            const response = await fetch(index ? `/api/album?id=${index}` : '/api/album', {
                method: index ? 'PATCH' : 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const responseData = await response.json();
            console.log(responseData);
            reset();
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
        getData();
        if (index) {
            setEditMode(true);
            getAlbumData(index);
        }
    }, [index]);

    const getData = async () => {
        try {
            const res = await fetch('/api/genre/');
            const json = await res.json();
            console.log("data:", json);
            setGenreData(json.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const getAlbumData = async (id: string) => {
        try {
            const res = await fetch(`/api/item/${id}`);
            const json = await res.json();
            console.log("Fetched Data:", json);
            setAlbumData(json.data);
            setValue("name", json.data.name);
            setValue("images", json.data.images);
            setValue("price", json.data.price);
            setValue("genreId", json.data.genreId);
            setValue("track_no", json.data.track_no);
            setValue("ratings", json.data.ratings);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const title = isEditMode ? "Edit Album" : "Add Album";

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
                        <label htmlFor="genreId">Genre</label>
                        <select {...register("genreId")} className="" required defaultValue="">
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
                <div className="flex gap-7 mt-5">
                    <button type="submit" className="bg-black rounded-md text-white px-14 py-3 w-fit text-lg">Submit</button>
                    <button className="border border-black rounded-md px-14 py-3 w-fit text-lg" onClick={() => router.back()}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddAlbum;
