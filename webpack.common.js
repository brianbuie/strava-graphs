const path = require('path');
const BundleSizePlugin = require('webpack-bundle-size-analyzer').WebpackBundleSizeAnalyzerPlugin;
const EnvironmentPlugin = require('webpack').EnvironmentPlugin;

if (process.env.ENV_FILE) require('dotenv').config();

module.exports = {
  entry: './client/src/index',
  output: {
    path: path.resolve(__dirname, 'client/public/dist'),
    filename: 'bundle.js'
  },
  resolve: {
    mainFiles: ['index'],
    modules: [path.resolve(__dirname, 'client/src'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  plugins: [new BundleSizePlugin('./size-report.txt'), new EnvironmentPlugin(process.env)]
};
