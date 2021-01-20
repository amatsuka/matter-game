let path = require("path");

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]/*,
        loaders: [
            { test: /\.css$/, loader: "style-loader!css-loader" }
        ]*/
    },
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ]
    },
};
