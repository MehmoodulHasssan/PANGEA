import React, { useState, useEffect } from 'react';
import CustomAuthInput from './auth-input-subcomponents/CustomAuthInput';
import AuthInputButton from './auth-input-subcomponents/AuthInputButton';
import { useSelector } from 'react-redux';
import { isEmail, isNotEmpty } from '@/helpers/validationsFuncitons';
import ViewPasswordIco from './auth-input-subcomponents/ViewPasswordIco';
import usePost from '@/hooks/usePost';
import { stateActions } from '@/store/slices/currentState';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion'
import '@/app/styles/spinner.scss';

const LoginModal = ({ setIsOpen }) => {
    const dispatch = useDispatch();
    const { isLoading, isError, isSuccess, resData, postData } = usePost();
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter();
    const data = useSelector((state) => state.authInputFn.signIn);

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleOutsideClick = (e) => {
        if (e.target.classList.contains('modal-backdrop')) {
            handleClose();
        }
    };
    const handleNavigateSignup = () => {
        router.push('/sign-up');
    };
    const hanldeSubmit = (e) => {
        e.preventDefault();
        console.log(data);
        if (data.email.trim() === '' || data.password.trim() === '') {
            return;
        }
        postData({ url: '/api/login', data: data });
    };

    useEffect(() => {
        if (isSuccess) {
            setIsOpen(false);
            dispatch(stateActions.userLogin(resData?.userData));
            router.push('/payment');
        }
    }, [isSuccess]);

    useEffect(() => {
        if (isError) {
            toast.error(isError.message);
        }
    }, [isError]);
    return (
        <>
            <div
                className="fixed inset-0 bg-gray-300 bg-opacity-80 z-[200] flex items-center justify-center modal-backdrop"
                onClick={handleOutsideClick}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, y: '20%' }}
                    animate={{ opacity: 1, scale: 1, y: '0%' }}
                    transition={{ duration: 0.5 }}
                    exit={{ opacity: 0, scale: 0.5, y: '20%' }}
                    className="bg-white flex flex-col border-gray-400 border-2 gap-3 rounded-xl shadow-lg w-full max-w-lg mx-4 sm:mx-0 p-6">
                    <div className='flex flex-col'>
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg text-black font-bold"></h2>
                            <button
                                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                                onClick={handleClose}
                            >
                                <svg
                                    className="h-6 w-6"
                                    fill="none"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        <p className="text-gray-700 mt-2 text-lg text-center">SIGN IN FIRST TO PROCEED TO CHECKOUT</p>

                    </div>
                    <div className='w-full h-[1px] bg-gray-300'></div>
                    <form onSubmit={hanldeSubmit} className="flex flex-col gap-2">
                        <CustomAuthInput
                            validFn={(value) => !isNotEmpty(value) || !isEmail(value)}
                            id='email'
                            type="email"
                            placeholder='liam@acme.com'
                            error={'Enter a valid email'}
                            childType={'signIn'}
                        />
                        <div className='w-full h-[1px] bg-gray-300'></div>

                        <CustomAuthInput
                            validFn={() => false}
                            id="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="password"
                            error={'Password must contain atleast 8 digits'}
                            childType={'signIn'}
                        >
                            <ViewPasswordIco
                                showPassword={showPassword}
                                setShowPassword={setShowPassword}
                            />
                        </CustomAuthInput>
                        <div className='w-full h-[1px] bg-gray-300'></div>
                        <AuthInputButton>
                            {isLoading ? <span className="small-loader"></span> : 'Sign In'}
                        </AuthInputButton>
                    </form>
                    <div className="flex justify-center text-sm mt-2">
                        <span className="text-gray-500 mb-1 font-gt-america font-[200] mx-1">
                            New to Pang3a UK?
                        </span>
                        <button
                            className="text-gray-800 mx-1 hover-line"
                            onClick={handleNavigateSignup}
                        >
                            Create An Account
                        </button>
                    </div>
                </motion.div>
            </div>
        </>
    );
};

export default LoginModal;