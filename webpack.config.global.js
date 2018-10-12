const path = require("path");
const combineLoaders = require('webpack-combine-loaders');
const babelSettings = {
  extends: path.join(__dirname, '..', '..', '/.babelrc')
};
var loaders = ["babel?" + JSON.stringify(babelSettings)];
module.exports = {
  config: {
    devtool: "cheap-module-source-map",
    entry: [],
    output: {
      publicPath: "/",
      filename: "bundle.js"
    },

    devServer: {
      headers: {
        "Access-Control-Allow-Origin": "*"
      }
    },

    module: {
      loaders: [{
          test: /\.css$/,
          loader: combineLoaders([{
            loader: 'style-loader'
          }, {
            loader: 'css-loader',
            query: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[local]'
            }
          }])
        },
        {
          test: /\.(png|jpg)$/,
          loader: 'url-loader'
        },
      ]
    },

    resolve: {
      modulesDirectories: []
    },
  }
}