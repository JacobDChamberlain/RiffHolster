import React from 'react';
import './NavigationBar.css';


export default function NavigationBar() {
    return(
        <div className='navigation-bar-wrapper'>
            <h2>Welcome, User!</h2>
            <button className='logout-button'>Log Out</button>
        </div>
    )
}