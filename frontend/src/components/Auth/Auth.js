import React, { useState } from 'react';
import Login from '../Auth/Login/Login';
import Signup from '../Auth/Signup/Signup';


export default function Auth() {
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
                <Signup /> :
                <Login />
            }
            <button className='toggle-signup' onClick={handleToggleSignup}>{toggleMessage}</button>
        </div>
    )
}