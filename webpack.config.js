const path = require('path')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const extractCss = new ExtractTextPlugin('stylesheet/[name]-global.css')
const extractSass = new ExtractTextPlugin('stylesheet/[name]-theme.css')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/dist',
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: extractCss.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.scss$/,
        use: extractSass.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            scss: 'vue-style-loader!css-loader'
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'file-loader'
        }
      }
    ]
  },
  plugins: [
    extractCss,
    extractSass,
    new CleanWebpackPlugin(['./dist']),
    new HtmlWebpackPlugin({
      title: 'egg project',
      template: './index.html'
    })
  ]
}