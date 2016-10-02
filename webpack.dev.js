var path = require('path');
var webpack = require('webpack');
var autoprefixer = require('autoprefixer');
var nested = require('postcss-nested');

module.exports = {
    //devtool: 'inline-source-map',
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
        filename: 'bundle.js'
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
                loaders: [
                    'style',
                    'css?sourceMap&modules&importLoaders=1&localIdentName=[local]__--[path]',
                    'postcss?sourceMap'
                ]
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
        /*new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()*/
    ]
};
