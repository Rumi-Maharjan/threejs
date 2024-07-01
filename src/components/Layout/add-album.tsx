"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoCloseCircle } from "react-icons/io5";

interface IFormInput {
    name: string;
    art: string;
    price: number;
    genre: string;
    track_no: number;
    ratings: number;
}

const AddAlbum: React.FC = () => {
    const [isEditMode, setEditMode] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const router = useRouter();

    const { register, handleSubmit } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        if (data.art && data.art[0]) {
            const file = data.art[0];
            data.art = file;
        }
        console.log(data);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagePreview(URL.createObjectURL(file));
        }
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
                        {imagePreview ? (
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
                        ) : (
                            <input
                                type="file"
                                {...register("art")}
                                accept="image/*"
                                onChange={handleImageChange}
                                className="h-full"
                                required
                            />
                        )}
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
                    <button className="border border-black rounded-md px-14 py-3 w-fit text-lg">Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AddAlbum;
