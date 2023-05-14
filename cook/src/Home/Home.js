import React, { useContext } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import UserContext from "../UseContext";
import Veggie from "../Components/Veggie";
import Popular from "../Components/Popular";
import Category from '../Components/Category';
import Nav from "../NavBar/Nav";
import Search from "../Components/Search";

const NeedLogIn = () =>
{
    return (
        <div>
            
        </div>
    );
};

function Home ()
{

    const { currUser } = useContext( UserContext );
    return (
        <div>
            { currUser ? <h2>Welcome Back, { currUser.firstName } !</h2> : NeedLogIn() }
            <Search />
            <Category />
            <Veggie />
            <Popular />
        </div>
    );
}

export default Home;