import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
// import 'swiper/css/navigation';
import { FreeMode, Navigation } from 'swiper/modules';
import { FaPlus, FaMinus } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';
import { itemsActions } from '@/store/slices/cartItems';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import LargeSwiperCardSkeleton from '../HomePage-subcomponents/LargeSwiperCardSkeleton';
import '@/app/styles/main.scss';
import { current } from '@reduxjs/toolkit';
import { setRecentItems } from '@/helpers/setRecentItems';
import toast from 'react-hot-toast';


let inventoryAlert = null
let totalImages = 0
const MobileProductSlide = ({ product, vertical, bgClicked, setBgClicked, inventoryArray }) => {
    const [showQuantity, setShowQuantity] = useState(false)
    const [availableQuantity, setAvailableQuantity] = useState(null)
    const [loadedImagesCount, setLoadedImagesCount] = useState(0);
    const [imageLoading, setImageLoading] = useState(true);
    const [quantity, setQuantity] = useState(0)
    const dispatch = useDispatch()
    const router = useRouter()

    // handling product Data
    const images = product?.item_data?.ecom_image_uris
    let imagesArray;
    if (images) {
        imagesArray = Object.values(images)
    }
    const productPrice = product?.item_data?.variations[0]?.item_variation_data.price_money?.amount
    const productName = product?.item_data?.name
    // const productType = product?.item_data?.product_type
    const itemVariations = product?.item_data?.variations[0]
    const location_overrides = itemVariations?.item_variation_data?.location_overrides
    // const inventoryAlert = product?.item_data?.variations[0]?.item_variation_data.location_overrides[0]?.inventory_alert_type
    // console.log(product.item_data.variations[0])

    if (images) {
        totalImages = Object.keys(images).length
    }
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

    // console.log(product)
    const handleAddItem = ({ product, quantity = 1, availableStock }) => {
        dispatch(itemsActions.addItem({ product, quantity, availableStock }));
    }

    const handleSlideClick = () => {
        // console.log(product.id)
        const itemId = product.item_data?.variations[0]?.id
        console.log(product.item_data?.variations[0]?.id)
        if (!showQuantity) {
            setRecentItems(product)
            router.push('/product-details/' + product.id)
        }
    }

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

    useEffect(() => {
        if (bgClicked) {
            if (showQuantity) {
                setShowQuantity(false)
            }
            setBgClicked(false)
        }
    }, [bgClicked])



    return (
        <div
            className='max-h-full overflow-hidden relative'
        // style={{ aspectRatio: '7/13' }}
        >
            {imageLoading && <LargeSwiperCardSkeleton />}
            <div
                className='relative flex flex-col'
            // onClick={handleSlideClick}
            >
                <Swiper
                    direction={vertical ? 'vertical' : 'horizontal'}
                    // loop={true}
                    spaceBetween={0}
                    slidesPerView={1}
                    // freeMode={true}
                    // freeModeSticky={true}
                    navigation={false}
                    modules={[FreeMode, Navigation]}
                    style={{ width: '100%', aspectRatio: '4/5', height: 'auto' }}

                // className="mySwiper"
                >
                    {images && imagesArray.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div
                                style={{ aspectRatio: '4/5', position: 'relative', width: '100%', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F6F6F6', borderRadius: '10px' }}
                                onClick={handleSlideClick}
                            >
                                <Image
                                    layout='responsive'
                                    height={5}
                                    width={4}
                                    objectFit='cover'
                                    objectPosition='center'
                                    quality={50}
                                    onLoad={() => {
                                        handleImageLoad()
                                        // console.log('loaded image')
                                    }}
                                    loading='lazy'
                                    // onClick={() => handleNavigateDetails(product)}
                                    className="hover:cursor-pointer"
                                    src={image}
                                    alt={'product image'}
                                />
                                <p className="absolute w-12 h-12 flex justify-center items-center bottom-0 right-0 text-black "
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        // setBgClicked(true)
                                        setShowQuantity(true)

                                    }}
                                >
                                    <span className='bg-white/50 rounded-full p-2'>
                                        <FaPlus className='' />

                                    </span>
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
                <div className='flex flex-col py-2'>
                    <h5 className="text-[9px] text-black">{productName && productName}</h5>
                    {/* <p className="text-[8px] text-gray-300">
                    {productType} <span> 4 colors</span>
                </p> */}
                    <p className="text-[10px] text-gray-700">${productPrice && (productPrice / 100).toFixed(2)}</p>
                    {availableQuantity && location_overrides && availableQuantity < location_overrides[0]?.inventory_alert_threshold && <p className="text-[8px] w-fit text-white bg-gradient-to-r from-[#3dbfff] to-[#a649ff] rounded-full p-1">
                        <span className='mb-[-1px]'>
                            Low Stock
                        </span></p>}
                    {/* padding: 2px 5px;
          background: linear-gradient(90deg, #3dbfff, #a649ff);
          border-radius: 5px;
          font-size: 10px;
          text-align: center; */}
                </div>

                <AnimatePresence>
                    {showQuantity &&
                        <motion.div
                            onClick={(e) => { e.stopPropagation() }}
                            className="absolute left-0 flex justify-center w-full h-auto bottom-[68px] z-[6]"
                            initial={{ opacity: 0, y: "100%" }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: '100%' }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className='w-[87%] h-auto bg-white border border-[#3d3d3d] rounded-lg p-2.5 pt-0'>
                                <div className='flex justify-between items-center text-[10px] text-black pt-2 pb-1'>
                                    <p className=''>QUICK ADD</p>
                                    <button
                                        className='bg-[#eeecec] rounded-full p-1'
                                        onClick={() => {
                                            if (quantity > 0) {
                                                handleAddItem({ product, quantity, availableStock: availableQuantity });
                                                return
                                            }
                                            toast.error('Please select a quantity first')
                                        }}>
                                        <FaPlus />
                                    </button>
                                </div>
                                <div className="separator !bg-[#eeecec]"></div>
                                <div className="flex justify-center items-center text-[10px] text-black gap-3 py-2">
                                    <button
                                        onClick={() => {
                                            if (quantity > 0) {
                                                setQuantity(quantity - 1)
                                            }
                                        }}
                                        className='active:bg-[#eeecec] rounded-full p-1'
                                    >
                                        <FaMinus />
                                    </button>
                                    <div style={{ lineHeight: 'initial' }}>{quantity}</div>
                                    <button
                                        onClick={() => {
                                            if (quantity >= availableQuantity) {
                                                toast.error('No more items in stock')
                                                return;
                                            }
                                            setQuantity(quantity + 1)
                                        }}
                                        className='active:bg-[#eeecec] rounded-full p-1'
                                    >
                                        <FaPlus />
                                    </button>
                                </div>
                            </div>
                        </motion.div>}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default MobileProductSlide;
