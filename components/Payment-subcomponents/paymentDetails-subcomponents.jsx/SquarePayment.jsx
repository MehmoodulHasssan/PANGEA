import React, { useState } from 'react'
import {
    ApplePay,
    GooglePay,
    CreditCard,
    PaymentForm,
} from 'react-square-web-payments-sdk';
import { useSelector } from 'react-redux';
import { totalPrice } from '@/helpers/totalPrice';

const SquarePayment = () => {
    // const [amount, setAmount] = useState(2000);
    const items = useSelector((state) => state.itemsFn.items)
    const amount = totalPrice(items)
    console.log(amount)

    return (
        <div className='w-full'>
            <PaymentForm
                applicationId="sandbox-sq0idb-RdKESyUVCOAr3cuddt0AKw"
                cardTokenizeResponseReceived={async (token, verifiedBuyer) => {
                    console.log('Token received:', token);
                    if (token.token) {
                        const response = await fetch('/api/pay', {
                            method: 'POST',
                            headers: {
                                'Content-type': 'application/json',
                            },
                            body: JSON.stringify({
                                sourceId: token.token,
                                amount, // Payment token sent to the backend
                            }),
                        });

                        const result = await response.json();
                        console.log(result);
                    } else {
                        console.error('Token is undefined');
                    }
                }}
                createPaymentRequest={() => ({
                    countryCode: 'US',
                    currencyCode: 'USD',
                    total: {
                        amount,
                        label: 'Total',
                    },
                })}
                locationId="LC9KSAAPWHWE2"
            >
                <ApplePay />
                <GooglePay />
                <CreditCard
                    buttonProps={{
                        css: {
                            backgroundColor: '#771520',
                            fontSize: '14px',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#530f16',
                            },
                        },
                    }}
                />
            </PaymentForm>
        </div>
    );
}

export default SquarePayment
