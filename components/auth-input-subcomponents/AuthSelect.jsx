import React from 'react'
import { useDispatch } from 'react-redux'
import { authInputActions } from '@/store/slices/authInputs'
import { COUNTRIES } from '@/utils'

const AuthSelect = () => {
    const dispatch = useDispatch()

    const handleChange = (e) => {
        dispatch(authInputActions.setValueInSignUp({ key: 'country', value: e.target.value }))
    }

    return (
        <div className='relative'>
            <label htmlFor={'country'} className="block text-gray-700 font-bold mt-3">
                Country
            </label>
            <select
                id={'country'}
                name={'country'}
                className="border-none text-gray-500 font-gt-america rounded-lg w-full focus:outline-none"
                onChange={handleChange}
            // onBlur={handleBlur}
            >
                <option value="" disabled>
                    Select your country
                </option>
                {COUNTRIES.map((countryData) => (
                    <option key={countryData.name} value={countryData.code}>
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
