import React from 'react'
import { useDispatch } from 'react-redux'
import { authInputActions } from '@/store/slices/authInputs'
import { COUNTRIES } from '@/utils'
import { useSelector } from 'react-redux'

const AuthSelect = () => {
    const { signUp } = useSelector((state) => state.authInputFn)
    const dispatch = useDispatch()

    const handleChange = (e) => {
        dispatch(authInputActions.setValueInSignUp({ key: 'country', value: e.target.value }))
    }

    return (
        <div className='relative'>
            <label htmlFor={'country'} className="block text-gray-700 font-gt-america-bold mt-3">
                Country
            </label>
            <select
                id={'country'}
                name={'country'}
                className={`border-none ${signUp?.country ? 'text-gray-500' : 'text-gray-400'} w-full focus:outline-none`}
                onChange={handleChange}
                defaultValue={''}
            // onBlur={handleBlur}
            >
                <option value="" className="text-gray-400" disabled>
                    -Select your country-
                </option>
                {COUNTRIES.map((countryData) => (
                    <option key={countryData.name} value={countryData.code} className="text-gray-500">
                        {countryData.name}
                    </option>
                ))}
            </select>
            {/* {children && children} */}
            {/* {hasError && <p className="text-red-500 text-xs !font-normal">{error}</p>} */}
        </div>

    )
}

export default AuthSelect
