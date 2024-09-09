import React from 'react'
import BannerInfo from '@/components/HomePage-subcomponents/Container-subcomponents/BannerInfo'
import Image from 'next/image'

const ContainerImage = ({ image }) => {
    return (
        <div
            style={{
                aspectRatio: '4/5',
                position: 'relative',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundImage: `url(${image})`,
                // backgroundSize: 'cover',
            }}
        >
            <Image
                src={image}
                alt="image"
                layout="responsive"
                objectFit="cover"
                quality={50}
                objectPosition='center'
                height={5} // Maintain aspect ratio
                width={4}  // Maintain aspect ratio
                className='-z-10'
            />
            <BannerInfo />
        </div>
    )
}

export default ContainerImage
