const db = require('../models');


const Tab = db.Tab;

const createTab = async ( req, res ) => {
    try {
        const { name, fileURL, userId } = req.body;
        const data = {
            name,
            fileURL,
            userId
        };

        const tab = await Tab.create( data );

        if ( tab ) {
            const tabDatum = {
                id: tab.id,
                name: tab.name,
                fileURL: tab.fileURL,
                userId: tab.userId
            };

            return res.status( 200 ).send( tabDatum );
        } else {
            return res.status( 409 ).send( 'Failed to post Tab' );
        }
    } catch ( err ) {
        console.log( err );
    }
}

const getAllTabs = async ( req, res ) => {
    try {
        const tabs = await Tab.findAll();

        if ( tabs ) {
            const tabsData = [];
            tabs.forEach( tab => tabsData.push({
                id: tab.id,
                name: tab.name,
                fileURL: tab.fileURL,
                userId: tab.userId
            }));

            return res.status( 200 ).send( tabsData );
        } else {
            return res.status( 400 ).send( 'Failed to retrieve all Tabs' );
        }
    } catch ( err ) {
        console.log( err );
    }
}

const getTabById = async ( req, res ) => {
    const tabId = req.params.tabId;

    try {
        const tab = await Tab.findOne({
            where: {
                id: tabId
            }
        });

        if ( tab ) {
            const tabDatum = {
                id: tab.id,
                name: tab.name,
                fileURL: tab.fileURL,
                userId: tab.userId
            }

            return res.status( 200 ).send( tabDatum );
        } else {
            return res.status( 404 ).send( 'Tab not found' );
        }
    } catch ( err ) {
        console.log( err );
    }
}

const getTabsByUserId = async ( req, res ) => {
    const userId = req.params.userId;

    try {
        const tabs = await Tab.findAll({
            where: {
                userId: userId
            }
        });

        if ( tabs ) {
            const tabsData = [];
            tabs.forEach( tab => tabsData.push({
                id: tab.id,
                name: tab.name,
                fileURL: tab.fileURL,
                userId: tab.userId
            }));

            return res.status( 200 ).send( tabsData );
        } else {
            return res.status( 400 ).send( 'Failed to retrieve all User\'s Tabs' );
        }
    } catch ( err ) {
        console.log( err );
    }
}

const updateTab = async ( req, res ) => {
    const tabId = req.params.tabId;
    const { name, fileURL } = req.body;

    try {
        const tab = await Tab.findOne({
            where: {
                id: tabId
            }
        });

        if ( tab ) {
            await tab.update({
                name: name || tab.name,
                fileURL: fileURL || tab.fileURL
            });

            await tab.save();

            const tabDatum = {
                id: tab.id,
                name: tab.name,
                fileURL: tab.fileURL,
                userId: tab.userId
            };

            return res.status( 200 ).send( tabDatum );
        } else {
            return res.status( 404 ).send( 'Failed to retrieve Tab to edit' );
        }
    } catch ( err ) {
        console.log( err );
    }
}

const deleteTab = async ( req, res ) => {
    const tabId = req.params.tabId;

    try {
        const tab = await Tab.findOne({
            where: {
                id: tabId
            }
        });

        if ( tab ) {
            await tab.destroy();

            return res.status( 200 ).send( 'Tab deleted' );
        } else {
            return res.status( 404 ).send( 'Failed to retrieve Tab to delete' );
        }
    } catch ( err ) {
        console.log( err );
    }
}


module.exports = {
    createTab,
    getAllTabs,
    getTabById,
    getTabsByUserId,
    updateTab,
    deleteTab
}