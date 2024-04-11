import React, { useState } from 'react';
import Login from '../Auth/Login/Login';
import Signup from '../Auth/Signup/Signup';
import './Auth.css'


export default function Auth({ setToken, setUser }) {
    const [showSignup, setShowSignup] = useState(false);
    const toggleMessage = showSignup ? "Already have an account?" : "No account? Sign up here!";

    const handleToggleSignup = e => {
        e.preventDefault();
        setShowSignup( !showSignup );
    }

    return(
        <div className='auth-wrapper'>
            {
                showSignup ?
                <Signup setToken={ setToken } setUser={ setUser } /> :
                <Login setToken={ setToken } setUser={ setUser } />
            }
            <button className='toggle-signup' onClick={handleToggleSignup}>{toggleMessage}</button>
        </div>
    )
}