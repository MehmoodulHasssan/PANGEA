import Image from 'next/image';
import React from 'react'
import firstImg from '@assets/dropDown1.webp'
import secondImg from '@assets/dropDown2Short.jpg'
import thirdImg from '@assets/dropDown3Shortre.jpg'

const dropdownImages = [firstImg, secondImg, thirdImg];

const items = Array.from({ length: 5 }, (_, index) => index + 1);
const DropDown = ({ showDropdown, setShowDropdown }) => {
    return (
        <>
            {showDropdown && (
                <div
                    className="dropdown-container"
                    onMouseOver={() => setShowDropdown(true)}
                    onMouseOut={() => setShowDropdown(false)}
                >
                    <div className="left">
                        <div className="grid">
                            {items.map((item, index) => (
                                <div key={index} className="row">
                                    <p className="first">Heading</p>
                                    <p className="header-links">First</p>
                                    <p className="header-links">Second</p>
                                    <p className="header-links">Third</p>
                                    <p className="header-links">Fourth</p>
                                    <p className="header-links">Fifth</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="right">
                        <div className="image-container">
                            {dropdownImages.map((image, index) => (
                                <Image
                                    key={image}
                                    src={image}
                                    priority={true}
                                    alt="Image 1"
                                    layout='responsive'
                                    height={5}
                                    width={4}
                                    objectFit='cover'
                                    objectPosition='center'
                                />
                            ))}
                        </div>
                    </div>
                </div>

            )}
        </>
    )
}

export default DropDown
