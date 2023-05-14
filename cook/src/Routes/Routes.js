import React, { useContext } from "react";
import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import HomePage from "../Home/Home";
import LoginForm from "../Forms/LoginForm";
import SignUpForm from "../Forms/SignUpForm";
import UserProfile from "../Forms/UserProfile";
import UserContext from "../UseContext";
import Cuisine from './Cuisine';
// import Searched from './Searched';
import Category from '../Components/Category';
import Popular from '../Components/Popular';
import Search from '../Components/Search';
import Nav from '../NavBar/Nav';
import Searched from './Searched';
import Recipe from './Recipe';




function RoutesComponent ( { login, signup } )
{
    const { currUser } = useContext( UserContext );

    const SecureRoute = ( path, component ) =>
    {
        if ( currUser )
        {
            return <Route exact path={ path } element={ component }></Route>;
        } else
        {
            return (
                <Route path="*" element={ <Navigate exact="true" to="/login" /> }></Route>
            );
        }
    };

    return (


        <div>
            <Nav />
            <Routes>
                <Route exact path="/" element={ <HomePage /> }></Route>
                <Route
                    exact
                    path="/login"
                    element={ <LoginForm login={ login } /> }
                ></Route>
                <Route
                    exact
                    path="/signup"
                    element={ <SignUpForm signup={ signup } /> }
                ></Route>


            {/* <Route path='/' element={ <HomePage /> } /> */}
            {/* <Route path='/cuisine/:type' element={ < Cuisine /> } />
            <Route path='/searched/:search' element={ <Searched /> } >  </Route> */}
            {/* <Route path='recipe/:name' element={ < Recipe /> } ></Route> */}
            {/* <Route path='login' element={ < LoginForm /> } ></Route>
            <Route path='signup' element={ < SignUpForm /> } ></Route>
            <Route path='user' element={ < UserProfile /> } ></Route> */}

            {/* { SecureRoute( "/recipe/:name", <Recipe /> ) } */ }
   

                { SecureRoute( "/home", <HomePage /> ) }
                {SecureRoute("/cuisine/:type",<Cuisine></Cuisine>)}
                {SecureRoute("/searched/:search'",Searched)}
                {SecureRoute('recipe/:name',<Recipe/>)}


                { SecureRoute( "/profile", <UserProfile /> ) }
              
                { SecureRoute( "/recipes/", <Popular /> ) }
                { SecureRoute( "/cuisine", <Cuisine /> ) }
                { SecureRoute( "/searched", <Searched /> ) }
                { SecureRoute( "/category", <Category /> ) }

                 <Route path="*" element={ <Navigate exact="true" to="/" /> }></Route> 
            </Routes>
        </div>

    );
}

export default RoutesComponent;
