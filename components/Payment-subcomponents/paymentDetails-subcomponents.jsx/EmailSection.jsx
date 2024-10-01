import React from 'react'
import InputElement from './InputElement'
import { isNotEmpty, isEmail } from '@/helpers/validationsFuncitons'
import CheckBox from './CheckBox'

const EmailSection = ({ isLogin, email }) => {
    return (
        <>
            <InputElement validFn={(value) => !isNotEmpty(value) || !isEmail(value)}
                type="email"
                id="email"
                error="Enter a valid Email"
                childType={'contact'}
            />
            <CheckBox value='Email me with news and offers' childType={'contact'} />
        </>
    )
}

export default EmailSection
