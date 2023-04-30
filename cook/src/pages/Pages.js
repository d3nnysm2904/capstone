import React, { useContext } from 'react';
import Home from './Home';
import Cuisine from './Cuisine';
import Searched from './Searched';
import Recipe from './Recipe';
import LoginForm from "../Forms/LoginForm";
import SignUpForm from "../Forms/SignUpForm";
import UserProfile from "../Forms/UserProfile";
import UserContext from "../UseContext";
import { Route, Routes, Navigate } from 'react-router-dom';

function Pages ( { login, signup } )
{
    // const { currUser } = useContext( UserContext );

    // const SecureRoute = ( path, component ) =>
    // {
    //     if ( currUser )
    //     {
    //         return <Route exact path={ path } element={ component }></Route>;
    //     } else
    //     {
    //         return (
    //             <Route path="*" element={ <Navigate exact="true" to="/login" /> }></Route>
    //         );
    //     }
    // };
    return (

        <Routes>
            <Route path='/' element={ <Home /> } />
            <Route path='/cuisine/:type' element={ < Cuisine /> } />
            <Route path='/searched/:search' element={ <Searched /> } >  </Route>
            <Route path='recipe/:name' element={ < Recipe /> } ></Route>
            <Route path='login' element={ < LoginForm /> } ></Route>
            <Route path='signup' element={ < SignUpForm /> } ></Route>
            <Route path='user' element={ < UserProfile /> } ></Route>

            {/* { SecureRoute( "/recipe/:name", <Recipe /> ) } */ }
        </Routes>


    );
}

export default Pages;