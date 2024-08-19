'use client'
import React, { useState, useEffect } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useSelector } from 'react-redux'
import { AnimatePresence } from 'framer-motion'
import Cart from './Cart'
import MobileCart from './MobileCart'


const WithHeaderWrapper = ({ children }) => {
    const isMobile = () => window.innerWidth <= 768;
    const [isMobileDevice, setIsMobileDevice] = useState(false);

    useEffect(() => {
        setIsMobileDevice(isMobile());
        const handleResize = () => setIsMobileDevice(isMobile());
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const isOpen = useSelector((state) => state.modalFn);
    return (
        <>
            <Header />
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <AnimatePresence>
                        {isOpen && (
                            isMobileDevice ? (
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
