import React, { useState } from "react";
import './SearchForm.css';

const CompanySearch = ( { search } ) =>
{
    const INITIAL_STATE = {
        name: "",
    };
    const [ formData, setFormData ] = useState( INITIAL_STATE );

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
        search( formData.name ? formData.name : undefined );
    }

    return (
        <>
            <div className="container">
                <form
                    onSubmit={ handleSubmit }
                    style={ { display: "flex", justifyContent: "center" } }
                >
                    <div
                        className="form-group"
                        style={ { display: "flex", marginTop: "20px", width: "60%" } }
                    >
                        <input
                            style={ { padding: "10px", marginLeft: "5px" } }
                            className="form-control"
                            id="name"
                            type="text"
                            name="name"
                            placeholder=""
                            value={ formData.name }
                            onChange={ handleChange }
                        ></input>
                        <button

                            className="btn btn-primary float-center"
                        >
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default CompanySearch;
