const express = require('express');
const userController = require( '../controllers/userController' );
const { getAllUsers, getUserById, signup, login, updateUser } = userController;


const router = express.Router();

router.get( '/', getAllUsers );

router.get( '/:userId', getUserById );

router.post( '/signup', signup );

router.post( '/login', login );

router.put( '/:userId', updateUser );

module.exports = router;