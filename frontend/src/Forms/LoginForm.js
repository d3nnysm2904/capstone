import React, { useState } from "react";
import "./LoginForm.css";
import { Navigate } from "react-router-dom";

const LoginForm = ( { login } ) =>
{
    const INITIAL_STATE = {
        username: "",
        password: "",
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
        const resp = await login( { ...formData } );
        setError( resp );
    }

    return (
        <>
            <div className="container LoginForm">
                <h1>Login</h1>
                { error === true ? (
                    <Navigate exact="true" to="/" />
                ) : (
                        <h5 className="error">
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
                    <br></br>
                    <button className="btn btn-primary float-center">Submit</button>
                </form>
            </div>
        </>
    );
};

export default LoginForm;