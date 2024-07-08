"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { IoCloseCircle } from "react-icons/io5";
import Swal from "sweetalert2";
import { ProgressSpinner } from "primereact/progressspinner";
import Link from "next/link";

interface IFormInput {
    name: string;
    images: FileList | null;
    price: number;
    genreId: number;
    track_no: number;
    ratings: number;
    url: string;
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
    const [loading, setLoading] = useState(false);
    const [albumData, setAlbumData] = useState<IFormInput>({
        name: "",
        images: null,
        price: 0,
        genreId: 0,
        track_no: 0,
        ratings: 0,
        url: "",
    })

    const index = searchParams.get('id');
    console.log("id:",index);

    const { register, handleSubmit, setValue, reset } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        
    console.log("data:", data);

        const formData = new FormData();
    
        formData.append('name', data.name);
        formData.append('url', data.url);
        formData.append('price', String(data.price));
        formData.append('genreId', String(data.genreId));
        formData.append('track_no', String(data.track_no));
        formData.append('ratings', String(data.ratings));
    
        if (data.images && data.images[0]) {
            formData.append('images', data.images[0]);
        }
    
        try {
            setLoading(true);
            const response = await fetch(index ? `/api/album?id=${index}` : '/api/album', {
                method: index ? 'PATCH' : 'POST',
                body: formData,
            });

            console.log(response);
            if (response.ok) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Album created sucessfully.',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
                const responseData = await response.json();
                console.log(responseData);
                reset();
                setLoading(false);
                router.back();
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Error in creating album. Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
                setLoading(false);
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
            Swal.fire({
                title: 'Error!',
                text: 'Error in creating album. Please try again later.',
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
            setLoading(true);
            const res = await fetch(`/api/album/${id}`);
            const json = await res.json();
            console.log("Fetched Data:", json);
            setAlbumData(json.data);
            setValue("name", json.data.name);
            setValue("price", json.data.price);
            setValue("genreId", json.data.genreId);
            setValue("track_no", json.data.track_no);
            setValue("ratings", json.data.ratings);
            setValue("url", json.data.url);
            if (json.data.images && json.data.images.length > 0) {
                setImagePreview(json.data.images[0].url);
                const imageUrl = json.data.images[0].url;
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

    const title = isEditMode ? "Edit Album" : "Add Album";

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
                        <div className="w-[400px] relative h-full">
                            <input
                                type="file"
                                {...register("images")}
                                accept="image/*"
                                onChange={handleImageChange}
                                className="h-full w-full"
                                required={!isEditMode || (!imagePreview && isEditMode)}
                            />
                            {imagePreview && (
                                <div className="image absolute top-0 w-[400px]">
                                    <img src={imagePreview} alt="Image Preview" className="object-cover rounded-md h-72 w-full" />
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
                    <div className="flex flex-col gap-4">
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
                    <Link href="/admin/album"><button className="border border-black rounded-md px-14 py-3 w-fit text-lg">Cancel</button></Link>
                </div>
            </form>
        </div>
    );
};

export default AddAlbum;
