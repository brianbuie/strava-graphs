const path = require('path');
const BundleSize = require('webpack-bundle-size-analyzer').WebpackBundleSizeAnalyzerPlugin;

module.exports = {
  entry: './client/src/index',
  output: {
    path: path.resolve(__dirname, 'client/dist'),
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
  plugins: [new BundleSize('./size-report.txt')]
};
