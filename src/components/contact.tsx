"use client";

import React from "react";
import { FaPhone } from "react-icons/fa6";
import { HiMail } from "react-icons/hi";
import { useForm, SubmitHandler } from "react-hook-form"

interface IFormInput {
    name: string
    email: string
    subject: string
    message: string
    title: string
}

const Contact: React.FC = () => {
    const { register, handleSubmit } = useForm<IFormInput>()
    const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data)
    return (
        <div className="w-[80%] mx-auto">
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
                    <div className="font-bold text-2xl mb-7">Contact us</div>
                    <div className="text-white flex gap-7">
                        <div className="bg-black rounded-3xl py-3 flex gap-3 w-72 justify-center"><HiMail /><span className="text-xs font-light">hello@artcraft.com</span></div>
                        <div className="bg-black rounded-3xl py-3 flex gap-3 w-72 justify-center"><FaPhone /><span className="text-xs font-light">+11 000 222 333</span></div>
                    </div>
                    <div className="my-16">
                        <div className="font-bold text-2xl mb-5">Send us a message</div>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                            <div className="flex gap-7">
                                <input 
                                    type="text" 
                                    {...register("name")}
                                    placeholder="Name" 
                                    className="custom-input p-3 rounded-md w-72" 
                                    required
                                />
                                <input 
                                    type="email" 
                                    {...register("email")}
                                    placeholder="Email address" 
                                    className="custom-input p-3 rounded-md w-72" 
                                    required
                                />
                            </div>
                            <div className="flex gap-7">
                                <input 
                                    type="text" 
                                    {...register("subject")}
                                    placeholder="Subject" 
                                    className="custom-input p-3 rounded-md w-72" 
                                    required
                                />
                                <input 
                                    type="text" 
                                    {...register("message")}
                                    placeholder="Message" 
                                    className="custom-input p-3 rounded-md w-72" 
                                    required
                                />
                            </div>
                            <div className="flex gap-7">
                                <textarea 
                                    {...register("title")}
                                    placeholder="Title" 
                                    className="custom-input p-3 rounded-md w-full h-28" 
                                    required></textarea>
                            </div>
                            <div className="flex justify-end mt-5">
                                <input type="submit" className="bg-black text-white py-2 px-14 text-sm"/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Contact;