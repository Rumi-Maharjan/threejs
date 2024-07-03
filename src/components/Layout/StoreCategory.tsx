"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
    name: string;
    // image: string;
    description: string;
}

const StoreCategory: React.FC = () => {
    const [isEditMode, setEditMode] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [categoryData, setCategoryData] = useState<IFormInput>({
        name: "",
        description: "",
    });

    const index = searchParams.get('id');
    console.log("id:",index);

    const { register, handleSubmit, setValue } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = async(data) => {
        console.log(data);
        const name = data.name;
        const description = data.description;
        if (index) {
            await fetch(`/api/category?id=${index}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name, description
                })
            }).then((res) => {
                console.log(res)
            }).catch((e) => {
                console.log(e)
            })
        } else {
            await fetch('/api/category', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name, description
                })
            }).then((res) => {
                console.log(res)
            }).catch((e) => {
                console.log(e)
            })
        }
    };

    useEffect(() => {
        if (index) {
            setEditMode(true);
            getCategoryData(index);
        }
    }, [index]);

    const getCategoryData = async (id: string) => {
        try {
            const res = await fetch(`/api/category/${id}`);
            const json = await res.json();
            console.log("Fetched Data:", json);
            setCategoryData(json.data);
            setValue("name", json.data.name);
            setValue("description", json.data.description);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const title = isEditMode ? "Edit Store Category" : "Add Store Category";

    return (
        <div className="pl-8">
            <div className="text-2xl font-medium mb-3">{title}</div>
            <form onSubmit={handleSubmit(onSubmit)} className="input-form">
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
                <div className="flex gap-7">
                    {/* <div className="field">
                        <label htmlFor="image">Image</label>
                        <input
                            type="file"
                            {...register("image")}
                            accept="image/*"
                            placeholder=""
                            className="h-full"
                            required
                        />
                    </div> */}
                    <div className="field">
                        <label htmlFor="description">Description</label>
                        <textarea
                            {...register("description")}
                            placeholder=""
                            className="h-40"
                            required
                        ></textarea>
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

export default StoreCategory;
