import { NavLink } from 'react-router-dom';
import { NavigationBarProps } from '../../../interfaces/user'
import Logout from '../Auth/Logout/Logout';
import './NavigationBar.css';


export default function NavigationBar({ user, removeToken, removeUser }: NavigationBarProps) {
    return(
        <div className='navigation-bar-wrapper'>
            <h2>Welcome, { user.username }!</h2>
            <NavLink className="nav-link" to="/">Home</NavLink>
            <NavLink className="nav-link" to="/upload">Upload</NavLink>
            <Logout removeToken={ removeToken } removeUser={ removeUser } />
        </div>
    )
}