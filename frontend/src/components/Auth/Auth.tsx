import { useState } from 'react';
import Login from './Login/Login.tsx';
import Signup from './Signup/Signup.tsx';
import { AuthProps } from '../../../interfaces/user';
import './Auth.css'


export default function Auth({ setToken, setUser }: AuthProps) {
    const [showSignup, setShowSignup] = useState(false);
    const toggleMessage = showSignup ? "Already have an account?" : "No account? Sign up here!";

    const handleToggleSignup = (e: React.MouseEvent<HTMLButtonElement>) => {
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