const path = require("path");
const webpack = require("webpack");
const combineLoaders = require('webpack-combine-loaders');

const babelSettings = {
    extends: path.join(__dirname, '..', '..','/.babelrc')
};

module.exports = (opts) => {
    var entry = [ "./src_react_apps/cperezv/index.js" ];
    var loaders = [ "babel?" + JSON.stringify(babelSettings) ];
    var plugins = [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin()
    ];

    if (opts.devserver) {
        loaders.unshift("react-hot");
        entry.unshift(
            "webpack-dev-server/client?http://0.0.0.0:8080",
            "webpack/hot/only-dev-server" // "only" prevents reload on syntax errors
        );
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }

    var config = {
        devtool: "cheap-module-source-map",
        entry: entry,
        output: {
            path: path.join(__dirname, '..', '..', 'public', 'build_react_apps','cperezv'),
            publicPath: "/",
            filename: "bundle.js"
        },

        devServer: {
           headers: { "Access-Control-Allow-Origin": "*" }
        },

        plugins: plugins,
        module: {
          loaders: [
            {
              test: /\.css$/,
              loader: combineLoaders([
                {
                  loader: 'style-loader'
                }, {
                  loader: 'css-loader',
                  query: {
                    modules: true,
                    importLoaders: 1,
                    localIdentName: '[local]'
                  }
                }
              ])
            },
            {
              test: /\.(png|jpg)$/,
              loader: 'url-loader'
            },
            {
              test: /\.js?$/,
              loaders: loaders,
              exclude: /node_modules/,
            }
          ]
        },

        resolve: {
            modulesDirectories: ["./node_modules", "./src_react_apps/cperezv/"]
        },
    };

    return config;
};
