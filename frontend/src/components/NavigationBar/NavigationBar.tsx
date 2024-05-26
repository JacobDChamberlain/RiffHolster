import { NavigationBarProps } from '../../../interfaces/user'
import Logout from '../Auth/Logout/Logout';
import './NavigationBar.css';


export default function NavigationBar({ user, removeToken, removeUser }: NavigationBarProps) {
    return(
        <div className='navigation-bar-wrapper'>
            <h2>Welcome, { user.username }!</h2>
            <Logout removeToken={ removeToken } removeUser={ removeUser } />
        </div>
    )
}