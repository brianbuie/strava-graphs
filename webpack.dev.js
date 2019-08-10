const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'client/public'),
        port: 3000,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        host: '0.0.0.0',
        disableHostCheck: true
    },
    devtool: 'source-map'
});
