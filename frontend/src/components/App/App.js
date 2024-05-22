import React, { useEffect, useRef, useState } from 'react';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import Auth from '../Auth/Auth';
// import NavigationBar from '../NavigationBar/NavigationBar';
// import Home from '../Home/Home';
// import useToken from './useToken';
// import useUser from './useUser';
import { AlphaTabApi } from '@coderline/alphatab';
import './App.css';

import AltitudesTab from './testTabs/Altitudes.gp5';
import ElectricRedTab from './testTabs/electric_red.gp5';
import InDeathIsDeathTab from './testTabs/in_death_is_death.gp5';

const tabs = {
  "Altitudes": AltitudesTab,
  "Electric Red": ElectricRedTab,
  "In Death Is Death": InDeathIsDeathTab
}


function App() {
  const elementRef = useRef( null );
  const [api, setApi] = useState();

  useEffect(() => {
    const settings = {
      core: {
        file: tabs["Electric Red"],
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
      <button onClick={() => playPause()}>Play/Pause</button>
      <div ref={elementRef}></div>
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