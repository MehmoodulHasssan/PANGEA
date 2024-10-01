import React, { useEffect, useState } from 'react'
import { isNotEmpty } from '@/helpers/validationsFuncitons'
import useInput from '@/hooks/useInput'
import { useDispatch } from 'react-redux'
import { paymentActions } from '@/store/slices/paymentInputs'
import { useSelector } from 'react-redux'

const InputElement = ({ validFn, type, id, error, childType }) => {
    const state = useSelector((state) => state.stateFn)
    const [isLogin, setIsLogin] = useState(false)
    const dispatch = useDispatch()
    const [filledValue, setFilledValue] = useState()
    const { setValueInBillingAddress, setValueInCreditCardDetails, setValueInDeliveryDetails, setValueInContact } = paymentActions
    const { enteredValue, setEnteredValue, handleChange, handleBlur, hasError } = useInput('', (value) => validFn(value))

    useEffect(() => {
        childType === 'delivery' && dispatch(setValueInDeliveryDetails({ key: id, value: enteredValue }))
        childType === 'billing' && dispatch(setValueInBillingAddress({ key: id, value: enteredValue }))
        childType === 'creditCard' && dispatch(setValueInCreditCardDetails({ key: id, value: enteredValue }))
        childType === 'contact' && dispatch(setValueInContact({ key: id, value: enteredValue }))
    }, [enteredValue])

    useEffect(() => {

        if (isLogin) {
            switch (id) {
                case 'email':
                    setEnteredValue(state.userData.email || '')
                    break
                case 'password':
                    setEnteredValue(state.userData.password || '')
                    break
                case 'firstName':
                    setEnteredValue(state.userData.firstName || '')
                    break
                case 'lastName':
                    setEnteredValue(state.userData.lastName || '')
                    break
                case 'address':
                    setEnteredValue(state.userData.address || '')
                    break
                case 'phone':
                    setEnteredValue(state.userData.phoneNumber || '')
                    break
                case 'city':
                    setEnteredValue(state.userData.city || '')
                    break
                case 'postalCode':
                    setEnteredValue(state.userData.postalCode || '')
                    break
                case 'company':
                    setEnteredValue(state.userData.companyName || '')
                default: ''
                    break
            }
        }
    }, [isLogin])

    useEffect(() => {
        if (state.currentState === 'userLogin') {
            setIsLogin(true)
        }
    }, [])
    console.log(state)
    // console.log(isLogin)
    return (
        <>
            {isLogin ?
                <div className="relative flex flex-col space-y-2 w-1/2 extrasmall:w-full extrasmall:mb-4">
                    <input
                        type={type}
                        id={id} // Set a unique id or keep it as per your requirement
                        name={id}
                        value={enteredValue} // Pre-filled email value
                        readOnly={id === 'email' || id === 'firstName' || id === 'lastName'} // Make input unchangeable
                        onChange={handleChange}
                        className={`font-gt-america font-[600] border placeholder:text-gray-500 text-gray-800 border-gray-300 bg-gray-200 rounded-md transition-all duration-200 ease-in-out pt-[27px] px-[10px] pb-1`}
                    // placeholder="Email"
                    />
                    <label
                        htmlFor={id}
                        className="absolute font-gt-america font-[200] left-3 top-1 text-sm text-gray-600 pointer-events-none transition-all duration-200 ease-in-out"
                    >
                        {id.charAt(0).toUpperCase() + id.slice(1)}
                    </label>
                    {/* No error message here as `hasError` is not relevant for a read-only field */}
                </div> :
                <div className="relative flex flex-col space-y-2 w-1/2 extrasmall:w-full extrasmall:mb-4">
                    <input
                        type={type}
                        id={id}
                        name={id}
                        value={enteredValue}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`border placeholder:text-gray-500 font-gt-america font-[600] text-gray-800 ${hasError ? 'border-red-500' : 'border-gray-300'} rounded-md transition-all duration-200 ease-in-out ${enteredValue ? "pt-[27px] px-[10px] pb-1" : "in-p"}`}
                        placeholder={!enteredValue ? `${id.charAt(0).toUpperCase() + id.slice(1)}` : ""}
                    />
                    {enteredValue && (
                        <label
                            htmlFor={id}
                            className="absolute font-gt-america font-[200] left-3 top-1 text-sm text-gray-600 pointer-events-none transition-all duration-200 ease-in-out"
                        >
                            {id.charAt(0).toUpperCase() + id.slice(1)}
                        </label>
                    )}
                    {hasError && <p className="text-sm text-red-500">{error}</p>}
                </div>
            }
        </>
    )
}

export default InputElement
