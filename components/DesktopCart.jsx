'use client';
import '@/app/styles/main.scss';
import { useEffect, useRef, useState } from 'react';
import { modalActions } from '@/store/slices/openModel';
import { useDispatch } from 'react-redux';
import { motion } from "framer-motion"
import ExtraItems from './Cart-subcomponents/ExtraItems';
import OrdersManagementBox from './Cart-subcomponents/OrdersManagementBox';
import { itemsActions } from '@/store/slices/cartItems';
import { useSelector } from 'react-redux';
import usePost from '@/hooks/usePost';

const recommendedQuery = {
    term1: "Nuro Disposable 3ml - Broad Spec",
    term2: "Candy 5ml"
}
const CACHE_EXPIRATION = 30 * 60 * 1000; // 1/2 hour in milliseconds
const DesktopCart = ({ isOpen }) => {
    const [recommended, setRecommended] = useState(true);
    const [dataToDisplay, setDataToDisplay] = useState([]);
    const { resData, isLoading, isError, postData } = usePost()


    useEffect(() => {
        if (resData && recommended) {
            setDataToDisplay(resData)

            window.localStorage.setItem('recommendedItems', JSON.stringify(resData))
            window.localStorage.setItem('recommendedItems_time', new Date().getTime())
            // const reversedDataArray = dataArray.reverse();
            // splicedDataArray = reversedDataArray.splice(0, 30) || []
        }
        // else {
        //     window.localStorage.setItem('recentlyViewed', JSON.stringify(resData))
        //     window.localStorage.setItem('recentlyViewed_time', new Date().getTime())
        // }
    }, [resData])
    //process the fetched array
    const addedItems = useSelector((state) => state.itemsFn.items)
    const dispatch = useDispatch()

    const closeDiv = (e) => {
        if (e.target.id === 'modal-background') {
            dispatch(modalActions.closeModal())
        }
    };
    const handleRemoveItem = (item) => {
        dispatch(itemsActions.removeItem(item))
    }
    const handleDecrement = (item) => {
        if (item.quantity === 1) {
            handleRemoveItem(item)
            return
        }
        dispatch(itemsActions.decrement(item))
    }
    const handleIncrement = (item) => {
        dispatch(itemsActions.increment(item))
    }

    const handleAddItem = ({ product, quantity = 1 }) => {
        dispatch(itemsActions.addItem({ product, quantity }))
    };

    useEffect(() => {
        const recommendedCached = localStorage.getItem('recommendedItems');
        const recentlyViewedCached = localStorage.getItem('recentlyViewed');
        const recommendedCachedTime = localStorage.getItem('recommendedItems_time');
        // const recentlyViewedCachedTime = localStorage.getItem('recentlyViewed_time');

        const now = new Date().getTime();

        if (isOpen) {
            if (recommended) {
                if (recommendedCached && now - recommendedCachedTime < CACHE_EXPIRATION) {
                    // If cached data is available, use it
                    setDataToDisplay(JSON.parse(recommendedCached));
                } else {
                    // If no cache, fetch the data from the backend
                    postData({ url: '/api/filterItems', data: recommendedQuery });
                }
            } else {
                if (!recommended) {
                    console.log('not recommended')
                    if (recentlyViewedCached) {
                        console.log(recentlyViewedCached)
                        // If cached data is available, use it
                        setDataToDisplay(JSON.parse(recentlyViewedCached));
                    } else {
                        // If no cache, fetch the data from the backend 
                        setDataToDisplay([])
                    }
                }
            }
        }
    }, [isOpen, recommended]);

    // console.log(isLoading)

    return (
        <motion.div
            initial={{ y: "100%", opacity: 0 }}  // Start from below the screen
            animate={{ y: isOpen ? "0%" : "100%", opacity: isOpen ? 1 : 0 }} // Slide up when open, slide down when closing
            exit={{ y: "100%", opacity: 0 }} // Exit with slide down and fade out
            transition={{ duration: 0.3 }} // Animation duration
            id="modal-background"
            className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-[100]"
            onClick={closeDiv}
        >
            <div className='main-card-res w-screen h-[90vh]  md:flex-row flex justify-between bg-white text-black '>
                <ExtraItems
                    addItem={handleAddItem}
                    products={dataToDisplay}
                    recommended={recommended}
                    setRecommended={setRecommended}
                    isLoading={isLoading}
                    isError={isError}
                />
                <OrdersManagementBox
                    isOpen={isOpen}
                    addedItems={addedItems}
                    removeItem={handleRemoveItem}
                    onDecrement={handleDecrement}
                    onIncrement={handleIncrement}
                />
            </div>
            {/* <Toaster position='bottom-center' /> */}
        </motion.div>
    )
}

export default DesktopCart