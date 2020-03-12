const path = require('path')
const webpack = require('webpack')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

// 导入compression-webpack-plugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css']
function resolve (dir) {
  return path.join(__dirname, dir)
}

let plugins = [
  new webpack.DllReferencePlugin({
    context: process.cwd(),
    manifest: require('./public/vendor/vendor-manifest.json')
  }),
  // 将 dll 注入到 生成的 html 模板中
  new AddAssetHtmlPlugin({
    // dll文件位置
    filepath: path.resolve(__dirname, './public/vendor/*.js'),
    // dll 引用路径
    publicPath: './vendor',
    // dll最终输出的目录
    outputPath: './vendor'
  })]
if (process.env.NODE_ENV === 'production') {
  plugins.push(new CompressionWebpackPlugin({
    filename: '[path].gz[query]',
    algorithm: 'gzip',
    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'), // 匹配文件名
    threshold: 10240, // 对10K以上的数据进行压缩
    minRatio: 0.8,
    deleteOriginalAssets: false// 是否删除源文件
  }))
}
module.exports = {
  devServer: {
    open: true,
    proxy: {
      '/api/index.php/*': {
        // target: 'http://beeossdev.egtest.cn:7777', //开发环境
        target: 'http://beeoss.egtest.cn:7777', // 测试环境
        // target: 'http://beeoss.evergrande.com',
        changeOrigin: true
        /* pathRewrite: {
                      '^/api': ''
                    } */
      },
      '/api.php': {
        target: 'http://iot-dev-upgrade-center-tice.egtest.cn:9000',
        changeOrigin: true,
        onProxyReq: function (proxyReq, req, res) {
          proxyReq.setHeader('Origin', 'http://beeoss.egtest.cn:7777')
          proxyReq.setHeader('Content-Type', 'application/json;charset=UTF-8')
        }
      }
    }
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    loaderOptions: {
      postcss: {
        plugins: [
          require('postcss-pxtorem')({
            rootValue: 30, // 换算的基数
            selectorBlackList: ['el', 'eric'], // 忽略转换正则匹配项
            propList: ['*'] // 属性的选择器，*表示通用
          })
        ]
      }
    }
  },
  configureWebpack: {
    plugins
  },
  chainWebpack: config => {
    // 公共资源提取，
    // vendors提取的是第三方公共库(满足提取规则的node_modules里面的且页面引入的)，这些文件会打到dist/js/chunk-vendors.js里面
    // 提取规则是每个页面都引入的才会打到chunk-vendors.js里面(如vue.js)
    // 控制条件是minChunks字段，所以该字段的值是当前activity/src/projects里面的html的个数
    // common提取的应该是除了vendors提取后，剩余的满足条件的公共静态模块
    // 我们的项目不需要common，所以将common置为{}，覆盖默认common配置
    config.optimization.splitChunks({
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          minChunks: 1,
          test: /node_modules/,
          priority: -10,
          chunks: 'initial'
        },
        common: {}
      }
    })
    config.resolve.alias // 设置别名
      .set('@', resolve('src'))
      .set('~', resolve('src'))
      .set('@img', resolve('src/assets/images'))
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/assets/css/common.less')] // 引入全局样式变量
    }
  }
}
