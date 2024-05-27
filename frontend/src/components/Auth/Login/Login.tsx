import { useState } from 'react';
// import PropTypes from 'prop-types'; <-- why do i need this?
import { User, LoginCredentials, AuthProps } from '../../../../interfaces/user';


async function loginUser( credentials: LoginCredentials ) {
    return fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( credentials )
    })
        .then( data => data.json() )
        .catch( err => console.error( err ) );
}


export default function Login({ setToken, setUser }: AuthProps) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const loginResponse = await loginUser({
            email,
            password
        });

        if ( loginResponse.messages?.length ) {
            setErrors( loginResponse.messages );
            return;
        }

        const token = loginResponse.token;
        const user = loginResponse.userData  as User;
        setToken( token );
        setUser( user );
        setErrors([]);
    }

    const updateEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail( e.target.value );
    };

    const updatePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword( e.target.value );
    }

    return(
        <div className='login-wrapper'>
            <h1>Log In</h1>
            <form className='login-form' onSubmit={ handleSubmit }>
                <ul className='signup-errors-ul'>
                    { errors.map( ( error, idx ) => (
                        <li key={ idx } className='error-li'>{ error }</li>
                    ))}
                </ul>
                <label>
                    <p>Email</p>
                    <input type='email' onChange={ updateEmail } value={ email } />
                </label>
                <label>
                    <p>Password</p>
                    <input type='password' onChange={ updatePassword } value={ password } />
                </label>
                <button className='login-button' type='submit'>Log In</button>
            </form>
        </div>
    )
}

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
// }