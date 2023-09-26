import React, { useState } from 'react';


async function signupUser( credentials ) {
    return fetch('http://localhost:8080/api/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( credentials )
    })
        .then( data => data.json() )
        .catch( err => console.error( err )); //* do something with the data instead of just console error
}


export default function Signup() {
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const signupResponse = await signupUser({
            username,
            email,
            password
        });
        // Error handling
        // + set token or cookie * ?
        // redirect to a different page?
    }

    return(
        <div className='signup-wrapper'>
            <h1>Sign Up</h1>
            <form className='signup-form' onSubmit={handleSubmit}>
                <label>
                    <p>Username</p>
                    <input type='text' onChange={ e => setUsername( e.target.value ) } />
                </label>
                <label>
                    <p>Email</p>
                    <input type='email' onChange={ e => setEmail( e.target.value ) } />
                </label>
                <label>
                    <p>Password</p>
                    <input type='password' onChange={ e => setPassword( e.target.value ) } />
                </label>
                <button type='submit'>Sign Up</button>
            </form>
        </div>
    )
}