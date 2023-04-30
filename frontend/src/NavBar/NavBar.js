import React, { useContext } from "react";
import UserContext from "../UseContext";
import { Link, NavLink } from "react-router-dom";

const NotLogIn = () =>
{
    return (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/login">
                    Login
                </NavLink>
            </li>
            <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/signup">
                    Sign Up
                </NavLink>
            </li>
        </ul>
    );
};

const isLogIn = ( name, logout ) =>
{
    return (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/companies">
                    Companies
                </NavLink>
            </li>
            <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/jobs">
                    Jobs
                </NavLink>
            </li>
            <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/profile">
                    Profile
                </NavLink>
            </li>
            <li className="nav-item mr-4">
                <NavLink className="nav-link" to="/" onClick={ logout }>
                    Log out { name }
                </NavLink>
            </li>
        </ul>
    );
};

const NavBar = () =>
{
    const { currUser, logout } = useContext( UserContext );

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <Link className="navbar-brand" to="/">
                Jobly
            </Link>
            { currUser ? isLogIn( currUser.firstName, logout ) : NotLogIn() }
        </nav>
    );
};

export default NavBar;