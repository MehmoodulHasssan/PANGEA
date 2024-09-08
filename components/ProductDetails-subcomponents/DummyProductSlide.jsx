import React from 'react'
import LargeSwiperCardSkeleton from '../HomePage-subcomponents/LargeSwiperCardSkeleton'

const DummyProductSlide = () => {
    return (
        <div className='h-[470px] overflow-hidden'>
            <div className="mt-[30px] w-full h-full">
                <LargeSwiperCardSkeleton maxHeight={470} maxWidth={330} />
            </div>
        </div>
    )
}

export default DummyProductSlide
