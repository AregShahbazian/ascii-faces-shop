var path = require('path');

module.exports = {
    entry: {
        app: './public/index.js',
    },
    output: {
        path: __dirname,
        filename: 'public/[name].bundle.js'
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
                include: /node_modules/,
                loaders: ['style-loader', 'css-loader'],
            },
            {
                test: /\.less$/,
                loader: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.scss/,
                loader: ['style-loader', 'css-loader', 'scss-loader']
            },
            {
                test: /\.png$/,     // Use url-loader for smaller images - Base64 encrypted, in Webpack Dev Server memory
                loader: "url-loader?limit=100000&name=/dist/img/[name].[ext]"
            },
            {
                test: /\.jpe?g$/,   // Use file-loader for larger images - no Base64 encryption
                loader: "file-loader?name=/dist/img/[name].[ext]"
            },
            {
                test: /\.(gif|ttf|eot|svg|woff2?)$/,
                loader: 'url-loader?name=[name].[ext]'
            }
        ]
    },
    stats: {
        colors: true
    },
    devtool: 'source-map'
};
