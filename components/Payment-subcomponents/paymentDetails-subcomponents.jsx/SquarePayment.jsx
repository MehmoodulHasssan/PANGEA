import React, { useRef, useState, useEffect } from 'react';
import {
    ApplePay,
    GooglePay,
    CreditCard,
    PaymentForm,
} from 'react-square-web-payments-sdk';
import { useSelector } from 'react-redux';
import { totalPrice } from '@/helpers/totalPrice';
import fulfilledCredentials from '@/helpers/fulfilledCredentials';
import '@/app/styles/spinner.scss';
import SuccessModal from '@/components/SuccessModal';
import axios from 'axios';
import toast from 'react-hot-toast';

const SquarePayment = ({ loading, setLoading }) => {
    const successModalRef = useRef(null)
    const items = useSelector((state) => state.itemsFn.items);
    const credentials = useSelector((state) => state.paymentFn);
    // console.log(credentials)
    const amount = totalPrice(items);
    // const [loading, setLoading] = useState(false); 
    const [isPaymentSuccess, setIsPaymentSuccess] = useState(null); // For success or error message

    const handlePayment = async (token) => {
        const spreadedCredentials = { ...credentials.deliveryDetails, ...credentials.contact };
        console.log(spreadedCredentials)
        if (!fulfilledCredentials(spreadedCredentials)) {
            alert('Please fulfill all the required fields before proceeding...')
            return
        }
        setLoading(true); // Show loader when request is sent
        try {
            const response = await axios.post('/api/place-order', {
                sourceId: token.token,
                amount,
                customerCredentials: spreadedCredentials,
                items,
            });
            console.log(response.data)
            setIsPaymentSuccess(true);
        } catch (error) {
            console.error('Error processing payment:', { error: error.response?.data || error.message });
            setIsPaymentSuccess(false)
            toast.error(error.response?.data || error.message)
            // setIsPaymentSuccess('Payment failed: Network error');
        } finally {
            setLoading(false); // Stop loader
        }
    };

    useEffect(() => {
        if (isPaymentSuccess) {
            successModalRef.current.showModal();
        }
    }, [isPaymentSuccess]);

    return (
        <div className='w-full'>
            <PaymentForm
                applicationId="sandbox-sq0idb-zczqtW5LpSc8wvEKTYVLNg"
                cardTokenizeResponseReceived={(token, verifiedBuyer) => {
                    if (token.token) {
                        handlePayment(token); // Call function to handle payment
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
                <div className="h-2" />
                <CreditCard
                    buttonProps={{
                        css: {
                            backgroundColor: 'black',
                            fontSize: '14px',
                            color: '#fff',
                            '&:hover': {
                                backgroundColor: '#303030',
                            },
                        },
                    }}
                />
            </PaymentForm>
            <SuccessModal ref={successModalRef} />
        </div>
    );
};

export default SquarePayment;
