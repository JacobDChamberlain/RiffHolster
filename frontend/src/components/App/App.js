import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from '../Auth/Auth';
import NavigationBar from '../NavigationBar/NavigationBar';
import useToken from './useToken';


function App() {
  const { token, setToken } = useToken();

  if ( !token ) {
    // console.log( 'no token!!!')
    return <Auth setToken={ setToken } />
  }

  return (
    <div className='app-wrapper'>
      <NavigationBar />
      <BrowserRouter>
        <Routes>
          {/* <Route path='/' Component={  } />
          <Route path='/tabs' Component={  } />
          <Route path='/tabs/:tabId' Component={  } /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
