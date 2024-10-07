import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { EffectFade, FreeMode, Grid, Navigation, Pagination } from 'swiper/modules';
import { GrFormPrevious, GrFormNext } from 'react-icons/gr'
import { FaPlus, FaMinus } from 'react-icons/fa6';
import '@/app/styles/main.scss';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import LargeSwiperCardSkeleton from './HomePage-subcomponents/LargeSwiperCardSkeleton';
import { itemsActions } from '@/store/slices/cartItems';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { setRecentItems } from '@/helpers/setRecentItems';
import axios from 'axios';
import { prod_client } from '../helpers/InitializeSquareClient';
import toast from 'react-hot-toast';

let inventoryAlert = null
const suggestionsImages = [
    'https://www.nuro.la/uploads/1/4/3/6/143644655/s864328628968731809_p7_i3_w3000.png',
    'https://www.nuro.la/uploads/1/4/3/6/143644655/s864328628968731809_p14_i3_w3000.png',
    'https://www.nuro.la/uploads/1/4/3/6/143644655/s864328628968731809_p15_i3_w3000.png',
    'https://www.nuro.la/uploads/1/4/3/6/143644655/s864328628968731809_p18_i3_w3000.png'
];

let totalImages = 0
const HomeProductSlide = ({ product, inventoryArray }) => {
    const swiperRef = useRef(null)
    const dispatch = useDispatch()
    const router = useRouter()
    const [availableQuantity, setAvailableQuantity] = useState(null)
    const [selectedImageIndex, setSelectedImageIndex] = useState(null)
    const [imageLoading, setImageLoading] = useState(true)
    const [loadedImagesCount, setLoadedImagesCount] = useState(0)
    const [quantity, setQuantity] = useState(0)
    const images = product?.item_data?.ecom_image_uris
    const productPrice = product?.item_data?.variations[0]?.item_variation_data.price_money?.amount / 100
    const productName = product?.item_data?.name
    // const productType = product?.item_data?.product_type
    const itemVariations = product?.item_data?.variations[0]
    const location_overrides = itemVariations?.item_variation_data?.location_overrides
    // console.log(location_overrides && location_overrides[0]?.inventory_alert_threshold)
    // console.log(inventoryArray)
    useEffect(() => {
        if (inventoryArray?.length > 0) {

            inventoryArray.forEach((element, index) => {
                // console.log(element?.id, itemVariations?.id)
                if (element?.id === itemVariations?.id) {
                    const quantity = element.varData.quantity
                    // {
                    //     "catalogObjectId": "QITNJNSBP6TNL2RKPPVEJANC",
                    //     "catalogObjectType": "ITEM_VARIATION",
                    //     "state": "IN_STOCK",
                    //     "locationId": "LZJ64CSPEV4Y9",
                    //     "quantity": "27",
                    //     "calculatedAt": "2024-09-24T17:22:33.256Z"
                    // }
                    // console.log(quantity)
                    setAvailableQuantity(Number(quantity))
                }
            })
        }
    }, [inventoryArray])


    if (images) {
        totalImages = Object.keys(images).length
    }

    // useEffect(() => {
    //     if(images && images.length > 0){
    //         setSelectedImageIndex(0)
    //     }
    // }, [])
    // console.log(totalImages)
    const handleImageLoad = () => {
        setLoadedImagesCount((prevCount) => {
            const newCount = prevCount + 1;
            if (newCount === totalImages) {
                setImageLoading(false); // Set loading to false when all images are loaded
            }
            return newCount;
        });
    };

    const handleAddItem = ({ product, availableStock, quantity = 1 }) => {
        dispatch(itemsActions.addItem({ product, quantity, availableStock }));
    };

    const handleNavigateDetails = (product) => {
        setRecentItems(product)
        return router.push('/product-details/' + product.id)
    }

    const handleSelectImage = (index) => {
        swiperRef.current.slideTo(index, 300)
        setSelectedImageIndex(index)
    }

    const handleSlideNext = ({ event }) => {
        event.stopPropagation();
        if (swiperRef.current) {
            swiperRef.current.slideNext();
            // console.log(swiperRef.current.activeIndex)
            setSelectedImageIndex(prev => prev + 1);
        }
    }
    const handleSlidePrev = ({ event }) => {
        event.stopPropagation();
        if (swiperRef.current) {
            swiperRef.current.slidePrev();
            setSelectedImageIndex(prev => prev - 1);
        }
    }

    // console.log(selectedImageIndex)
    return (

        <div className='h-full w-full overflow-hidden relative'>
            {images && imageLoading &&
                <LargeSwiperCardSkeleton />
            }
            <div className="item-image-box">
                <Swiper
                    className="imageSwiper"
                    cssMode={true}
                    // direction='horizontal'
                    slidesPerView={1}
                    navigation={true}
                    // effect='fade'
                    // fadeEffect={{
                    //     crossFade: true
                    // }}
                    modules={[Navigation]}
                    onBeforeInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                >
                    {/* <div className="button-overlay prev-button-overlay">
                        <GrFormPrevious />
                    </div> */}
                    {images && images.length > 1 && selectedImageIndex < (images.length - 1) &&
                        <>
                            <div className="next-overlay"></div>
                            <div
                                className='next-button-closure'
                                onClick={(event) => handleSlideNext({ event })}
                            >
                                <div><FaAngleRight className='next-nav-icon' />
                                </div>
                            </div>
                        </>
                    }
                    {images && images.length > 1 && selectedImageIndex > 0 &&
                        <>
                            <div className="prev-overlay"></div>
                            <div
                                className='prev-button-closure'
                                onClick={(event) => handleSlidePrev({ event })}
                            >
                                <div><FaAngleLeft className='prev-nav-icon' />
                                </div>
                            </div>
                        </>}
                    {images && images.map((key, imgIndex) => (
                        <SwiperSlide
                            // className="imageSlide"
                            key={imgIndex}
                            onClick={() => handleNavigateDetails(product)}
                        >
                            {/* <div className='next-button-closure'>
                                <div><FaAngleRight className='next-nav-icon' />
                                </div>
                            </div> */}
                            <div style={{ aspectRatio: '4/5', position: 'relative', width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F6F6F6', borderRadius: '10px' }}>
                                <Image
                                    layout='responsive'
                                    objectFit='contain'
                                    height={5}
                                    width={4}
                                    objectPosition='center'
                                    quality={20}
                                    onLoad={() => {
                                        handleImageLoad()
                                        // console.log('loaded image')
                                    }}
                                    loading='lazy'
                                    // onClick={() => handleNavigateDetails(product)}
                                    className="hover:cursor-pointer"
                                    src={key}
                                    alt={'product image'}
                                />
                                <p className="new">NEW</p>
                            </div>
                        </SwiperSlide>
                    ))}
                    {/* <div className="button-overlay next-button-overlay">
                        <GrFormNext />
                    </div> */}
                </Swiper>
            </div>
            <div className="item-info">
                <h5 className="hide">{productName && productName}</h5>
                <p className="hide text-gray-700">{`$${productPrice.toFixed(2)}`}</p>
                {availableQuantity && location_overrides && availableQuantity < location_overrides[0]?.inventory_alert_threshold && <p className="hide text-white bg-gradient">
                    <span className='mt-[1px] line-clamp-1'>
                        Low Stock
                    </span>
                </p>}

                <div className="item-sizes-box">
                    <div>
                        <p>QUICK ADD</p>
                        <button
                            className="plus"

                            onClick={() => {
                                if (quantity > 0) {
                                    handleAddItem({ product, quantity, availableStock: availableQuantity })
                                }
                            }
                            }
                            title='Add to cart'
                        >
                            <FaPlus
                            />
                        </button>
                    </div>
                    <div className="separator !bg-[#eeecec]"></div>
                    <div className="item-sizes">
                        <button
                            onClick={() => {
                                if (quantity > 0) {
                                    setQuantity(quantity - 1)
                                }
                            }
                            }
                        >
                            <FaMinus />
                        </button>
                        <div>{quantity}</div>
                        <button
                            onClick={
                                () => {
                                    if (quantity >= availableQuantity) {
                                        toast.error('No more stock available')
                                        return
                                    }
                                    setQuantity(quantity + 1)
                                }
                            }
                        >
                            <FaPlus />
                        </button>
                    </div>
                </div>
                <div className="item-images">
                    {images && images.map((image, imgIndex) => (
                        <div
                            key={imgIndex}
                            style={{ aspectRatio: '4/5', position: 'relative', maxWidth: '52px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#eeecec', borderRadius: '10px', border: `2px solid ${selectedImageIndex === imgIndex ? '#bdbbbb' : 'transparent'}` }}
                            onClick={() => handleSelectImage(imgIndex)}
                        >
                            <Image src={image} alt="image" layout='responsive' width={4} height={5} />
                        </div>
                    ))}
                    {/* {images && Object.keys(images).map((image, imgIndex) => (
                    <img key={imgIndex} src={image} alt="image" />
                ))} */}
                </div>
            </div>
        </div>
    )
}

export default HomeProductSlide
