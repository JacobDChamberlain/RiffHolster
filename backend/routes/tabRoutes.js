const express = require('express');
const tabController = require('../controllers/tabController');
const { getAllTabs, getTabByTabId, getTabsByUserId, createTab, updateTab, deleteTab } = tabController;


const router = express.Router();

router.post( '/', createTab );

router.get( '/', getAllTabs );

router.get( '/:tabId', getTabByTabId );

router.get( '/users/:userId', getTabsByUserId );

router.put( '/:tabId', updateTab );

router.delete( '/:tabId', deleteTab );


module.exports = router;