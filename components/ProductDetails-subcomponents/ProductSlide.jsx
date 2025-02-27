// import React, { useState } from 'react'
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import { GrFormPrevious, GrFormNext } from 'react-icons/gr';
// import { FaPlus, FaMinus } from 'react-icons/fa6';
// import '@/app/styles/main.scss';
// import { modalActions } from '@/store/slices/openModel';
// import { useDispatch } from 'react-redux';
// import { useRouter } from 'next/navigation';
// import Image from 'next/image';
// import Skeleton from 'react-loading-skeleton';
// import LargeSwiperCardSkeleton from '../HomePage-subcomponents/LargeSwiperCardSkeleton';
// import { itemsActions } from '@/store/slices/cartItems';

// const suggestionsImages = [
//     'https://www.nuro.la/uploads/1/4/3/6/143644655/s864328628968731809_p7_i3_w3000.png',
//     'https://www.nuro.la/uploads/1/4/3/6/143644655/s864328628968731809_p14_i3_w3000.png',
//     'https://www.nuro.la/uploads/1/4/3/6/143644655/s864328628968731809_p15_i3_w3000.png',
//     'https://www.nuro.la/uploads/1/4/3/6/143644655/s864328628968731809_p18_i3_w3000.png'
// ];

// let totalImages = 0
// const ProductSlide = ({ product, bigItemClass, isLoading }) => {
//     const [loadedImagesCount, setLoadedImagesCount] = useState(0);
//     const [imageLoading, setImageLoading] = useState(true);
//     const dispatch = useDispatch()
//     const [quantity, setQuantity] = useState(0)
//     const router = useRouter()

//     //extracting data from raw form
//     const images = product?.item_data?.ecom_image_uris
//     const productPrice = product?.item_data?.variations[0]?.item_variation_data.price_money.amount / 100
//     const productName = product?.item_data?.name
//     const productType = product?.item_data?.product_type
//     const inventoryAlert = product?.item_data?.variations[0]?.item_variation_data.location_overrides[0]?.inventory_alert_type

//     if (images) {
//         totalImages = Object.keys(images).length
//     }
//     const handleNavigateDetails = (product) => {
//         dispatch(modalActions.closeModal())
//         return router.push('/product-details/' + product.id)
//     }

//     const incrementItem = () => {
//         setQuantity(quantity + 1)
//     }

//     const decrementItem = () => {
//         if (quantity > 0) {
//             setQuantity(quantity - 1)
//         }
//     }

//     const handleAddItem = ({ product, quantity = 1 }) => {
//         dispatch(itemsActions.addItem({ product, quantity }));
//     };
//     const handleImageLoad = () => {
//         setLoadedImagesCount((prevCount) => {
//             const newCount = prevCount + 1;
//             if (newCount === totalImages) {
//                 setImageLoading(false); // Set loading to false when all images are loaded
//             }
//             return newCount;
//         });
//     };

//     return (
//         <div className='overflow-hidden'>
//             {isLoading || (images && imageLoading) && (
//                 <div className="mt-[30px] h-full">
//                     <LargeSwiperCardSkeleton maxHeight={470} maxWidth={330} />
//                 </div>
//             )}
//             <SwiperSlide>
//                 <div
//                     className="slider-items"
//                 >
//                     <div className={`${bigItemClass ? "slider-big-item" : "slider-item"}`}>
//                         <div className={bigItemClass ? "big-item-image-box" : "item-image-box"}>
//                             <Swiper
//                                 className="imageSwiper"
//                                 cssMode={true}
//                                 // onBeforeInit={(swiper) => {
//                                 //   innerSwiperRef.current = swiper;
//                                 // }}
//                                 slidesPerView={1}
//                                 navigation={true}
//                                 modules={[Navigation]}
//                             >
//                                 <div className="button-overlay prev-button-overlay">
//                                     <GrFormPrevious />
//                                 </div>
//                                 {images && Object.keys(images).map((key, imgIndex) => (
//                                     <SwiperSlide
//                                         className="imageSlide hover:cursor-pointer" key={imgIndex}
//                                         onClick={() => handleNavigateDetails(product)}
//                                     >
//                                         <Image
//                                             layout='fill'
//                                             objectFit='cover'
//                                             objectPosition='center'
//                                             quality={50}
//                                             onLoad={() => {
//                                                 handleImageLoad()
//                                                 // console.log('loaded image')
//                                             }}
//                                             loading='lazy'
//                                             // onClick={() => handleNavigateDetails(product)}
//                                             className="hover:cursor-pointer"
//                                             src={images[key]}
//                                             alt={'product image'}
//                                         // placeholder='blur'
//                                         />
//                                     </SwiperSlide>
//                                 ))}
//                                 <div className="button-overlay next-button-overlay">
//                                     <GrFormNext />
//                                 </div>
//                             </Swiper>
//                             <p className="new">NEW</p>
//                         </div>
//                         <div className="flex flex-col h-[40px] transition-all duration-300 relative cursor-pointer">
//                             <div className='flex flex-col bg-white py-2'>
//                                 <h5 className="text-[12px] text-black">{productName && productName}</h5>
//                                 <p className="text-[10px] text-black ">${productPrice && productPrice}</p>
//                                 <p className="text-[10px] text-gray-600">
//                                     {inventoryAlert && inventoryAlert}
//                                 </p>
//                             </div>
//                             <div className="item-sizes-box">
//                                 <div>
//                                     <p className='text-[10px]'>QUICK ADD</p>
//                                     <FaPlus
//                                         onClick={() => {
//                                             if (quantity > 0) {
//                                                 handleAddItem({ product, quantity });
//                                             }
//                                         }}
//                                         className={`plus ${quantity === 0 ? 'hover:cursor-not-allowed' : ''}`}

//                                     />
//                                 </div>
//                                 <div className="separator"></div>
//                                 <div className="item-sizes">
//                                     <p
//                                         onClick={() => decrementItem({ product })}
//                                     >
//                                         <FaMinus />
//                                     </p>
//                                     <div>{quantity}</div>
//                                     <p
//                                         onClick={() => incrementItem({ product })}
//                                     >
//                                         <FaPlus />
//                                     </p>
//                                 </div>
//                             </div>
//                             <div className="item-images">
//                                 {suggestionsImages.map((image, imgIndex) => (
//                                     <img key={imgIndex} src={image} alt="image" />
//                                 ))}
//                             </div>
//                             {/* <div className="item-images">
//                             {product.image.map((image, imgIndex) => (
//                                 <img key={imgIndex} src={image} alt="image" />
//                                 ))}
//                         </div> */}
//                         </div>
//                     </div>
//                 </div>
//             </SwiperSlide>
//         </div>
//     )
// }

// export default ProductSlide
