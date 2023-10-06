const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');


const User = db.User;

const signup = async ( req, res ) => {
    console.log('signup');
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