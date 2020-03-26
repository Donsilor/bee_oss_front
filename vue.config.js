const path = require('path')
const isProduction = process.env.NODE_ENV !== 'development'
// 导入compression-webpack-plugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

function resolve (dir) {
  return path.join(__dirname, dir)
}
let plugins = [new BundleAnalyzerPlugin()]
if (isProduction) {
  const productionGzipExtensions = ['html', 'js', 'css']
  plugins.push(new UglifyJsPlugin({
    uglifyOptions: {
      // 生产环境自动删除console
      compress: {
        drop_debugger: true,
        drop_console: true,
        pure_funcs: ['console.log']
      }
    },
    sourceMap: false,
    parallel: true
  }))
  plugins.push(new CompressionWebpackPlugin({
    filename: '[path].gz[query]',
    algorithm: 'gzip',
    test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
    threshold: 10240, // 只有大小大于该值的资源会被处理 10240
    minRatio: 0.8, // 只有压缩率小于这个值的资源才会被处理
    deleteOriginalAssets: false // 删除原文件
  }))
}

module.exports = {
  productionSourceMap: !isProduction,
  devServer: {
    open: true,
    proxy: {
      '/api/index.php/*': {
        // target: 'http://beeossdev.egtest.cn:7777', // 开发环境
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
    config.resolve.alias // 设置别名
      .set('@', resolve('src'))
      .set('~', resolve('src'))
      .set('@img', resolve('src/assets/images'))
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
    // // 开启图片压缩
    // config.module.rule('images')
    //   .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
    //   .use('image-webpack-loader')
    //   .loader('image-webpack-loader')
    //   .options({ bypassOnDebug: true })
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/assets/css/common.less')] // 引入全局样式变量
    }
  }
}
