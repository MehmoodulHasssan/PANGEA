'use client'
import WithHeaderWrapper from '@/components/WithHeaderWrapper'
import ProductSlide from '@/components/ProductDetails-subcomponents/ProductSlide';
import { DUMMY_ITEMS, vapeProducts } from '@/utils';
import '@/app/styles/main.scss';
import AnimeButtons from '@/components/shop-subcomponents/SideBarAnimatedButtons';
import { useEffect, useState } from 'react';
import { itemsActions } from '@/store/cartItems';
import { useDispatch } from 'react-redux';
import toast, { Toaster } from 'react-hot-toast';
import CustomToast from '@/components/CustomToast';
import Image from 'next/image';
import MobilePopUpBtns from '@/components/shop-subcomponents/MobilePopUpBtns';
import { useRef } from 'react';
import './shop.css'
import ShopPopUp from '@/components/shop-subcomponents/ShopPopUp';


const slides = Array.from({ length: 15 }, (_, index) => index + 1)
const ShopPage = () => {
    const scrolledDiv = useRef(null)
    const [showPopUp, setShowPopUp] = useState(false)
    // const [isScrolled, setIsScrolled] = useState(false)
    const [isStyles, setStyles] = useState(true)
    const dispatch = useDispatch()

    // useEffect(() => {
    //     const totalScroll = document.documentElement.scrollHeight

    //     const addThreshold = 300; // Scroll position at or above which the class is added
    //     // const removeThreshold = 315; // Scroll position below which the class is removed

    //     const footerStart = 322//667.5

    //     const checkInitialScroll = () => {
    //         const scrollY = window.scrollY;
    //         console.log(window.scrollY, footerStart)

    //         // Add class if the initial scroll position is beyond addThreshold
    //         // if (scrollY >= addThreshold + 10) {
    //         //     return
    //         // }

    //         if (scrollY >= addThreshold && scrollY < footerStart) {
    //             setIsScrolled(true);
    //         } else if (scrollY < addThreshold) {
    //             setIsScrolled(false);
    //         } else if (scrollY >= footerStart) {
    //             setIsScrolled(false);
    //         }
    //     };

    //     window.addEventListener("scroll", checkInitialScroll);

    //     // Initial check to handle cases where the initial scroll position is beyond addThreshold
    //     checkInitialScroll();

    //     return () => {
    //         window.removeEventListener("scroll", checkInitialScroll);
    //     };
    // }, []);


    const notify = ({ product, quantity, adding, removing }) => {
        toast.custom((t) => (
            <CustomToast
                product={product}
                quantity={quantity}
                adding={adding}
                removing={removing}
            />
        ), {
            duration: 2000
        }
        )
    };

    const addItem = ({ product, quantity = 1 }) => {
        const item = DUMMY_ITEMS.find((item) => item.id === product.id)
        console.log(item)
        dispatch(itemsActions.addItem({ product: item, quantity }))
        notify({ product: item, quantity, adding: true, removing: false })
    }

    function isFullyScrolled(div) {
        return div.scrollTop + div.clientHeight >= div.scrollHeight;
    }


    // Usage example
    // useEffect(() => {
    //     scrolledDiv.current.addEventListener('scroll', () => {
    //         if (isFullyScrolled(scrolledDiv.current)) {
    //             console.log('The div is fully scrolled!');
    //             setIsScrolled(false);
    //         }
    //     });

    // }, [scrolledDiv.current]);

    // console.log(isScrolled)


    return (
        <WithHeaderWrapper>
            <Toaster position='bottom-center' />
            <MobilePopUpBtns
                isStyles={isStyles}
                setStyles={setStyles}
                setShowPopUp={setShowPopUp}
            />
            <ShopPopUp
                showPopUp={showPopUp}
                setShowPopUp={setShowPopUp}
                setStyles={setStyles}
                isStyles={isStyles}
            />
            <div className='w-full bg-white'>
                <div className='flex bg-white px-8 w-full'>
                    <div className='relative w-1/5 left-side-product-page  bg-white py-[29px] pr-4 overflow-hidden'>
                        <div className={`bg-white h-full stikcy top-[81px]`}>
                            <div className='flex flex-col'>
                                <p className='text-[12px] text-gray-700'>Trending</p>
                                <h1 className='text-[20px] text-gray-700'>ALL PRODUCTS</h1>
                                <p className='text-[12px] text-gray-700'>230 Products</p>
                                <div className="border border-gray-500 rounded-full w-fit mt-2 p-1 flex justify-between items-center">
                                    <span
                                        className={`inline-block text-gray-800 text-[10px] rounded-full px-3 py-1 hover:cursor-pointer ${isStyles ? 'bg-gray-300' : ''}`}
                                        onClick={() => setStyles(true)}
                                    >
                                        Styles
                                    </span>
                                    <span
                                        className={`inline-block text-gray-800 text-[10px] rounded-full px-3 py-1 hover:cursor-pointer ${!isStyles ? 'bg-gray-300' : ''}`}
                                        onClick={() => setStyles(false)}
                                    >
                                        Flavors
                                    </span>
                                </div>
                                <div className='w-full h-[1px] bg-gray-300 mt-4'></div>
                                <input
                                    type="text"
                                    placeholder='Search for categories'
                                    className='w-full h-4 my-[16px] text-gray-800 focus:outline-none placeholder:text-gray-400'
                                />
                                <div className='w-full h-[1px] bg-gray-300 mb-[8px]'></div>
                            </div>
                            <div className='flex  flex-col overflow-scroll scrollbar-hide'>
                                {vapeProducts.map((product, index) => (
                                    <AnimeButtons
                                        key={index}
                                        name={product.productName}
                                        options={product.options}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div
                        ref={scrolledDiv}
                        className={`w-4/5 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-6 h-[555px] overflow-scroll scrollbar-hide`}>
                        {/* className={`w-4/5 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  gap-6 h-[555px] ${isScrolled ? 'overflow-scroll' : 'overflow-hidden'} scrollbar-hide`}> */}
                        {/* <div className="slider-buttons "> */}
                        {DUMMY_ITEMS.map((product, index) => (
                            <div className="sliders">
                                <ProductSlide
                                    key={index}
                                    product={product}
                                    addItem={addItem}
                                    bigItemClass={true}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>


        </WithHeaderWrapper>
    )
}

export default ShopPage


{/* {<div className='relative w-full h-[50vh] overflow-hidden'>
<Image
className='absolute'
src="https://alphalete.uk/cdn/shop/collections/m_sweater_b79c3787-15cf-4367-9f68-e29eb75bcf56_2500x1050_crop_center.jpg?v=1679098832"
alt="image"
layout="fill"
objectFit="cover"
/>
</div>} */}
{/* <div className={`flex ${isScrolled ? 'fixed top-[52px]' : ''} z-50 bg-white px-8 w-full`}> */ }
