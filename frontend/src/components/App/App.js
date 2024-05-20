import React, { useEffect, useRef, useState } from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Auth from '../Auth/Auth';
// import NavigationBar from '../NavigationBar/NavigationBar';
// import Home from '../Home/Home';
// import useToken from './useToken';
// import useUser from './useUser';
import { AlphaTabApi } from '@coderline/alphatab';
import './App.css';


function App() {
  const elementRef = useRef( null );
  const [api, setApi] = useState();

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

    setApi( api );

    return () => api.destroy();
  }, []);

  function playPause() {
    api?.playPause();
  }

  // const { token, setToken, removeToken } = useToken();
  // const { user, setUser, removeUser } = useUser();

  // if ( !token ) {
  //   return <Auth setToken={ setToken } setUser={ setUser } />
  // }

  return (
    <div className='app-wrapper'>
      Hello!
      <button onClick={() => playPause()}>Play/Pause</button>
      <div style={{ height: '500px', border: '1px solid red', borderRadius: '40px'}} ref={elementRef}></div>
    </div>

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