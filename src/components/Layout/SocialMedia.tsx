"use client";

import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { ProgressSpinner } from "primereact/progressspinner";

interface IFormInput {
    names: string[];
    values: string[];
}

const SocialMedia: React.FC = () => {
    const [fields, setFields] = useState<{ name: string; value: string }[]>([{ name: "", value: "" }]);
    const [isEditMode, setEditMode] = useState(false);
    const [id, setId] = useState();
    const [loading, setLoading] = useState(false);
    const [contactData, setContactData] = useState<IFormInput>({
        names: [],
        values: [],
    });

    const { register, handleSubmit, reset, setValue, watch } = useForm<IFormInput>();
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        console.log(data);

        const formattedData = fields.map((field, index) => ({
            name: data.names[index],
            value: data.values[index]
        }));

        try {
            setLoading(true);
            const response = await fetch(isEditMode ? `/api/social?id=${id}` : '/api/social', {
                method: isEditMode ? 'PATCH' : 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formattedData)
            });
            console.log(response);
            if (response.ok) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Social Media Links saved successfully.',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then(() => {
                    reset();
                    setLoading(false);
                    window.location.reload();
                });
                const responseData = await response.json();
                console.log(responseData);
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to save links. Please try again.',
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
                text: 'Failed to save links. Please try again.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            setLoading(false);
        }
    };

    const title = isEditMode ? "Edit Social Media Links" : "Add Social Media Links";

    const addField = () => {
        setFields([...fields, { name: "", value: "" }]);
    };

    const removeField = (indexToRemove: number) => {
        const updatedFields = [...fields];
        updatedFields.splice(indexToRemove,1);
        setFields(updatedFields);
        const updatedName = [...watch("names")];
        updatedName.splice(indexToRemove,1);
        setValue("names", updatedName);
        const updatedValue = [...watch("values")];
        updatedValue.splice(indexToRemove,1);
        setValue("values", updatedValue);
    }

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/social/');
            const json = await res.json();
            console.log("data:", json);
            if (json.data.length > 0) {
                const namesValue: string[] = json.data[0].name;
                const valuesValue: string[] = json.data[0].value;
                const initialFields = namesValue.map((name: string, index: number) => ({
                    name,
                    value: valuesValue[index]
                }));
                setFields(initialFields);
                setId(json.data[0].id);
                setEditMode(true);
                setValue("names", namesValue);
                setValue("values", valuesValue);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setEditMode(false);
        reset();
        window.location.reload();
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
                            <label htmlFor={`values[${index}]`}>Link</label>
                            <input
                                type="text"
                                {...register(`values.${index}` as const)}
                                placeholder=""
                                className=""
                                required
                            />
                        </div>
                        {index > 0 && (
                            <button type="button" onClick={() => removeField(index)} className="border border-red-300 shadow-lg rounded-md h-fit p-2 text-red-500">Remove</button>
                        )}
                    </div>
                ))}
                <button type="button" onClick={addField} className="px-3 py-2 rounded-md mb-3 w-fit bg-white text-black shadow-full">Add Field</button>
                <div className="flex gap-7 mt-5">
                    <button type="submit" className="bg-black rounded-md text-white px-14 py-3 w-fit text-lg">Submit</button>
                    <button type="button" className="border border-black rounded-md px-14 py-3 w-fit text-lg" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default SocialMedia;
