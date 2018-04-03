const path = require('path');

module.exports = {
    entry: {
        app: './src/index.js',
    },
    output: {
        publicPath: '/public/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: "./public",
        hot: true
    },
    module: {
        loaders: [
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        },
                    },
                ],
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
