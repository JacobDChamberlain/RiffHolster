import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from '../Auth/Auth';
import NavigationBar from '../NavigationBar/NavigationBar';


function App() {
  return (
    <div className='app-wrapper'>
      <NavigationBar />
      <BrowserRouter>
        <Routes>
          <Route path='/login' Component={ Auth } />
          {/* <Route path='/' Component={  } />
          <Route path='/tabs' Component={  } />
          <Route path='/tabs/:tabId' Component={  } /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
