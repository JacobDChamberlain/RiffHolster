import React from 'react';
import './Logout.css';


export default function Logout({ removeToken }) {
    function logout() {
        removeToken();
    }

    return(
        <button className='logout-button' onClick={ logout }>Logout</button>
    )
}