const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: './server/indexSSR.jsx',

  target: 'node',
  node: { __dirname: false },

  externals: [nodeExternals()],

  output: {
    path: path.resolve('client/dist'),
    filename: 'index.js',
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-syntax-jsx'],
          },
        },
      },
      {
        test: /\.css$/,
        use: [
          'isomorphic-style-loader',
          { loader: 'css-loader', options: { modules: true, importLoaders: 1 } },
        ],
      },
    ],
  },

  resolve: { extensions: ['.js', '.jsx'] },
};
