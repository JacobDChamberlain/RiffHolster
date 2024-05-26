import { useState } from 'react';
import { SignupCredentials, AuthProps } from '../../../../interfaces/user';


async function signupUser( credentials: SignupCredentials ) {
    return fetch('http://localhost:8080/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( credentials )
    })
        .then( data => data.json() )
        .catch( err => console.error( err )); //* do something with the data instead of just console error
}


export default function Signup({ setToken, setUser }: AuthProps) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const signupResponse = await signupUser({
            username,
            email,
            password
        });

        // console.log( 'signupResponse: ', signupResponse );

        if ( signupResponse.messages?.length ) {
            console.log( 'Frontend Error - Signup: ', signupResponse.messages );
            setErrors( signupResponse.messages );
            return;
        }

        const token = signupResponse.token;
        const user = signupResponse.userData;
        setToken( token );
        setUser( user );
        setErrors([]);
    }

    const updateUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername( e.target.value );
    };

    const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail( e.target.value );
    };

    const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword( e.target.value );
    }

    return(
        <div className='signup-wrapper'>
            <h1>Sign Up</h1>
            <form className='signup-form' onSubmit={ handleSubmit }>
                <ul className='signup-errors-ul'>
                    { errors.map( ( error, idx ) => (
                        <li key={ idx } className='error-li'>{ error }</li>
                    ))}
                </ul>
                <label>
                    <p>Username</p>
                    <input type='text' onChange={ updateUsername } value={ username }  />
                </label>
                <label>
                    <p>Email</p>
                    <input type='email' onChange={ updateEmail } value={ email }  />
                </label>
                <label>
                    <p>Password</p>
                    <input type='password' onChange={ updatePassword } value={ password }  />
                </label>
                <button className='signup-button' type='submit'>Sign Up</button>
            </form>
        </div>
    )
}