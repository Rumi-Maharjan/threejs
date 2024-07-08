"use client";

import React, { useState, useEffect } from "react";
import { FaPhone } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2";
import { ProgressSpinner } from "primereact/progressspinner";
import Link from "next/link";

interface IFormInput {
    name: string;
    email: string;
    subject: string;
    message: string;
    title: string;
}

interface ContactData {
    id: number;
    name: string[];
    value: string[];
}

interface SocialData {
    id: number;
    name: string[];
    value: string[];
}

const Contact: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [contactData, setContactData] = useState<ContactData>({
        id: 0,
        name: [],
        value: []
    });
    const [socialData, setSocialData] = useState<SocialData>({
        id: 0,
        name: [],
        value: []
    });
    const { register, handleSubmit, reset, formState: { errors } } = useForm<IFormInput>();

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            setLoading(true);
            const response = await fetch('/api/inquiry', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            console.log(response);
            if (response.ok) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Your message has been sent successfully.',
                    icon: 'success',
                    confirmButtonText: 'Ok'
                });
                const responseData = await response.json();
                console.log(responseData);
                reset();
                setLoading(false);
            } else {
                Swal.fire({
                    title: 'Error!',
                    text: 'There was an error sending your message. Please try again later.',
                    icon: 'error',
                    confirmButtonText: 'Ok'
                });
                setLoading(false);
                throw new Error('Failed to send message');
            }
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error!',
                text: 'There was an error sending your message. Please try again later.',
                icon: 'error',
                confirmButtonText: 'Ok'
            });
            setLoading(false);
        }
    };

    useEffect(() => {
        getContactData();
        getSocialData();
    }, []);

    const getContactData = async () => {
        try {
            const res = await fetch('/api/contact/');
            const json = await res.json();
            console.log("data:", json);
            if (json.data.length > 0) {
                setContactData(json.data[0]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const getSocialData = async () => {
        try {
            const res = await fetch('/api/social/');
            const json = await res.json();
            console.log("data:", json);
            if (json.data.length > 0) {
                setSocialData(json.data[0]);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <div className="w-[80%] mx-auto">
            {loading && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-white opacity-75 z-50">
                    <ProgressSpinner />
                    <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4"></div>
                </div>
            )}
            <div className="relative">
                <div className="h-[30vw]">
                    <img src="/mic4.jpg" className="w-full object-cover h-full object-right-top rounded-md"/>
                </div>
                <div className="absolute text-white top-0 left-14 flex flex-col gap-20 justify-center h-full">
                    <div className="font-bold text-6xl">Let&apos;s collaborate.</div>
                    <div>Connect with us for inquiries or just to chat. Got a project in mind? <br/>Reach out and let&apos;s create art together.</div>
                </div>
            </div>
            <div className="mt-20 flex justify-center">
                <div>
                    <div>
                        <div className="font-bold text-2xl mb-7">Contact us</div>
                        <div className="text-white flex gap-7 grid grid-cols-2 flex-wrap">
                            {contactData.name.map((name, index) => (
                                    <div key={index} className="bg-black rounded-3xl py-3 flex gap-3 w-72 justify-center text-gray-500">{name}<span className="font-light text-white">{contactData.value[index]}</span></div>
                            ))}
                        </div>
                    </div>
                    <div className="my-16">
                        <div className="font-bold text-2xl mb-5">Send us a message</div>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                            <div className="flex gap-7">
                                <input 
                                    type="text" 
                                    {...register("name")}
                                    placeholder="Name" 
                                    className="custom-input p-3 rounded-md w-72 h-fit" 
                                    required
                                />
                                <div className="flex flex-col gap-2">
                                    <input 
                                        type="email" 
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                                message:
                                                    "Invalid email address",
                                            },
                                        })}
                                        placeholder="Email address" 
                                        className="custom-input p-3 rounded-md w-72" 
                                        required
                                    />
                                    {errors.email && (
                                        <span className="text-red-500 text-sm">
                                            {errors.email.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="flex gap-7">
                                <input 
                                    type="text" 
                                    {...register("title")}
                                    placeholder="Title" 
                                    className="custom-input p-3 rounded-md w-72" 
                                    required
                                />
                                <input 
                                    type="text" 
                                    {...register("subject")}
                                    placeholder="Subject" 
                                    className="custom-input p-3 rounded-md w-72" 
                                    required
                                />
                            </div>
                            <div className="flex gap-7">
                                <textarea 
                                    {...register("message")}
                                    placeholder="Message" 
                                    className="custom-input p-3 rounded-md w-full h-28" 
                                    required></textarea>
                            </div>
                            <div className="flex justify-end mt-5">
                                <input type="submit" className="bg-black text-white py-2 px-14 text-sm cursor-pointer "/>
                            </div>
                        </form>
                    </div>
                    <div>
                        <div className="font-semibold text-xl mb-7">Follow On:</div>
                        <div className="flex grid grid-cols-3 gap-3 mb-11">
                            {socialData.name.map((name, index) => (
                                <a href={socialData.value[index]} target="_blank" rel="noopener noreferrer">
                                    <div key={index} className="rounded-md py-3 flex gap-3 w-44 justify-center text-gray-500 shadow-md border font-semibold">{name}</div>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
