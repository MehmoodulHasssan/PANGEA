import React, { useEffect, useState } from 'react'
import AnimatingButton from './AnimatingButton'
import { motion } from 'framer-motion'
import parseProductDetails from '@/helpers/parseProductDetails'
import { itemsActions } from '@/store/slices/cartItems'
import { useDispatch } from 'react-redux'
import Image from 'next/image'

const AbsolutePart = ({ product, centerSlide }) => {
    const dispatch = useDispatch()
    const [selectedImage, setSelectedImage] = useState(null)
    const images = product?.item_data?.ecom_image_uris
    const productPrice = product?.item_data?.variations[0]?.item_variation_data.price_money.amount / 100
    const productName = product?.item_data?.name
    const productType = product?.item_data?.product_type
    // const inventoryAlert = product?.item_data?.variations[0]?.item_variation_data.location_overrides[0]?.inventory_alert_type
    const inventory = product?.inventory[0]

    //handling description
    let description;
    const raw_description = product?.item_data?.description_plaintext
    if (raw_description) {
        // console.log(parseProductDetails(raw_description))
        description = parseProductDetails(raw_description)
    }

    const handleAddItem = ({ product, quantity = 1 }) => {
        const keysToRemove = ["recommendedItems", "inventory"]
        const filteredProduct = Object.keys(product).reduce((acc, key) => {
            if (!keysToRemove.includes(key)) {
                // console.log(key)
                acc[key] = product[key]
            }
            return acc;
        }, {})
        dispatch(itemsActions.addItem({ product: filteredProduct, quantity }))
    };

    const handleSelectedImage = (index) => {
        setSelectedImage(index)
        centerSlide(index)
    }

    // console.log(product)

    return (
        <>
            {product &&
                // <div className="lg:flex lg:items-center lg:justify-end lg:pr-24 lg:fixed lg:top-0 lg:left-0 lg:z-50 lg:w-[100vw] lg:h-[100vh]">
                <div className='w-full lg:absolute lg:w-[24rem] lg:h-[33rem] bg-white p-4 right-[4.5rem] z-50 lg:border border-gray-400 lg:rounded-lg lg:top-[50%] lg:translate-y-[-50%] overflow-scroll scrollbar-hide'>
                    {/* {product && <div className='product-page-det-card absolute bg-white p-4 top-[5%] right-[4.5rem] z-50 w-[24rem] h-[33rem] border border-gray-400 rounded-lg overflow-scroll scrollbar-hide'> */}
                    <div className='flex flex-col gap-3 w-full text-black justify-between'>
                        <div className='flex flex-col gap-1 border-b pb-3 border-gray-400'>
                            <h3 className='flex leading-tight font-gt-america-bold items-center justify-center'>
                                {productName && productName}
                            </h3>
                            <div className='flex justify-between text-sm'>
                                {/* <span>Flex Short</span> */}
                                <span>{`$${productPrice && productPrice}`}</span>
                            </div>
                            {/* <span className='text-xs text-gray-400'>{product.qualities[0]}</span> */}
                            <span className='text-xs text-gray-500 font-normal p-[0.15rem] border-[1px] border-gray-400 w-12 rounded-md text-center shadow-md'>NEW</span>
                        </div>
                        <span className='text-xs text-gray-400'>{`${inventory?.quantity} ${inventory?.state.replace(/_/g, ' ')}`}</span>
                        <div className='flex gap-1 p-1 border border-gray-400 rounded-lg'>
                            {images && images.map((image, index) => (
                                <div
                                    key={index}
                                    style={{ aspectRatio: '4/5' }}
                                    className={`w-14 border flex items-center border-gray-400 rounded-lg  hover:cursor-pointer ${selectedImage === index ? 'scale-105 border-2' : ''}`}
                                    onClick={() => handleSelectedImage(index)}
                                >
                                    <Image
                                        className='rounded-lg'
                                        src={image}
                                        layout='responsive'
                                        height={5}
                                        width={4}
                                        alt="image" />
                                </div>
                            ))}

                        </div>
                        <div className='flex flex-col gap-1'>

                            <div className='flex justify-center items-center'>
                                <motion.button
                                    className={` text-white font-gt-america-medium bg-black text-[0.75rem] py-2 px-24 rounded-full hover:cursor-pointer`}
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 800, damping: 10 }}
                                    onClick={() => handleAddItem({ product })}
                                >
                                    ADD TO BAG
                                </motion.button>
                            </div>
                        </div>

                        <div className='flex flex-col text-sm'>

                            <div className='flex flex-col gap-3 lg:border-y border-gray-400 py-4 '>
                                <div className='flex flex-col'>
                                    {description && <ul className="p-2 space-y-1 list-disc">
                                        <AnimatingButton name={'Description'} detail={description.description} />
                                        <AnimatingButton name={'Acknowledgements'} detail={description.acknowledgements} />
                                        {/* <AnimatingButton name={'Ingredients'} detail={description.Ingredients} /> */}
                                    </ul>}

                                    {!description && (raw_description ? <p className='text-center text-xl'>{raw_description}</p> : <p className='text-center text-xl'>No Description Found</p>)}

                                </div>
                            </div>

                        </div>
                    </div>
                </div>}
            {/*  </div>} */}
            {!product && <div className='product-page-det-card absolute bg-white p-4 top-[5%] right-[4.5rem] z-50 w-[24rem] h-[33rem] border border-gray-400 rounded-lg overflow-scroll scrollbar-hide'>
                <p className='text-center text-3xl'>No Product Found</p>
            </div>}
        </>
    )
}

export default AbsolutePart
