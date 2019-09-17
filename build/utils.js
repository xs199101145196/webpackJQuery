/*
 * @Author: niuhangkai 
 * @Date: 2019-08-25 22:13:37 
 * @Last Modified by: niuhangkai
 * @Last Modified time: 2019-08-26 16:05:19
 */


const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require("glob");
const path = require('path');


function resove (dir) {
  return path.join(__dirname, '..', dir);
}

function getEntry () {
  let entrys = {}
  let pathSrc = 'src/pages/**/*.js'
  let filePath = glob.sync(pathSrc)
  // [ 'src/pages/about/about.js', 'src/pages/home/home.js' ]
  filePath.map((val) => {
    let entry = val.replace(/^src\/pages\/.*\//, '')
    let name = entry.split('.')[0]
    // { about: 'src/pages/about/about.js', home: 'src/pages/home/home.js' }
    entrys[name] = resove(val)
  })
  // entrys.vendor = ['normalize.css', 'jquery']
  return entrys
}
function htmlPlugins () {
  let htmlArr = []
  Object.keys(getEntry()).map((page) => {
    // if (page === 'vendor') return
    htmlArr.push(
      new HtmlWebpackPlugin({
        filename: `${page}.html`,
        template: `./src/pages/${page}/${page}.html`,
        inject: true,
        // 通过配置chunk让html引入自己的js文件 
        chunks: ['vendor', 'common', page],
        title: '瑞鹏官网',
        // favicon: path.resolve('favicon.ico')
        minify: process.env.NODE_ENV === "development" ? false : {
          removeComments: true, //移除HTML中的注释
          collapseWhitespace: true, //折叠空白区域 也就是压缩代码
          removeAttributeQuotes: true, //去除属性引用
        },
      })
    )
  })
  return htmlArr
}
module.exports = {
  getEntry,
  htmlPlugins
}