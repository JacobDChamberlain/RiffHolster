const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');


const User = db.User; // change to Users if using line 43 of 'models/index.js'

const signup = async ( req, res ) => {
    const errorMessages = {
        messages: []
    };

    try {
        const { username, email, password } = req.body;
        const data = {
            username,
            email,
            hashedPassword: await bcrypt.hash( password, 10 )
        };
        const user = await User.create( data );

        if ( user ) {
            const token = jwt.sign({ id: user.id }, process.env.secretKey, {
                expiresIn: 1000 * 60 * 60 * 24
            });

            console.log( 'user: ', JSON.stringify( user, null, 2 ));
            console.log( 'token: ', token );

            const userData = {
                id: user.id,
                username: user.username,
                email: user.email
            };

            const userAndTokenData = {
                tokenData: token,
                userData
            };

            return res.status( 200 ).send( userAndTokenData );
        } else {
            const message = '*** Error signing up: Failed to sign up ***';
            console.log( message );
            errorMessages.messages.push( message );

            return res.status( 409 ).json( errorMessages );
        }
    } catch( err ) {
        if ( err.name.includes( 'Sequelize' ) ) {
            const errors = err.errors;
            if ( err.errors === undefined ) {
                if ( err.original !== undefined ) {
                    errorMessages.messages.push( err.original );
                }
            } else {
                const errs = errors.map( e => e.message );
                errorMessages.messages = [ ...errorMessages.messages, ...errs ];
            }

            return res.status(400).json( errorMessages );
        } else {
            const message = 'Error: Could not sign up user.';
            errorMessages.messages.push( message );

            return res.status(400).json( errorMessages );
        }
    }
}

const login = async ( req, res ) => {
    const errorMessages = {
        messages: []
    };

    try {
        const { email, password } = req.body;
        if ( !email || !email.length ) errorMessages.messages.push( "Email cannot be blank" );
        if ( !password || !password.length ) errorMessages.messages.push( "Password cannot be blank" );
        if ( errorMessages.messages.length ) return res.status( 400 ).json( errorMessages );

        console.log( 'login backend, email and password entered: ', email, password )

        const user = await User.findOne({
            where: {
                email
            }
        });

        if ( user ) {
            const isSame = await bcrypt.compare( password, user.hashedPassword );

            if ( isSame ) {
                const token = jwt.sign({ id: user.id }, process.env.secretKey, {
                    expiresIn: 1000 * 60 * 60 * 24
                });

                // res.cookie('jwt', token, { maxAge: 60 * 60 * 24, httpOnly: true });

                console.log( 'user', JSON.stringify( user, null, 2 ));
                console.log( 'token', token );

                const userData = {
                    id: user.id,
                    username: user.username,
                    email: user.email
                };

                const userAndTokenData = {
                    tokenData: token,
                    userData
                };
                console.log( userAndTokenData );

                return res.status( 200 ).send( userAndTokenData );
            } else {
                const message = 'Failed to log in. Wrong password.';
                console.log( `*** Error logging in: ${ message } ***`);
                errorMessages.messages.push( message );

                return res.status( 401 ).json( errorMessages );
            }
        } else {
            const message = 'Failed to log in. Can\'t find User with that Email.';
            console.log( `*** Error logging in: ${ message } ***`);
            errorMessages.messages.push( message );

            return res.status( 404 ).json( errorMessages );
        }
    } catch( err ) {
        if ( err.name.includes( 'Sequelize' ) ) {
            const errors = err.errors;
            errorMessages.messages = errors.map( e => e.message );

            return res.status(400).json( errorMessages );
        } else {
            const message = 'Error: Could not log in user.';
            errorMessages.messages.push( message );

            return res.status(400).json( errorMessages );
        }
    }
}

// does this actually do anything if we're using a token in localstorage for authentication?
// ...because we can just delete the token from localstorage to logout
// const logout = async ( req, res ) => {
//     console.log('logout');
//     // const logoutMessage = {
//     //     "message": "User logged out"
//     // }

//     // return res.status( 200 ).clearCookie('jwt').send( logoutMessage );
// }

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
        console.log( err );
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
            };

            return res.status( 200 ).send( userDatum );
        } else {
            return res.status( 404 ).send( 'User not found' );
        }
    } catch( err ) {
        console.log( err );
    }
}

const updateUser = async ( req, res ) => {
    const userId = req.params.userId;
    const { username } = req.body;

    try {
        const user = await User.findOne({
            where: {
                id: userId
            }
        });

        if ( user ) {
            await user.update({
                username: username || user.username
            });

            await user.save();

            const userDatum = {
                id: user.id,
                username: user.username,
                email: user.email
            };

            return res.status( 200 ).send( userDatum );
        } else {
            return res.status( 404 ).send( 'Failed to retrieve user to edit' );
        }
    } catch ( err ) {
        console.log( err );
    }
}


module.exports = {
    signup,
    login,
    // logout,
    getAllUsers,
    getUserById,
    updateUser
}