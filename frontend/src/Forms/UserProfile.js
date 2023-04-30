import React, { useState, useContext } from "react";
import "./SignUpForm.css";
import { Navigate } from "react-router-dom";
import UserContext from "../UseContext";
import JoblyApi from "../API/Api";

const UserProfile = () =>
{
    const { currUser, setCurrUser } = useContext( UserContext );

    const INITIAL_STATE = {
        username: currUser.username,
        password: "",
        firstName: currUser.firstName,
        lastName: currUser.lastName,
        email: currUser.email,
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

        try
        {
            let isPasswordCorrect = await JoblyApi.checkUserNamePassword( {
                username: currUser.username,
                password: formData.password,
            } );
        } catch ( error )
        {
            setError( "Invalid Password!!!" );
            return;
        }

        try
        {
            const userUpdated = await JoblyApi.updateUser( currUser.username, {
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
            } );
            setCurrUser( userUpdated );
            setError( true );
        } catch ( error )
        {
            console.log( error );
        }
    }

    return (
        <>
            <div className="container SignUpForm">
                <h1>Profile</h1>
                { error === true ? (

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
                            disabled
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

                            value={ formData.email }
                            onChange={ handleChange }
                        ></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Confirm password to make changes: </label>
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
                    <br></br>
                    <button className="btn btn-primary float-center">Submit</button>
                </form>
            </div>
        </>
    );
};

export default UserProfile;
