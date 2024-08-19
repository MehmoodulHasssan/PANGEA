import React from 'react'
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

const MobilePopUpBtns = ({ isStyles, setStyles, setShowPopUp }) => {
    return (
        <div className='fixed bottom-10 z-10 flex justify-center items-center w-full gap-6'>
            <div className="border border-gray-500 bg-black rounded-full w-fit p-1 flex justify-between items-center">
                <span
                    className={`inline-block text-white text-[20px] rounded-full px-7 py-3 hover:cursor-pointer ${isStyles ? 'bg-gray-700' : ''}`}
                    onClick={() => setStyles(true)}
                >
                    Styles
                </span>
                <span
                    className={`inline-block text-white text-[20px] rounded-full px-7 py-3 hover:cursor-pointer ${!isStyles ? 'bg-gray-700' : ''}`}
                    onClick={() => setStyles(false)}
                >
                    Flavors
                </span>
            </div>
            <div
                className='rounded-full overflow-hidden bg-black p-5'
                onClick={() => setShowPopUp(true)}
            >
                <HiAdjustmentsHorizontal className='text-5xl text-white' />
            </div>
        </div>
    )
}

export default MobilePopUpBtns