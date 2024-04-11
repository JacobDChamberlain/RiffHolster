import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from '../Auth/Auth';
import NavigationBar from '../NavigationBar/NavigationBar';
import Home from '../Home/Home';
import useToken from './useToken';
import useUser from './useUser';


function App() {
  const { token, setToken, removeToken } = useToken();
  const { user, setUser, removeUser } = useUser();

  if ( !token ) {
    return <Auth setToken={ setToken } setUser={ setUser } />
  }

  return (
    <div className='app-wrapper'>
      <NavigationBar removeToken={ removeToken } />
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={ Home } />
          {/* <Route path='/tabs' Component={  } />
          <Route path='/tabs/:tabId' Component={  } /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
