import { LogoutProps } from '../../../../interfaces/user';
import './Logout.css';


export default function Logout({ removeToken, removeUser }: LogoutProps) {
    function logout() {
        removeToken();
        removeUser();
    }

    return(
        <button className='logout-button' onClick={ logout }>Logout</button>
    )
}