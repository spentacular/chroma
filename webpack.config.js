var webpack = require('webpack')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: './index.js',

  output: {
    filename: 'bundle.js',
    path: __dirname
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.json$/, loader: 'json-loader', exclude: /node_modules/ },
      { test: /\.svg/, loader: 'svg-url-loader' }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ]
}
