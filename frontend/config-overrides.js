const { AlphaTabWebPackPlugin } = require('@coderline/alphatab/webpack');
const { addWebpackPlugin, override } = require('customize-cra');

module.exports = override(
    addWebpackPlugin(
        new AlphaTabWebPackPlugin()
    )
);