'use client';
import React, { useState, useEffect } from 'react';
import AuthInputButton from '@/components/auth-input-subcomponents/AuthInputButton';
import CustomAuthInput from '@/components/auth-input-subcomponents/CustomAuthInput';
import WithHeaderWrapper from '@/components/WithHeaderWrapper';
import { useRouter } from 'next/navigation';
import {
  isBirthDateValid,
  isEmail,
  isEqualsToOtherValue,
  isNotEmpty,
  isPasswordValid,
} from '@/helpers/validationsFuncitons';
import { useSelector } from 'react-redux';
import ViewPasswordIco from '@/components/auth-input-subcomponents/ViewPasswordIco';
import usePost from '@/hooks/usePost';
import { useDispatch } from 'react-redux';
import { stateActions } from '@/store/slices/currentState';
import '@/app/styles/spinner.scss';
import AuthSelect from '@/components/auth-input-subcomponents/AuthSelect';
import toast from 'react-hot-toast';

const SignUpPage = ({ responseData }) => {
  const dispatch = useDispatch();
  const { isLoading, isError, isSuccess, postData } = usePost();
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const data = useSelector((state) => state.authInputFn.signUp);
  const handleNavigateSignup = () => {
    router.push('/sign-in');
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data);
    if (
      data.firstName.trim() === '' ||
      data.lastName.trim() === '' ||
      data.email.trim() === '' ||
      data.address.trim() === '' ||
      data.country.trim() === '' ||
      data.phoneNumber.trim() === '' ||
      data['state/province/district'].trim() === '' ||
      data.password.trim() === '' ||
      data.postalCode.trim() === ''
    ) {
      toast.error('Please fulfill all the required fields');
      return;
    }
    const reqData = {
      ...data,
      region: data['state/province/district'],
      'state/province/district': undefined,
      birthDate: data['birthDate (optional)'] || undefined,
    };
    console.log(reqData);
    postData({ url: '/api/signup', data: reqData });
  };

  useEffect(() => {
    if (isSuccess) {
      // dispatch(stateActions.userLogin())
      router.push('/sign-in');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      console.log(isError);
      toast.error(isError?.message || 'Something went wrong');
    }
  }, [isError]);

  return (
    <WithHeaderWrapper categories={responseData && responseData}>
      <div
        className="h-auto mt-24 max-w-[100%] flex items-center justify-center bg-white "
        // onClick={handleOutsideClick}
      >
        <div className="bg-white flex flex-col gap-3 rounded-lg w-full max-w-lg mx-4 sm:mx-0 p-6">
          <div className="flex items-center justify-center">
            <h2 className="text-xl text-black font-bold">REGISTER</h2>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <CustomAuthInput
              validFn={(value) => !isNotEmpty(value)}
              id="firstName"
              type="text"
              placeholder="first name"
              error={'First Name should not be empty'}
              childType={'signUp'}
            />

            <div className="w-full h-[1px] bg-gray-300"></div>

            <CustomAuthInput
              validFn={(value) => !isNotEmpty(value)}
              id="lastName"
              type="text"
              placeholder="last name"
              error={'Last Name should not be empty'}
              childType={'signUp'}
            />

            <div className="w-full h-[1px] bg-gray-300"></div>

            <CustomAuthInput
              validFn={(value) => !isNotEmpty(value) || !isEmail(value)}
              id="email"
              type="email"
              placeholder="liam@acme.com"
              error={'Enter a valid email'}
              childType={'signUp'}
            />

            <div className="w-full h-[1px] bg-gray-300"></div>

            <CustomAuthInput
              validFn={(value) => !isNotEmpty(value) || !isPasswordValid(value)}
              id="phoneNumber"
              type={'text'}
              placeholder="+91 9999999999"
              error={'Invalid Phone number'}
              childType={'signUp'}
            />

            <div className="w-full h-[1px] bg-gray-300"></div>
            <CustomAuthInput
              validFn={(value) => !isNotEmpty(value)}
              id="address"
              type={'text'}
              placeholder="write your address"
              error={'Should not be empty'}
              childType={'signUp'}
            />
            <div className="w-full h-[1px] bg-gray-300"></div>
            <CustomAuthInput
              validFn={(value) => !isNotEmpty(value) || !isPasswordValid(value)}
              id="state/province/district"
              type={'text'}
              placeholder="write your region"
              error={'Should not be empty'}
              childType={'signUp'}
            />

            <div className="w-full h-[1px] bg-gray-300"></div>
            <CustomAuthInput
              validFn={(value) => !isNotEmpty(value)}
              id="postalCode"
              type={'number'}
              placeholder="XXXX"
              error={'Should not be empty'}
              childType={'signUp'}
            />

            <div className="w-full h-[1px] bg-gray-300"></div>
            <AuthSelect />

            <div className="w-full h-[1px] bg-gray-300"></div>

            <CustomAuthInput
              validFn={(value) => false}
              id="companyName (optional)"
              type={'text'}
              placeholder="company"
              error={'Should not be empty'}
              childType={'signUp'}
            />
            <div className="w-full h-[1px] bg-gray-300"></div>
            <CustomAuthInput
              validFn={(value) => !isBirthDateValid(value)}
              id="birthDate (optional)"
              type={'text'}
              placeholder="YYYY-MM-DD"
              error={'Please write in this format: YYYY-MM-DD'}
              childType={'signUp'}
            />

            <div className="w-full h-[1px] bg-gray-300"></div>

            <CustomAuthInput
              validFn={(value) => !isNotEmpty(value) || !isPasswordValid(value)}
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="password"
              error={'Password must contain atleast 8 digits'}
              childType={'signUp'}
            >
              <ViewPasswordIco
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </CustomAuthInput>

            <div className="w-full h-[1px] bg-gray-300 mb-3"></div>

            <AuthInputButton>
              {isLoading ? <span className="small-loader"></span> : 'Sign Up'}
            </AuthInputButton>
          </form>
          <div className="flex justify-center text-xs">
            <span className="text-gray-500 mx-1">Already have an account?</span>
            <button
              className="text-gray-800 mx-1 hover-line"
              onClick={handleNavigateSignup}
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </WithHeaderWrapper>
  );
};

export default SignUpPage;
