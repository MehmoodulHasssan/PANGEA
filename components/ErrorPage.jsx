'use client'
import React from 'react'
import { TbMoodSad } from "react-icons/tb";
import Link from 'next/link';
const ErrorPage = ({ statusCode, content }) => {
    return (
        <div className="flex items-center bg-slate-300 justify-center w-full h-screen">
            <div className="flex flex-col items-center p-10 w-10/12 lg:w-5/12 bg-white shadow-lg rounded-xl text-gray-600">
                <h1 className="text-gray-600"><TbMoodSad size={100} /></h1>
                <h1 className="text-[5rem] leading-none text-gray-600">{statusCode}</h1>
                <p className="text-xl text-gray-500 text-center">{content}</p>
                <button className="bg-blue-400 mt-4 text-white py-2 px-4 rounded-lg hover:opacity-90"><Link href="/">Go Back to Home</Link></button>
            </div>
        </div>
    )
}

export default ErrorPage
