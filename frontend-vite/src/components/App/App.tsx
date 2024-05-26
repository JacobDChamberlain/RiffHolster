// import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from '../Auth/Auth.tsx';
import NavigationBar from '../NavigationBar/NavigationBar.tsx';
import Home from '../Home/Home.tsx';
import useToken from './useToken.tsx';
import useUser from './useUser.tsx';
// import { AlphaTabApi, Settings } from '@coderline/alphatab'

// import ElectricRed from './testTab/ElectricRed.gp5'; //? why is this marked red?

import './App.css'

function App() {
  // const elementRef = useRef<HTMLDivElement>(null);
  // const [api, setApi] = useState<AlphaTabApi>();

  // useEffect(() => {
  //   const api = new AlphaTabApi(elementRef.current!, {
  //     core: {
  //       file: ElectricRed,
  //       fontDirectory: '/font/'
  //     },
  //     player: {
  //       enablePlayer: true,
  //       enableCursor: true,
  //       enableUserInteraction: true,
  //       soundFont: '/soundfont/sonivox.sf2'
  //     }
  //   } as Settings);

  //   setApi( api );

  //   return () => {
  //     console.log('destroy', elementRef)
  //     api.destroy();
  //   }
  // }, []);

  // function playPause() {
  //   api?.playPause();
  // }



  const { token, setToken, removeToken } = useToken();
  const { user, setUser, removeUser } = useUser();

  if ( !token ) {
    return <Auth setToken={ setToken } setUser={ setUser } />
  }


  return (
    // <div className='app-wrapper'>
    //   <button onClick={() => playPause()}>Play/Pause</button>
    //   <div ref={ elementRef }></div>
    // </div>

    <div className='app-wrapper'>
      <NavigationBar user={ user } removeToken={ removeToken } removeUser={ removeUser } />
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={ Home } />
          {/* <Route path='/tabs' Component={  } />
          <Route path='/tabs/:tabId' Component={  } /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
