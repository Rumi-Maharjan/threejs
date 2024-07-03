"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { Sizes, Color } from "@prisma/client/edge";

interface IFormInput {
    name: string;
    images: string[];
    description: string;
    category_id: number;
    price: number;
    size: string[];
    color: string[];
    quantity: number;
}

interface Category {
    id: number;
    name: string;
}

const StoreList: React.FC = () => {
    const [isEditMode, setEditMode] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const [categoryData, setCategoryData] = useState<Category[]>([]);
    const [listData, setListData] = useState<IFormInput>({
        name: "",
        images: [],
        description: "",
        category_id: 0,
        price: 0,
        size: [],
        color: [],
        quantity: 0,
    });

    const index = searchParams.get('id');
    console.log("id:",index);

    const { register, handleSubmit, setValue, reset } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        console.log(data);
        const formData = new FormData();
    
        formData.append('name', data.name);
        formData.append('description', data.description);
        for (let i = 0; i < data.images.length; i++) {
            formData.append('images', data.images[i]);
        }
        data.size.forEach(size => formData.append('size', size));
        data.color.forEach(color => formData.append('color', color));
        formData.append('category_id', String(data.category_id));
        formData.append('price', String(data.price));
        formData.append('quantity', String(data.quantity));
        console.log('Sizes:', data.size);
    
        try {
            const response = await fetch(index ? `/api/item?id=${index}` : '/api/item', {
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
    

    useEffect(() => {
        getData();
        if (index) {
            setEditMode(true);
            getListData(index);
        }
    }, [index]);

    const getData = async () => {
        try {
            const res = await fetch('/api/category/');
            const json = await res.json();
            console.log("data:", json);
            setCategoryData(json.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const getListData = async (id: string) => {
        try {
            const res = await fetch(`/api/item/${id}`);
            const json = await res.json();
            console.log("Fetched Data:", json);
            setListData(json.data);
            setValue("name", json.data.name);
            setValue("description", json.data.description);
            setValue("images", json.data.images);
            setValue("category_id", json.data.category_id);
            setValue("price", json.data.price);
            setValue("quantity", json.data.quantity);
            setValue("size", json.data.size);
            setValue("color", json.data.color);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const title = isEditMode ? "Edit Store Item" : "Add Store Item";

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
                        <label htmlFor="category_id">Store Category</label>
                        <select {...register("category_id")} className="" required defaultValue="">
                            <option value="" disabled hidden>Select Store Categoy</option>
                            {categoryData.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="flex gap-7">
                    <div className="field">
                        <label htmlFor="images">Image</label>
                        <input
                            type="file"
                            {...register("images")}
                            accept="image/*"
                            placeholder=""
                            className="h-full"
                            required
                            multiple
                        />
                    </div>
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
                <div className="flex gap-7">
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
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="number"
                            {...register("quantity")}
                            placeholder=""
                            className=""
                            required
                            min={1}
                        />
                    </div>
                </div>
                <div className="flex gap-7">
                    <div className="field">
                        <label htmlFor="size">Sizes</label>
                        <select {...register("size")} className="" required multiple>
                            <option value="" disabled hidden>Select Available Sizes</option>
                            {Object.values(Sizes).map((color) => (
                                <option key={color} value={color}>
                                    {color}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="field">
                        <label htmlFor="color">Colors</label>
                        <select {...register("color")} className="" required multiple>
                            <option value="" disabled hidden>Select Available Colors</option>
                            {Object.values(Color).map((color) => (
                                <option key={color} value={color}>
                                    {color}
                                </option>
                            ))}
                        </select>
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

export default StoreList;
