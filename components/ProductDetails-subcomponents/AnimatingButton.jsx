import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { FaPlus } from 'react-icons/fa6';

const AnimatingButtons = ({ name, detail }) => {
    const controls = useAnimation();
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
        controls.start(isOpen ? "collapsed" : "open");
    };

    const listItemsVariants = {
        open: { opacity: 1, height: "auto", transition: { duration: 0.5 } },
        collapsed: { opacity: 0, height: 0, transition: { duration: 0.5 } },
    };

    const addSignVariants = {
        open: { rotate: 225, transition: { duration: 0.5 } },
        collapsed: { rotate: 0, transition: { duration: 0.5 } }
    };

    return (
        <>
            <div
                className="flex justify-between items-center font-gt-america-bold text-[13px] text-gray-800 cursor-pointer"
                onClick={toggleOpen}
            >
                <span>{name}</span>
                <motion.span
                    className='text-sm'
                    animate={controls}
                    variants={addSignVariants}
                >
                    <FaPlus />
                </motion.span>
            </div>
            <motion.li
                className="text-[12px] font-gt-america-medium block overflow-hidden"
                initial="collapsed"
                animate={controls}
                variants={listItemsVariants}
            >
                {detail}
            </motion.li>
        </>
    );
};

export default AnimatingButtons;
