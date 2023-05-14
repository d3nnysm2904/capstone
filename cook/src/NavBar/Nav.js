
import React, { useContext } from "react";
import UserContext from "../UseContext";
import './Nav.css';
import { Link, NavLink } from "react-router-dom";
import { GiCook } from 'react-icons/gi';
const NotLogIn = () =>
{
    return (
        <div className='Nav' >
            <GiCook />
            <Link className='Logo' to={ '/home' } >
                Home
            </Link>
            <br/>
            <Link className='Logo' to={ '/signup' } >
                Signup
            </Link>
            <br/>
            <Link className='Logo' to={ '/login' } >
                Login
            </Link>

        </div>
    );
};

const isLogIn = ( name, logout ) =>
{
    return (
        <div>
                <GiCook />
                <Link className='Logo' to={ '/home' } >
                    Home
                </Link>
        
        <br/>
                <NavLink className="Logo" to="/" onClick={ logout }> 
                Logout {name}
                </NavLink>
            
                </div>
    );
};
function Nav ()
{
    const { currUser, logout } = useContext( UserContext );


    return (
        <nav className="Logo ">

            { currUser ? isLogIn( currUser.firstName, logout ) : NotLogIn() }
        </nav>
    );
}

export default Nav;