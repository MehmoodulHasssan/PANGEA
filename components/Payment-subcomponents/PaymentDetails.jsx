import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import EmailSection from "./paymentDetails-subcomponents.jsx/EmailSection";
import DeliverySection from "./paymentDetails-subcomponents.jsx/DeliverySection";
import "@/app/payment/payment.css";
import Heading from "./paymentDetails-subcomponents.jsx/Heading";
import pang3a from "@assets/Pang3aBlack.png";
import CheckBox from "./paymentDetails-subcomponents.jsx/CheckBox";
import FooterLinks from "./paymentDetails-subcomponents.jsx/FooterLinks";
import { useSelector, useDispatch } from 'react-redux'
import { paymentActions } from '@/store/slices/paymentInputs'
import SquarePayment from "./paymentDetails-subcomponents.jsx/SquarePayment";
import CheckoutDropDown from "./paymentDetails-subcomponents.jsx/CheckoutDropDown";
import { useRouter } from "next/navigation";

const PaymentDetails = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false)
  const [isPaymentSubmitting, setIsPaymentSubmitting] = useState(false)
  const state = useSelector((state) => state.stateFn);

  useEffect(() => {
    if (state.currentState === 'userLogin') {
      console.log(state)
      setIsLogin(true);
      dispatch(paymentActions.setValueInContact('email', state.userEmail))
    } else {
      if (state.currentState === 'loggedOut') {
        setIsLogin(false)
      }
    }

  }, [state])
  return (
    // <div className="w-full lg:w-1/2">
    <div className="max-w-[710px] extrasmall:w-screen flex flex-wrap justify-center lg:justify-end ">
      {isPaymentSubmitting &&
        <div className="fixed h-screen w-screen top-0 inset-0 z-50 flex items-center justify-center bg-black gap-16 bg-opacity-90 text-white">
          <div class="loader"></div>
          <div className="text-2xl">Processing Payment...</div>
        </div>
      }
      <div className=" lg:p-[38px]  payment-insde  pe-12 sm:ps-0 sm:me-0 extrasmall:w-full extrasmall:pe-0 extrasmall:p-4 extrasmall:pr-4 sm:p-4">
        <div className="w-[150px] h-[22px]  mb-[2.6rem]">
          <Image
            onClick={() => router.push('/')}
            className="w-[350px] object-contain hover:cursor-pointer"
            src={pang3a}
            alt="Logo Here"
          />
        </div>

        {/* order check out dropdown */}
        <CheckoutDropDown />

        <div className="flex justify-between  items-center mt-5">
          <Heading>CONTACT</Heading>
          <div>
            {isLogin ?
              <p
                className="underline text-[13px] text-[#707070]"
              >
                Logged in
              </p> :
              <Link
                href="/sign-in"
                className="underline text-[13px] text-[#707070]"
              >
                Log in
              </Link>
            }

          </div>
        </div>

        <div
          className="flex flex-col sm:max-w-[650px] md:max-w-[700px] lg:max-w-[800px] "
        >
          <EmailSection isLogin={isLogin} email={state.userEmail} />

          <div className="mt-8">
            <Heading>DELIVERY</Heading>
            <DeliverySection
              childType={"delivery"}
            />
          </div>

          {/* <div className="mt-8">
            <Heading>SHIPPING</Heading>
            <div className="bg-gray-100 text-gray-600 p-4 rounded-md mt-2 text-sm">
              Enter your shipping address to view available shipping methods.
            </div>
          </div> */}

          <div className="mt-8">
            <Heading>REMEMBER ME</Heading>
            <CheckBox value={"Remember me"} childType={'contact'} />
          </div>

          {/* Payment Section */}
          <div className="mt-8">
            <Heading>PAYMENT</Heading>
            <div className="text-sm text-gray-600 -mt-2">
              All transactions are secure and encrypted.
            </div>
            <div className="w-full h-6"></div>
            <SquarePayment loading={isPaymentSubmitting} setLoading={setIsPaymentSubmitting} />
          </div>
        </div>
        {/* Footer Links Section */}
        <FooterLinks />
      </div>

    </div>
    // </div>
  );
};

export default PaymentDetails;
