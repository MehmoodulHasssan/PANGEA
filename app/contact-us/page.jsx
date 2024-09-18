'use client'
import WithHeaderWrapper from '@/components/WithHeaderWrapper'
import React, { useState } from 'react'
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";

const ContactPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        // You can also handle the form submission here
        // e.g., sending the data to an API
    };

    return (
        <WithHeaderWrapper>
            <div className="bg-white text-gray-800 text-xs p-5 rounded-lg max-w-lg mx-auto mt-24">
                <div className="flex justify-around mb-5">
                    <div className="flex flex-col items-center justify-center gap-2 border border-gray-400 p-2 rounded-lg">
                        <MdEmail className="text-2xl" />
                        <p>EMAIL</p>
                        <p>hi@pang3a.com</p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2 border border-gray-400 p-2 rounded-lg">
                        <FaPhoneAlt className="text-2xl" />
                        <p>Telephone</p>
                        <p>949-229-0030</p>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2 border border-gray-400 p-2 rounded-lg">
                        <IoLocationSharp className="text-2xl" />
                        <p>Location</p>
                        <p>Santa Ana, CA</p>
                    </div>
                </div>

                <h2 className="text-lg font-semibold mb-4">SEND US A MESSAGE</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <input
                        type="text"
                        name="name"
                        placeholder="Your Name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="bg-transparent p-2 rounded border border-gray-300"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your Email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="bg-transparent p-2 rounded border border-gray-300"
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message (Optional)"
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                        className="bg-transparent p-2 rounded border border-gray-300"
                    ></textarea>
                    <div className='flex justify-center'>
                        <button type="submit" className="p-2 w-24 border border-gray-400 bg-black text-white rounded hover:opacity-70">Submit</button>
                    </div>
                </form>
            </div>
        </WithHeaderWrapper>
    )
}

export default ContactPage;