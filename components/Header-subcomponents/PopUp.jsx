import React, { useState } from 'react'
import { AnimatePresence, easeInOut, motion } from 'framer-motion';
import categoryDataToDisplay from '@/helpers/categoryDataToDisplay';
import { categoriesToPairs } from '@/helpers/categoriesToPairs';



const PopUp = ({ showPopUp, handleClose, categories }) => {
    const displayCategories = categoryDataToDisplay(categories);
    // console.log(displayCategories)
    const categoriesArray = (categoriesToPairs(displayCategories))
    // const displayCategories = Array.from({ length: 5 }, (_, index) => index + 1);
    // const { leftCategories, rightCategories } = categoriesToPairs(displayCategories);

    const handleDragEnd = (e, info) => {
        if (info.offset.y > 70) {
            handleClose();
        }
    }
    return (<>
        {showPopUp && <div className='backdrop' onClick={handleClose}></div>}
        <AnimatePresence>
            {showPopUp &&
                <motion.div
                    className={`popUp-container`}
                    drag="y" // Enable vertical dragging
                    dragConstraints={{ top: 0, bottom: 0 }} // Set constraints for dragging
                    dragElastic={{
                        top: 0,
                        bottom: 1
                    }}
                    onDragEnd={handleDragEnd}
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "100%" }}
                    transition={{ duration: 0.3, ease: easeInOut }}
                >
                    <div
                        className="swipe-bar"
                    // onClick={() => setIsOpen(!isOpen)}
                    ></div>
                    <div className="sub-container">
                        {categoriesArray?.map((categoryPair, index) => (
                            <div className="row">
                                <>
                                    <div className="left-col">
                                        <div key={categoryPair[0].category.id} className="column">
                                            <p className="popUp-first">{categoryPair[0].category.name}</p>
                                            {categoryPair[0].subCategories?.length > 0 && categoryPair[0].subCategories?.map((subcategory, index) => (
                                                <p key={subcategory.id} className="pop-Up-header-links">{subcategory.name}</p>
                                            ))}
                                            {categoryPair[0].subCategories?.length === 0 && <p className="pop-Up-header-links">
                                                {categoryPair[0].category.name}
                                            </p>}
                                        </div>
                                    </div>
                                    <div className="right-col">
                                        {categoryPair.length > 1 &&
                                            <div key={categoryPair[1].category.id} className="column">
                                                <p className="popUp-first">{categoryPair[1].category.name}</p>
                                                {categoryPair[1].subCategories?.length > 0 && categoryPair[1].subCategories?.map((subcategory, index) => (
                                                    <p key={subcategory.id} className="pop-Up-header-links">{subcategory.name}</p>
                                                ))}
                                                {categoryPair[1].subCategories?.length === 0 && <p className="pop-Up-header-links">
                                                    {categoryPair[1].category.name}
                                                </p>}
                                            </div>
                                        }
                                    </div>
                                </>
                            </div>
                        ))}
                    </div>
                </motion.div>}
        </AnimatePresence>
    </>
    )
}

export default PopUp
