import React, { useState, useEffect } from 'react';
import Pages from './pages/Pages';
import Category from './Components/Category';
import Search from './Components/Search';
import Nav from './pages/Nav';
import useLocalStore from "./Middleware/useLocalStore";
import CookApi from "./API/Api";
import { BrowserRouter } from 'react-router-dom';
import jwtDecode from "jwt-decode";




function App() {
  const [ currUser, setCurrUser ] = useState( null );
  const [ token, setToken ] = useLocalStore( "token" );

  useEffect(
    function loadUserInfo ()
    {
      async function getUserInfo ()
      {
        if ( token )
        {
          try
          {
            let { username } = jwtDecode( token );
            CookApi.token = token;
            setCurrUser( await CookApi.getUser( username ) );
          } catch ( error )
          {
            console.log( error );
          }
        }
      }
      getUserInfo();
    },
    [ token ]
  );

  async function login ( info )
  {
    try
    {
      let token = await CookApi.login( info );
      setToken( token );
      return true;
    } catch ( errors )
    {
      return errors;
    }
  }

  async function signup ( info )
  {
    try
    {
      let token = await CookApi.signup( info );
      setToken( token );
      return true;
    } catch ( errors )
    {
      console.log( errors );
      return errors;
    }
  }

  const logout = () =>
  {
    setCurrUser( null );
    setToken( null );
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Search />
        <Category />
        <Pages />
      </BrowserRouter>
    </div>
  );
}

export default App;
