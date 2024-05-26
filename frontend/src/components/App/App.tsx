import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auth from '../Auth/Auth.tsx';
import NavigationBar from '../NavigationBar/NavigationBar.tsx';
import Home from '../Home/Home.tsx';
import useToken from './useToken.tsx';
import useUser from './useUser.tsx';

import './App.css'

function App() {
  const { token, setToken, removeToken } = useToken();
  const { user, setUser, removeUser } = useUser();

  if ( !token ) {
    return <Auth setToken={ setToken } setUser={ setUser } />
  }


  return (
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
