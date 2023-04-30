import React, { useState, useEffect } from "react";
import Routes from "./Routes/Routes";
import jwtDecode from "jwt-decode";
import JoblyApi from "./API/Api";
import UserContext from "./UseContext";
import useLocalStore from "./Middleware/useLocalStore";
import { BrowserRouter } from "react-router-dom";


function App ()
{
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
            JoblyApi.token = token;
            setCurrUser( await JoblyApi.getUser( username ) );
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
      let token = await JoblyApi.login( info );
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
      let token = await JoblyApi.signup( info );
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
    <BrowserRouter>
    <UserContext.Provider value={ { currUser, logout, setCurrUser } }>
      <Routes login={ login } signup={ signup } />
    </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
