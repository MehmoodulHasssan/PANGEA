'use client'
import React, { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useSelector } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
import Cart from './Cart'
import MobileCart from './MobileCart'
import { setDeviceType } from '@/store/currentDevice'
import { useDispatch } from 'react-redux'


const WithHeaderWrapper = ({ children }) => {
    // const isMobile = () => window.innerWidth <= 768;
    // const [isMobileDevice, setIsMobileDevice] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const handleResize = () => {
            dispatch(setDeviceType());
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Set device type on initial load

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [dispatch]);
    // useEffect(() => {
    //     setIsMobileDevice(isMobile());
    //     const handleResize = () => setIsMobileDevice(isMobile());
    //     window.addEventListener('resize', handleResize);
    //     return () => window.removeEventListener('resize', handleResize);
    // }, []);
    const isOpen = useSelector((state) => state.modalFn);
    const device = useSelector((state) => state.deviceFn.deviceType);
    console.log(device)
    return (
        <>
            <Header />
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <AnimatePresence>
                        {isOpen && (
                            device === 'mobile' || device === 'tablet' ? (
                                <MobileCart isOpen={isOpen} />
                            ) : (
                                <Cart isOpen={isOpen} />
                            )
                        )}
                    </AnimatePresence>
                    {children}
                </div>
            </div>
            <Footer />
        </>
    )
}

export default WithHeaderWrapper
