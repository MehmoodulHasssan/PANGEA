import React, { useRef, forwardRef, useEffect } from 'react'
import { FaPlus, FaMinus } from 'react-icons/fa6';
import { MdDelete, MdModeEdit } from "react-icons/md";
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';



const cartPricingOverflow = [1, 2, 3, 4, 5]

const MobileOrdersManagement = ({ addedItems, removeItem, onDecrement, onIncrement, height }) => {
    const lastElementRef = useRef()
    const router = useRouter()


    useEffect(() => {
        lastElementRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [addedItems])

    return (
        <div className={`absolute top-[90px] w-screen flex flex-col ${height ? `h-[${height}px]` : 'h-[430px]'} text-white bg-black border border-slate-200 justify-between`}>

            <div className='h-full overflow-y-scroll scrollbar-hide'>
                {addedItems.length === 0 && <div className='flex h-72 text-gray-400 text-xl justify-center items-center'>No items in bag</div>}
                {addedItems.length > 0 && addedItems.map((item, index) => (
                    <div key={index} className='h-[16rem] overflow-clip flex flex-col p-4 border border-b-slate-200'>
                        <div className='flex gap-4 p-4'>
                            <div className='w-24 max-h-[7.5rem] overflow-hidden border border-gray-400 rounded-lg'>
                                <img className='rounded-lg max-h-fit'
                                    src={item.product.image[0]}
                                    alt="image" />
                            </div>
                            <div className='flex flex-col gap-1'>
                                <span>{item.product.name}</span>
                                <span className='text-sm text-gray-400'>
                                    {`${item.product.color} - ${item.size}`}
                                </span>
                                <span>
                                    {`$${item.product.price}`}
                                </span>
                                <span className='text-sm font-normal p-[0.15rem] border border-gray-400 w-12 text-center'>NEW</span>
                            </div>
                        </div>
                        <span class="block mx-auto w-[276px] h-px bg-gray-300"></span>
                        <div className='flex justify-between items-center p-4'>
                            <div className=" w-fit flex items-center space-x-2 px-[0.1rem] py-[0.1rem] rounded-full border border-gray-400">
                                <button
                                    className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-red-400 transition"
                                    onClick={() => removeItem(item)}
                                >
                                    <MdDelete className="text-gray-600 w-6" />
                                </button>
                                <button className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 transition">
                                    <MdModeEdit className="text-gray-600 w-6" />
                                </button>
                            </div>
                            <span>{`$${(item.quantity * item.product.price).toFixed(2)}`}</span>
                            <div className=" w-fit flex items-center space-x-2 px-[0.1rem] py-[0.1rem] rounded-full border border-gray-400">
                                <button
                                    className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 transition"
                                    onClick={() => onDecrement(item)}
                                >
                                    <FaMinus className="text-gray-600 w-3" />
                                </button>
                                <span>{item.quantity}</span>
                                <button
                                    className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 transition"
                                    onClick={() => onIncrement(item)}
                                >
                                    <FaPlus className="text-gray-600 w-3" />
                                </button>
                            </div>
                        </div>
                        {index === addedItems.length - 1 && <div ref={lastElementRef} />}
                    </div>
                ))}

            </div>
        </div>
    )
}

export default MobileOrdersManagement
