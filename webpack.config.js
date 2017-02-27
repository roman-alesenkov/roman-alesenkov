module.exports = {

    entry: './js/index.js',

    output: {
        filename: './js/bundle.js',
        publicPath: ''
    },

    module: {
        preLoaders: [
            // Javascript
            //{ test: /\.jsx?$/, loader: 'eslint', exclude: /node_modules/ }
        ],
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=stage-0&presets[]=react' }
        ]
    },

    eslint: {
        failOnWarning: false,
        failOnError: false
    }
};
