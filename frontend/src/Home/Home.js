import React, { useContext } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import UserContext from "../UseContext";

const NeedLogIn = () =>
{
    return (
        <div>
            <Link className="btn btn-primary mr-2" to="/login">
                Log in
            </Link>
            <Link className="btn btn-primary" to="/signup">
                Sign up
            </Link>
        </div>
    );
};

const HomePage = () =>
{
    const { currUser } = useContext( UserContext );

    return (
        <div className="Home">
            <div className="container text-center">
                <h1 className="mb-6 font-weight-bold" >
                    Jobly
                </h1>
                <p className="welcome">All the jobs in one, convenient place.</p>
                { currUser ? <h2>Welcome Back, { currUser.firstName } !</h2> : NeedLogIn() }
            </div>
        </div>
    );
};

export default HomePage;