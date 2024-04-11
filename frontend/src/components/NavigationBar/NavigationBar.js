import React from 'react';
import './NavigationBar.css';

import Logout from '../Auth/Logout/Logout';


export default function NavigationBar({ removeToken }) {
    return(
        <div className='navigation-bar-wrapper'>
            <h2>Welcome, User!</h2>
            {/* only show logout button when user is logged in */}
            <Logout removeToken={ removeToken } />
        </div>
    )
}