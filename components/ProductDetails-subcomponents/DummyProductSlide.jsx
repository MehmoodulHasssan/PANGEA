import React from 'react'
import LargeSwiperCardSkeleton from '../HomePage-subcomponents/LargeSwiperCardSkeleton'

const DummyProductSlide = () => {
    return (
        <div className='w-full overflow-hidden' style={{ aspectRatio: '7/12' }}>
            <div className="mt-[30px] w-full h-full">
                <LargeSwiperCardSkeleton maxHeight={470} maxWidth={330} />
            </div>
        </div>
    )
}

export default DummyProductSlide
