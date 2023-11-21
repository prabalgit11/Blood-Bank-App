import React from 'react'
import Form from '../../components/shared/Form/Form'

const Register = () => {
    return (
        <>
            <div className="row g-0">
                <div className="col-md-8 form-banner">
                    <img src="./assets/banner2.jpg" alt="registerbanner" />
                </div>
                <div className="col-md-4 form-container" >
                    <Form
                        formTitle={'Register Page'}
                        submitBtn={'Sign up'}
                        formType={'register'}
                    />

                </div>
            </div>
        </>
    )
}

export default Register
