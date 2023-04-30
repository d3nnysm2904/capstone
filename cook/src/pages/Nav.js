import React from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import { GiCook } from 'react-icons/gi';

function Nav ()
{
    return (
        <div className='Nav' >
            <GiCook />
            <Link className='Logo' to={ '/' } >
                Home
            </Link>
            <Link className='Logo' to={ '/signup' } >
                Sign up
            </Link>
            <Link className='Logo' to={ '/login' } >
                Log in
            </Link>

        </div>
    );
}

export default Nav;