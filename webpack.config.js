var path = require("path");

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist/js/'),
        filename: 'ToastController.min.js',
        library: 'ToastController'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)|(dist)/,
                loader: "babel-loader",
                options: {
                    presets: ['env']
                }
            }
        ]
    },
    resolve: {
        modules: [
            path.resolve('./src'),
            path.resolve('./node_modules')
        ]
    }
};
