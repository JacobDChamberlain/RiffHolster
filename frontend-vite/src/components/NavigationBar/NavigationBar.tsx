import './NavigationBar.css';

import Logout from '../Auth/Logout/Logout';


export default function NavigationBar({ user, removeToken, removeUser }) {
    return(
        <div className='navigation-bar-wrapper'>
            <h2>Welcome, { user.username }!</h2>
            <Logout removeToken={ removeToken } removeUser={ removeUser } />
        </div>
    )
}