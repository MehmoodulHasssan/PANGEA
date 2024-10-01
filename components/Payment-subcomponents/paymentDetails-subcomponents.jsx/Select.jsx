import React, { useEffect, useState } from 'react'
import { paymentActions } from '@/store/slices/paymentInputs'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { COUNTRIES } from '@/utils'

const Select = () => {
    const state = useSelector((state) => state.stateFn)
    const dispatch = useDispatch()
    const [country, setCountry] = useState('-Select a country-')

    const handleChangeOption = (e) => {
        setCountry(e.target.value)
        dispatch(paymentActions.setValueInDeliveryDetails({ key: 'country', value: e.target.value }))
    }

    useEffect(() => {
        if (state.currentState === 'userLogin') {
            setCountry(state.userData.country)
            dispatch(paymentActions.setValueInDeliveryDetails({ key: 'country', value: state.userData.country }))
        }
    }, [state.currentState])

    console.log(state)
    console.log(country)
    return (
        <select
            id="country"
            name="country"
            className="border border-gray-300 rounded-md w-full select-tag text-black text-sm font-[600] font-gt-america"
            onChange={handleChangeOption}
            value={country}
            defaultValue={''}

        >
            {COUNTRIES.map((countryData) => (
                <option
                    key={countryData.name}
                    value={countryData.code}
                    className="text-sm"
                >
                    {countryData.name}
                </option>
            ))}
        </select>

    )
}

export default Select
