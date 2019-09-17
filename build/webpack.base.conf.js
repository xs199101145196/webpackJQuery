/*
 * @Author: niuhangkai 
 * @Date: 2019-08-25 16:45:24 
 * @Last Modified by: niuhangkai
 * @Last Modified time: 2019-08-26 17:59:34
 */

const { getEntry, htmlPlugins } = require('./utils')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')

const base = {
  entry: getEntry(),
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: "babel-loader"
          }
        ]
      },
      {
        // process.env.NODE_ENV === "development" ? ["style-loader", "css-loader", "postcss-loader", "less-loader"] dev不抽离样式
        test: /\.(css|less)$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "less-loader", "postcss-loader"],
          // css中的基础路径
          publicPath: "./"
        })
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          // 需要下载url-loader
          loader: "url-loader",
          options: {
            limit: 5 * 1024, //小于这个时将会已base64位图片打包处理
            // 图片文件输出的文件夹
            publicPath: "../img",
            outputPath: "img",
            name: '[name].[hash:7].[ext]'
          }
        }]
      },
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: { // 抽离第三方插件
          test: /node_modules/, // 指定是node_modules下的第三方包
          chunks: 'initial',
          name: 'vendor', // 打包后的文件名，任意命名    
          // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          priority: 10
        },
        utils: { // 抽离自己写的公共代码，common这个名字可以随意起
          chunks: 'initial',
          name: 'common', // 任意命名
          minSize: 0, // 只要超出0字节就生成一个新包
          minChunks: 2
        }
      }
    }
  },
  plugins: [
    ...htmlPlugins(),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      jquery: "jquery",
      "window.jQuery": "jquery"
    })
  ]
}
base.entry.vendor = ['normalize.css', 'jquery']
module.exports = base