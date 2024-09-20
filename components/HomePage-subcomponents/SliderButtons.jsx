import React from 'react'

const SliderButtons = ({ toggle, setToggle, texts }) => {
    return (
        <div className="slider-buttons">
            <span
                onClick={() => setToggle(true)}
                className={toggle ? 'bg-[#d8d7d7]' : ''}
            >
                {texts[0]}
            </span>
            <span
                onClick={() => setToggle(false)}
                className={!toggle ? 'bg-[#d8d7d7]' : ''}
            >
                {texts[1]}
            </span>
        </div>
    )
}

export default SliderButtons
