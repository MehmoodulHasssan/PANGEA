import React from 'react'
import Link from 'next/link'

const MiddleContainer = () => {
    return (
        <div class="container">
            <div
                class="item1"
                style={{
                    backgroundImage: `url(https://alphalete.uk/cdn/shop/files/4U8A0538.jpg?crop=center&v=1714233619&width=1400)`,
                    backgroundSize: 'cover',
                }}
            >
                <div className="banner-info">
                    <h1>New Arrivals</h1>
                    <p>Amplify Reimagined</p>
                    <button className="button">
                        <Link href="/shop">Shop Women</Link>
                    </button>
                    <button className="button">
                        <Link href="/shop">Shop Men</Link>
                    </button>
                </div>
            </div>
            <div
                class="item2"
                style={{
                    backgroundImage: `url(https://alphalete.uk/cdn/shop/files/web_2mensshorts-graphic.jpg?crop=center&v=1714233659&width=1400)`,
                    backgroundSize: 'cover',
                }}
            >
                <div className="banner-info">
                    <h1>New Arrivals</h1>
                    <p>Amplify Reimagined</p>
                    <button className="button">
                        <Link href="/shop">Shop Women</Link>
                    </button>
                    <button className="button">
                        <Link href="/shop">Shop Men</Link>
                    </button>
                </div>
            </div>
            <div
                class="item3"
                style={{
                    backgroundImage: `url(https://alphalete.uk/cdn/shop/files/DSC06397.jpg?crop=center&v=1714233714&width=1400)`,
                    backgroundSize: 'cover',
                }}
            >
                <div className="banner-info">
                    <h1>New Arrivals</h1>
                    <p>Amplify Reimagined</p>
                    <button className="button">
                        <Link href="/shop">Shop Women</Link>
                    </button>
                    <button className="button">
                        <Link href="/shop">Shop Men</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default MiddleContainer
