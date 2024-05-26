import { useState } from 'react';
import { User } from '../../../interfaces/user';


export default function useUser() {
    const getUser = () => {
        const userObjString = localStorage.getItem( 'user' );
        // if (!userObjString) throw new Error("Error getting user obj from local storage");
        const user = JSON.parse( userObjString );
        return user;
    }

    const [ user, setUser ] = useState( getUser() );

    const saveUser = ( user: User ) => {
        localStorage.setItem( 'user', JSON.stringify( user ) );
        setUser( user );
    }

    const removeUser = () => {
        localStorage.removeItem( 'user' );
        setUser( null );
    }

    return {
        setUser: saveUser,
        removeUser,
        user
    }
}