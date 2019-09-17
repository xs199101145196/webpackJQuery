/*
 * @Author: niuhangkai 
 * @Date: 2019-08-25 16:43:33 
 * @Last Modified by: niuhangkai
 * @Last Modified time: 2019-08-26 12:02:34
 */
const webpackBaseConfig = require('./webpack.base.conf')
const merge = require('webpack-merge')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')

const webpackConfigProd = merge(webpackBaseConfig, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    // 打包多出口文件
    filename: 'js/[name].[chunkhash:8].js',
    publicPath: './'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ExtractTextPlugin({
      filename: "css/[name].[chunkhash:8].min.css"
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    })
  ]
})
module.exports = webpackConfigProd