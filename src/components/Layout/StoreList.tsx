"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
    name: string;
    image: string[];
    description: string;
    category: string;
    price: number;
    sizes: string[];
    colors: string[];
    qty: number;
}

const StoreList: React.FC = () => {
    const [isEditMode, setEditMode] = useState(false);
    const router = useRouter();

    const { register, handleSubmit } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = (data) => {
        console.log(data);
    };

    const title = isEditMode ? "Edit Store Item" : "Add Store Item";

    const colorData = [
        { id: 1, name: "Color1" },
        { id: 2, name: "Color2" },
        { id: 3, name: "Color3" },
        { id: 4, name: "Color4" },
        { id: 5, name: "Color5" },
        { id: 6, name: "Color6" },
        { id: 7, name: "Color7" },
        { id: 8, name: "Color8" },
        { id: 9, name: "Color9" },
        { id: 10, name: "Color10" },
        { id: 11, name: "Color11" },
    ];

    const categoryData = [
        { id: 1, name: "Category1" },
        { id: 2, name: "Category2" },
        { id: 3, name: "Category3" },
        { id: 4, name: "Category4" },
        { id: 5, name: "Category5" },
        { id: 6, name: "Category6" },
        { id: 7, name: "Category7" },
        { id: 8, name: "Category8" },
        { id: 9, name: "Category9" },
        { id: 10, name: "Category10" },
        { id: 11, name: "Category11" },
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
                        <label htmlFor="category">Store Category</label>
                        <select {...register("category")} className="" required defaultValue="">
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
                        <label htmlFor="image">Image</label>
                        <input
                            type="file"
                            {...register("image")}
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
                        <label htmlFor="qty">Quantity</label>
                        <input
                            type="number"
                            {...register("qty")}
                            placeholder=""
                            className=""
                            required
                            min={1}
                        />
                    </div>
                </div>
                <div className="flex gap-7">
                    <div className="field">
                        <label htmlFor="sizes">Sizes</label>
                        <select {...register("sizes")} className="" required>
                            <option value="" disabled hidden>Select Available Sizes</option>
                            <option value="S">Small</option>
                            <option value="M">Medium</option>
                            <option value="L">Large</option>
                            <option value="XL">Extra Large</option>
                        </select>
                    </div>
                    <div className="field">
                        <label htmlFor="colors">Colors</label>
                        <select {...register("colors")} className="" required>
                            <option value="" disabled hidden>Select Available Colors</option>
                            {colorData.map((colors) => (
                                <option key={colors.id} value={colors.id}>
                                    {colors.name}
                                </option>
                            ))}
                        </select>
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

export default StoreList;
