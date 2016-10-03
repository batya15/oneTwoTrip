var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var nested = require('postcss-nested');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        'babel-polyfill',
        'app.js'
    ],
    resolve: {
        modulesDirectories: ['node_modules', 'src'],
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: path.join(__dirname, 'bin'),
        filename: 'bundle.min.js'
    },
    module: {
        loaders: [
            { test: /\.json$/, loader: 'json' },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract([
                    'css?modules&importLoaders=1&localIdentName=[local]__--[path]',
                    'postcss'
                ])
            }
        ]
    },
    postcss: function () {
        return [
            require('postcss-for'),
            require('postcss-import')({
                path: __dirname + '/src/styles/',
                addDependencyTo: webpack
            }),
            nested,
            require('postcss-simple-vars'),
            require('postcss-color-function'),
            autoprefixer('last 5 versions')
        ];
    },
    plugins: [
        new ExtractTextPlugin('styles.min.css'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
