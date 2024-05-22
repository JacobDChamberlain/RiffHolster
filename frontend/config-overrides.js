const path = require('path')
const { AlphaTabWebPackPlugin } = require('@coderline/alphatab/webpack');

module.exports = function override(config, env) {
    if ( !config.plugins ) {
        config.plugins = [];
    }

    config.plugins.push( new AlphaTabWebPackPlugin({
        alphaTabSourceDir: path.resolve('./node_modules/@coderline/alphatab/dist')
    }));

    return config;
}