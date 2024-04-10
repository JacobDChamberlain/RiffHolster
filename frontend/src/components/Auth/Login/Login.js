import React, { useState } from 'react';


export async function loginUser( credentials ) {
    return fetch('http://localhost:8080/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify( credentials )
    })
        .then( data => {console.log( data )} ) //* data here is the token sent back from backend POST /users
        .catch( err => console.error( err ) ); //* if we wanted to send back an object with user data and token, we could destructure it using data.json() here
}       //? do something with the error instead of just log to console


export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async e => {
        e.preventDefault();
        const loginResponse = await loginUser({
            email,
            password
        });
        console.log("loginResponse--> ", loginResponse)
        // Error handling
        // + set token or cookie * ?
        // redirect to a different page?
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