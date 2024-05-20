import React, { useEffect, useRef } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Auth from '../Auth/Auth';
import NavigationBar from '../NavigationBar/NavigationBar';
import Home from '../Home/Home';
import useToken from './useToken';
import useUser from './useUser';
import { AlphaTabApi, Settings } from '@coderline/alphatab';


function App() {
  const elementRef = useRef( null );

  useEffect(() => {
    const settings = {
      core: {
        file: 'https://www.alphatab.net/files/canon.gp',
        fontDirectory: '/fonts/'
      },
      player: {
        enablePlayer: true,
        enableCursor: true,
        enableUserInteraction: true,
        soundFont: '/soundfont/sonivox.sf2'
      }
    };

    const api = new AlphaTabApi( elementRef.current, settings );

    return () => api.destroy();
  }, []);

  // const { token, setToken, removeToken } = useToken();
  // const { user, setUser, removeUser } = useUser();

  // if ( !token ) {
  //   return <Auth setToken={ setToken } setUser={ setUser } />
  // }

  return (
    <div ref={ elementRef }></div>

    // <div className='app-wrapper'>
    //   <NavigationBar user={ user } removeToken={ removeToken } removeUser={ removeUser } />
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path='/' Component={ Home } />
    //       {/* <Route path='/tabs' Component={  } />
    //       <Route path='/tabs/:tabId' Component={  } /> */}
    //     </Routes>
    //   </BrowserRouter>
    // </div>
  );
}

export default App;