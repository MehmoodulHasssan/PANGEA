import React from 'react'
import LargeSwiperCardSkeleton from '../HomePage-subcomponents/LargeSwiperCardSkeleton'

const DummyProductSlide = () => {
    return (
        <div className="w-full ps-12">
            <div className='w-full mt-[30px] overflow-hidden relative'
                style={{ aspectRatio: '7/12' }}
            >
                <LargeSwiperCardSkeleton />
                {/* <div className="mt-[30px] relative w-full h-full">
            </div> */}
            </div>
        </div>
    )
}

export default DummyProductSlide
