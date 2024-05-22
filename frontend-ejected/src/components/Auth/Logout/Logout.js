import React from 'react';
import './Logout.css';


export default function Logout({ removeToken, removeUser }) {
    function logout() {
        removeToken();
        removeUser();
    }

    return(
        <button className='logout-button' onClick={ logout }>Logout</button>
    )
}