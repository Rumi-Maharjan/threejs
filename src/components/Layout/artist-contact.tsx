"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface IFormInput {
    names: string[];
    values: string[];
}

const ArtistContact: React.FC = () => {
    const [fields, setFields] = useState<{ name: string; value: string }[]>([{ name: "", value: "" }]);
    const [isEditMode, setEditMode] = useState(false);

    const { register, handleSubmit, reset } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        console.log(data);

        // Format the data as an array of objects
        const formattedData = fields.map((field, index) => ({
            name: data.names[index],
            value: data.values[index]
        }));

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formattedData)
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

    const title = isEditMode ? "Edit Contact Info" : "Add Contact Info";

    const addField = () => {
        setFields([...fields, { name: "", value: "" }]);
    };

    const removeField = (index: number) => {
        const newFields = fields.filter((_, i) => i !== index);
        setFields(newFields);
    };

    return (
        <div className="pl-8">
            <div className="text-2xl font-medium mb-3">{title}</div>
            <form onSubmit={handleSubmit(onSubmit)} className="input-form">
                {fields.map((field, index) => (
                    <div key={index} className="flex gap-7 mb-3 items-end">
                        <div className="field">
                            <label htmlFor={`names[${index}]`}>Name</label>
                            <input
                                type="text"
                                {...register(`names.${index}` as const)}
                                placeholder=""
                                className=""
                                required
                            />
                        </div>
                        <div className="field">
                            <label htmlFor={`values[${index}]`}>Value</label>
                            <input
                                type="text"
                                {...register(`values.${index}` as const)}
                                placeholder=""
                                className=""
                                required
                            />
                        </div>
                        {index > 0 && (
                            <button type="button" onClick={() => removeField(index)} className="border border-black rounded-md px-2 py-1 h-fit">Remove</button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={addField} className="bg-blue-500 text-white px-3 py-2 rounded-md mb-3 w-fit">Add Field</button>
                <div className="flex gap-7 mt-5">
                    <button type="submit" className="bg-black rounded-md text-white px-14 py-3 w-fit text-lg">Submit</button>
                    <button type="button" className="border border-black rounded-md px-14 py-3 w-fit text-lg" onClick={() => setEditMode(false)}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default ArtistContact;
