import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Search.css';

function Search ()
{
    const [ input, setInput ] = useState( '' );
    const navigate = useNavigate();

    const handleChange = ( e ) =>
    {
        e.preventDefault();
        navigate( '/searched/' + input );
        setInput( '' );
    };

    return (
        < form
            className='Form'
            onSubmit={ handleChange } >
            <div className='input-wrapper' >
                <FaSearch className="search-icon" />
                <input
                    onChange={ ( e ) => setInput( e.target.value ) }
                    className='search'
                    type='text'
                    value={ input } />
            </div>
        </form >


    );
}

export default Search;