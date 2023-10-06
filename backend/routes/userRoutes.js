const express = require('express');
const userController = require( '../controllers/userController' );
const { getAllUsers, getUserById, signup, login, logout } = userController;
// const { getAllUsers, getUserById, signup, login, logout } = require( '../controllers/userController.js' );


const router = express.Router();

router.get( '/', getAllUsers );

router.get( '/:userId', getUserById );

router.post( '/signup', signup );

router.post( '/login', login );

router.post( '/logout', logout );

module.exports = router;