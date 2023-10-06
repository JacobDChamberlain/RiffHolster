const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');


const User = db.User; // change to Users if using line 43 of 'models/index.js'

const signup = async ( req, res ) => {
    try {
        const { username, email, password } = req.body;
        const data = {
            username,
            email,
            password: await bcrypt.hash( password, 10 )
        };

        const user = await User.create( data );

        if ( user ) {
            let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                expiresIn: 1000 * 60 * 60 * 24
            });

            // do we need this if we're sending a token to the frontend?
            // res.cookie('jwt', token, { maxAge: 60 * 60 * 24, httpOnly: true });

            console.log( 'user: ', JSON.stringify( user, null, 2 ));
            console.log( 'token: ', token );

            const userData = {
                id: user.id,
                username: user.username,
            };

            // possibly send this in response to place user info in localstorage?
            // const userAndTokenData = {
            //     tokenData: token,
            //     userData
            // };

            return res.status( 200 ).send( token );
        } else {
            return res.status( 409 ).send( 'Failed to sign up' );
        }
    } catch( err ) {
        console.log( err );
    }
}

const login = async ( req, res ) => {
    console.log('login');
}

const logout = async ( req, res ) => {
    console.log('logout');
    // const logoutMessage = {
    //     "message": "User logged out"
    // }
    // return res.status( 200 ).clearCookie('jwt').send( logoutMessage );
}

const getAllUsers = async ( req, res ) => {
    try {
        const users = await User.findAll();

        if ( users ) {
            const usersData = [];
            users.forEach( user => usersData.push(
                {
                    id: user.id,
                    username: user.username,
                    email: user.email
                    // tabs: user.tabs <-- why does this not work?
                }
            ));

            return res.status( 200 ).send( usersData );
        } else {
            return res.status( 404 ).send( 'Failed to retrieve all Users' );
        }
    } catch ( err ) {
        console.log( 'DB Error - Fetching all Users failed. ', err );
    }
}

const getUserById = async ( req, res ) => {
    try {
        const userId = req.params.userId;

        const user = await User.findOne({
            where: {
                id: userId
            }
        });

        if ( user ) {
            const userDatum = {
                id: user.id,
                username: user.username,
                email: user.email
                // tabs: user.tabs <-- why does this not work?
            }

            return res.status( 200 ).send( userDatum );
        } else {
            return res.status( 404 ).send( 'User not found' );
        }
    } catch( err ) {
        console.log( 'DB Error - Fetching one User failed. ', err );
    }
}


module.exports = {
    signup,
    login,
    logout,
    getAllUsers,
    getUserById
}