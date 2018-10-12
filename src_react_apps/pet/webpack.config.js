const path = require('path');
const webpack = require('webpack');

const { config } = require('../../webpack.config.global');
const babelSettings = {
    extends: path.join(__dirname, '..', '..','/.babelrc')
};
const currentModule = 'pet';

module.exports = () => {
    let entry = [ `./src_react_apps/${currentModule}/index.js` ];
    let loaders = [ 'babel?' + JSON.stringify(babelSettings) ];
    let plugins = [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin()
    ];
    config.entry = entry;
    config.output.path = path.join(__dirname, '..', '..', 'public', 'build_react_apps',`${currentModule}`),
    config.plugins = plugins;
    config.resolve.modulesDirectories = ['./node_modules', `./src_react_apps/${currentModule}/`];
    config.module.loaders.push({
      test: /\.js?$/,
      exclude: /node_modules/,
      loaders: loaders,
    });
    return config;
};
