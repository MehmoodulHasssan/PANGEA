import React, { useEffect } from 'react'
import useInput from '@/hooks/useInput'
import { useDispatch } from 'react-redux'
import { authInputActions } from '@/store/slices/authInputs'
import splitAndCapitalize from '@/helpers/splitAndCapitalize'

const CustomAuthInput = ({ validFn, type, id, error, childType, placeholder, children }) => {
    const dispatch = useDispatch()
    const { setValueInSignIn, setValueInSignUp, setValueInSubscribe } = authInputActions
    const { enteredValue, handleChange, handleBlur, hasError, setEnteredValue } = useInput('', (value) => validFn(value))

    useEffect(() => {
        childType === 'signIn' && dispatch(setValueInSignIn({ key: id, value: enteredValue }))
        childType === 'signUp' && dispatch(setValueInSignUp({ key: id, value: enteredValue }))
        childType === 'subscribe' && dispatch(setValueInSubscribe({ key: id, value: enteredValue }))
    }, [enteredValue])



    return (
        <div className='relative'>
            <label htmlFor="email" className="block text-gray-700 font-gt-america-bold mt-3">
                {splitAndCapitalize(id)}
            </label>
            <input
                id={id}
                type={type}
                name={id}
                className="border-none text-gray-600 font-[200] w-full focus:!outline-none"
                placeholder={placeholder}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            {children && children}
            {hasError && <p className="text-red-500 text-xs font-normal font-gt-america">{error}</p>}
        </div>
    )
}

export default CustomAuthInput
