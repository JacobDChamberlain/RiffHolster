const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');
const { sequelizeErrorHandler } = require('../utils/errorHandler');


const User = db.User;
const Tab = db.Tab;

const signup = async ( req, res ) => {
    const errorMessages = {
        messages: []
    };

    try {
        const user = await User.create( req.body );

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
                token,
                userData
            };

            return res.status( 200 ).json( userAndTokenData );
        } else {
            const message = '*** Error signing up: Failed to sign up ***';
            console.log( message );
            errorMessages.messages.push( message );

            return res.status( 409 ).json( errorMessages );
        }
    } catch( err ) {
        sequelizeErrorHandler( err, errorMessages.messages );
        return res.status( 400 ).json( errorMessages );
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
            where: { email },
            include: [{ model: Tab, as: 'tabs' }]
        });

        if ( user ) {
            const isSame = await bcrypt.compare( password, user.hashedPassword );

            if ( isSame ) {
                const token = jwt.sign({ id: user.id }, process.env.secretKey, {
                    expiresIn: 1000 * 60 * 60 * 24
                });

                console.log( 'user', JSON.stringify( user, null, 2 ));
                console.log( 'token', token );

                const userData = {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    tabs: user.tabs
                };

                const userAndTokenData = {
                    token,
                    userData
                };
                console.log( userAndTokenData );

                return res.status( 200 ).json( userAndTokenData );
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
        sequelizeErrorHandler( err, errorMessages.messages );
        return res.status( 400 ).json( errorMessages );
    }
}

const getAllUsers = async ( req, res ) => {
    try {
        const users = await User.findAll({
            include: [{ model: Tab, as: 'tabs' }]
        });

        if ( users ) {
            const usersData = [];
            users.forEach( user => usersData.push({
                id: user.id,
                username: user.username,
                email: user.email,
                tabs: user.tabs
            }));

            return res.status( 200 ).json( usersData );
        } else {
            return res.status( 404 ).json({ error: 'Failed to retrieve all Users' });
        }
    } catch( err ) {
        const errorResponse = { messages: sequelizeErrorHandler( err ) };
        return res.status( 400 ).json( errorResponse );
    }
}

const getUserById = async ( req, res ) => {
    try {
        const userId = req.params.userId;

        const user = await User.findOne({
            where: { id: userId },
            include: [{ model: Tab, as: 'tabs' }]
        });

        if ( user ) {
            const userDatum = {
                id: user.id,
                username: user.username,
                email: user.email,
                tabs: user.tabs
            };

            return res.status( 200 ).json( userDatum );
        } else {
            return res.status( 404 ).json({ error: 'User not found' });
        }
    } catch( err ) {
        const errorResponse = { messages: sequelizeErrorHandler( err ) };
        return res.status( 400 ).json( errorResponse );
    }
}

const updateUser = async ( req, res ) => {
    const userId = req.params.userId;
    const { username } = req.body;

    try {
        const user = await User.findOne({
            where: { id: userId },
            include: [{ model: Tab, as: 'tabs' }]
        });

        if ( user ) {
            await user.update({
                username: username || user.username
            });

            await user.save();

            const userDatum = {
                id: user.id,
                username: user.username,
                email: user.email,
                tabs: user.tabs
            };

            return res.status( 200 ).json( userDatum );
        } else {
            return res.status( 404 ).json({ error: 'Failed to retrieve user to edit' });
        }
    } catch( err ) {
        const errorResponse = { messages: sequelizeErrorHandler( err ) };
        return res.status( 400 ).json( errorResponse );
    }
}


module.exports = {
    signup,
    login,
    getAllUsers,
    getUserById,
    updateUser
}