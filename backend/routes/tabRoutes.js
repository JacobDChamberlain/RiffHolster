const express = require('express');
const tabController = require('../controllers/tabController');
const { getAllTabs, getTabById, getTabsByUserId, createTab, updateTab, deleteTab } = tabController;


const router = express.Router();

router.post( '/', createTab );

router.get( '/', getAllTabs );

router.get( '/:tabId', getTabById );

router.get( '/users/:userId', getTabsByUserId );

router.put( '/:tabId', updateTab );

router.delete( '/:tabId', deleteTab );


module.exports = router;