'use client';

export const dynamic = 'force-dynamic';

import React from 'react';
import './payment.css';
import NoHeaderWrapper from '@/components/NoHeaderWrapper';
import PaymentDetails from '@/components/Payment-subcomponents/PaymentDetails';
import OrderCheckout from '@/components/Payment-subcomponents/OrderCheckout';
import { useSelector } from 'react-redux';
import { RadioProvider } from '@/store/paymentTypeContext';
import { FaAngleDown } from 'react-icons/fa6';
const payment = () => {
  const paymentDetails = useSelector((state) => state.paymentFn);

  const hanldeApply = (formData) => {
    const data = Object.fromEntries(formData.entries());
    // console.log(data);
  };

  return (
    <NoHeaderWrapper>
      <RadioProvider>
        <div className="bg-white max-w-[100%]">
          {/* <div className="flex flex-col w-full h-full bg-white"> */}
          <div className="flex bg-white xl:flex-nowrap flex-wrap justify-start ms-4 sm:me-9 lg:ms-24 extrasmall:ms-0 ">
            <PaymentDetails />
            <OrderCheckout onApply={hanldeApply} />
          </div>
        </div>
      </RadioProvider>
    </NoHeaderWrapper>
  );
};

export default payment;
