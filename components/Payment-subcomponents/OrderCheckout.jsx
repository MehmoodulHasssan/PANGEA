import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import '@/app/payment/payment.css'
import isymbol from '../../assets/i_symbol.png';
import { totalPrice } from '@/helpers/totalPrice';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

const OrderCheckout = ({ onApply }) => {
    const orderItems = useSelector((state) => state.itemsFn.items);
    const [order, setOrder] = useState([])
    const router = useRouter()

    useEffect(() => {
        if (orderItems.length === 0) {
            return router.push('/shop')
        }
        setOrder(orderItems)
    }, [orderItems])
    // console.log(order)
    return (
        // <div className="w-full lg:w-1/2">
        <div className="checkout-main w-[604px] ">
            <div className="p-[38px] checkout-inside">
                {/* Product Summary Section */}
                {order.map((item) => (
                    <div key={item.product.id} className="flex my-4 space-x-4 items-center ">
                        {/* Product Image */}
                        <div className="buy-img-div w-16"
                            style={{ aspectRatio: '4/5' }}
                        >

                            {/* Add your image here */}
                            <Image
                                src={item.product?.item_data?.ecom_image_uris ? item.product?.item_data?.ecom_image_uris[0] : ''}
                                alt="Product Image"
                                className=" rounded-md"
                                layout='fill'
                                objectFit='cover'
                            />
                            <div className="num-circle">
                                <span>{item.quantity}</span>
                            </div>
                        </div>
                        {/* Product Details */}
                        <div className="flex-1">
                            <p className="text-sm font-normal">
                                {item.product?.item_data?.name}
                            </p>
                            {/* <span className="text-gray-500 font-light text-xs">M</span> */}
                        </div>
                        {/* Product Price */}
                        <div className="text-sm font-normal">${((item.product?.item_data?.variations[0]?.item_variation_data.price_money.amount) / 100).toFixed(2)}</div>
                    </div>
                ))}

                {/* Rewards Reminder Section */}
                <div className="dont-miss flex items-center space-x-2 p-4 bg-gray-100 rounded-md mt-4">
                    <div className="text-gray-600 flex flex-wrap justify-center items-center gap-3">
                        <Image src={isymbol} alt="isymbol"></Image>
                        <span className="text-sm">
                            Don&apos;t miss out!{' '}
                            <a href="#" className="text-blue-600 link">
                                Log in
                            </a>{' '}
                            to earn and redeem rewards
                        </span>
                    </div>
                </div>

                {/* Discount Code Section */}
                <form action={onApply} className="flex gap-3 mt-4">
                    <input
                        type="text"
                        name='discount'
                        placeholder="Discount code or gift card"
                        className="border border-gray-300 p-2 rounded-md w-full discount-input"
                    />
                    <button
                        className="text-sm px-4 rounded-md apply-btn"
                        type='submit'
                    >
                        APPLY
                    </button>
                </form>

                {/* Subtotal Section */}
                <div className="flex justify-between items-center mt-4">
                    <span className="text-sm">Subtotal</span>
                    <span className="text-sm">${totalPrice(order)}</span>
                </div>

                {/* Shipping Section */}
                <div className="flex justify-between items-center mt-2">
                    <span className="text-sm">Shipping</span>
                    <span className="text-xs text-gray-400">
                        Enter shipping address
                    </span>
                </div>
                {/* Total Section */}
                <div className="flex justify-between items-center mt-4 ">
                    <span className="font-semibold text-lg">Total</span>
                    <div className="text-lg font-semibold text-gray-900 flex items-center">
                        <span className="text-xs font-normal text-gray-500 mr-2">
                            GBP
                        </span>
                        $36.00
                    </div>
                </div>

                {/* Tax Information Section */}
                <div className="mt-2 text-xs text-gray-500">
                    Including $6.00 in taxes
                </div>
            </div>
        </div>
        // </div>
    )
}

export default OrderCheckout
