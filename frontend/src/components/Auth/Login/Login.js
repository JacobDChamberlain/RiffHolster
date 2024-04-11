import React, { useState } from 'react';
// import PropTypes from 'prop-types';


export async function loginUser( credentials ) {
    return fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( credentials )
    })
        .then( data => data.json() )
        .catch( err => console.error( err ) ); //? do something with the error instead of just log to console
}


export default function Login({ setToken, setUser }) {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const loginResponse = await loginUser({
            email,
            password
        });
        const token = {
            token: loginResponse.tokenData
        };
        const user = loginResponse.userData;
        setToken( token );
        setUser( user );
        // Error handling
    }

    return(
        <div className='login-wrapper'>
            <h1>Log In</h1>
            <form className='login-form' onSubmit={handleSubmit}>
                <label>
                    <p>Email</p>
                    <input type='email' onChange={e => setEmail(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input type='password' onChange={e => setPassword(e.target.value)} />
                </label>
                <button className='login-button' type='submit'>Log In</button>
            </form>
        </div>
    )
}

// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
// }