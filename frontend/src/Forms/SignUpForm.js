import React, { useState } from "react";
import "./SignUpForm.css";
import { Navigate } from "react-router-dom";

const SignUpForm = ( { signup } ) =>
{
    const INITIAL_STATE = {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
    };
    const [ formData, setFormData ] = useState( INITIAL_STATE );
    const [ error, setError ] = useState( "" );

    const handleChange = ( e ) =>
    {
        const { name, value } = e.target;
        setFormData( ( data ) => ( {
            ...data,
            [ name ]: value,
        } ) );
    };

    async function handleSubmit ( e )
    {
        e.preventDefault();
        const resp = await signup( { ...formData } );
        setError( resp );
    }

    return (
        <>
            <div className="container SignUpForm">
                <h1>Sign Up</h1>
                { error === true ? (
                    // If there is no Error is all good and we Redirect to Home
                    <Navigate exact="true" to="/" />
                ) : (
                    <h5 className='error' >

                        { error }
                    </h5>
                ) }
                <form onSubmit={ handleSubmit }>
                    <div className="form-group">
                        <label htmlFor="username">Username: </label>
                        <input
                            className="form-control"
                            required
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Username"
                            value={ formData.username }
                            onChange={ handleChange }
                        ></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password: </label>
                        <input
                            className="form-control"
                            required
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={ formData.password }
                            onChange={ handleChange }
                        ></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name: </label>
                        <input
                            className="form-control"
                            required
                            id="firstName"
                            type="text"
                            name="firstName"
                            placeholder=""
                            value={ formData.firstName }
                            onChange={ handleChange }
                        ></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name: </label>
                        <input
                            className="form-control"
                            required
                            id="lastName"
                            type="text"
                            name="lastName"
                            placeholder=""
                            value={ formData.lastName }
                            onChange={ handleChange }
                        ></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email: </label>
                        <input
                            className="form-control"
                            required
                            id="email"
                            type="text"
                            name="email"
                            placeholder=""
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            value={ formData.email }
                            onChange={ handleChange }
                        ></input>
                    </div>
                    <br></br>
                    <button className="btn btn-primary float-center">Submit</button>
                </form>
            </div>
        </>
    );
};

export default SignUpForm;

