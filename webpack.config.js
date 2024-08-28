const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: ['./index.web.js'], 
  devServer: {
    hot: true,
    static: path.join(__dirname, 'public'), 
    port: 8080
  },
  optimization: {
    moduleIds: 'named',
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Handle .js and .jsx files
        // exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              'module:@react-native/babel-preset',
            ],
          },
        },
      },
      {
        test: /\.svg$/,
        include: path.resolve(
          __dirname,
          'node_modules/expo-linear-gradient/',
          'node_modules/@expo'
        ),
        use: [
          {
            loader: '@svgr/webpack',
          },
          {
            loader: 'url-loader', // Fallback for importing SVGs as URLs
          },
          {
            loader: 'file-loader', // Fallback for larger files
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/, // For font and image files
        loader: 'url-loader',
        options: {
          limit: 8192, // Inline files smaller than 8KB, otherwise fall back to file-loader
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader', // or directly file-loader
        // include: path.resolve(
        //   __dirname,
        //   'node_modules/react-native-vector-icons',
        //   'node_modules/@expo'
        // ),
        options: {
          name: '[name].[ext]',
          outputPath: 'fonts/', // Specify the directory to output fonts
          publicPath: '/fonts/', // Adjust path if necessary
        },
      },
    ],
  },
  resolve: {
    alias: {
      'react-native': 'react-native-web',
      'react-native-svg': 'react-native-svg-web', // To handle SVG in web
    },
    extensions: ['.web.js', '.js', '.web.jsx', '.jsx'],
    mainFields: ['browser', 'main'],
    fallback: {
    "crypto": false, // Use an empty module for crypto
  },
  },
};
