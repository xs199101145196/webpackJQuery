/*
 * @Author: niuhangkai
 * @Date: 2019-08-24 16:26:56
 * @Last Modified by: niuhangkai
 * @Last Modified time: 2019-08-26 17:10:59
 */
'use strict'
const path = require('path');
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const devWebpackConfig = merge(baseConfig, {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "[name].[hash:8].js",
    publicPath: './'
  },
  devServer: {
    clientLogLevel: 'warning',
    watchContentBase: true,
    publicPath: '/',
    host: "127.0.0.1",
    port: "8080",
    quiet: true,
    compress: true,
    overlay: true, // 浏览器页面上显示错误
    // open: true, // 开启浏览器
    // stats: "errors-only", //stats: "errors-only"表示只打印错误：
    // notifyOnErrors: true,
    //服务器代理配置项
    proxy: {
      '/testing/*': {
        target: 'https://www.baidu.com',
        secure: true,
        changeOrigin: true
      }
    }
  },
  plugins: [
    // new ExtractTextPlugin("../dist/css/[name].css")
    new ExtractTextPlugin({
      filename: "css/[name].[hash:8].css",
      allChunks: true
    }),
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = devWebpackConfig.devServer.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // 自动切换占用端口
      devWebpackConfig.devServer.port = port
      // 编译完成提示
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
      }))
      resolve(devWebpackConfig)
    }
  })
})
