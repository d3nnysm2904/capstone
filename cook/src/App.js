import jwtDecode from "jwt-decode";
import React, { useState, useEffect } from 'react';
import useLocalStore from "./Middleware/useLocalStore";
import CookApi from "./API/Api";
import { BrowserRouter } from 'react-router-dom';
import UserContext from "./UseContext";
import Routes from './Routes/Routes';




function App() {
  const [ currUser, setCurrUser ] = useState( null );
  const [ token, setToken ] = useLocalStore( 'token' );

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
            console.log( currUser )
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
      console.log( token )
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
        <UserContext.Provider value={ { currUser, logout, setCurrUser } }>
          <Routes login={ login } signup={ signup } />
          {/* <Nav />
        <Home />
        <Search />
        <Category />  */}

        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
