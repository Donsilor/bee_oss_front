const path = require('path')
const resolve = require('path').resolve
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')
const WebpackNotifierPlugin = require('webpack-notifier')
const publicPath = ''
const projectRoot = process.cwd()

module.exports = (options = {}) => ({
  entry: {
    vendor: './src/vendor',
    index: ['babel-polyfill', './src/main.js']
  },
  output: {
    path: resolve(__dirname, 'dist'),
    filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
    chunkFilename: '[id].js?[chunkhash]',
    publicPath: options.dev ? '/assets/' : publicPath
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      // 引入 eslint检查报告的格式规范
      // {
      //   test: /\.(js|vue)$/,
      //   loader: 'eslint-loader',
      //   enforce: 'pre',
      //   //指定检查的目录
      //   include: [resolve(__dirname, 'src')],
      //   options: {
      //     configFile: path.join(projectRoot, '.eslintrc.js'),
      //     formatter: require('eslint-friendly-formatter')
      //   }
      // },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new WebpackNotifierPlugin({
      title: 'Notify',
      excludeWarnings: true,
      skipFirstNotification: true
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV':  JSON.stringify(process.env.NODE_ENV)
    })
  ],
  resolve: {
    //extensions: ['', '.js', '.vue'],
    alias: {
      '~': resolve(__dirname, 'src'),
      '@': resolve(__dirname, 'src')
    }
  },
  devServer: {
    host: 'localhost',
    port: 9999,
    open: true,
    proxy: {
      '/api/index.php/*': {
        // target: 'http://beeossdev.egtest.cn:7777',
        target: 'http://beeoss.egtest.cn:7777',
        // target: 'http://beeoss.evergrande.com',
        changeOrigin: true
        /*pathRewrite: {
				    '^/api': ''
				  }*/
      },
      '/api.php': {
        target: 'http://iot-dev-upgrade-center.egtest.cn:7777',
        changeOrigin: true
        /*pathRewrite: {
				      '^/api': ''
				    }*/
      }
      // '/oss_file_upload': {
      //     target: 'http://iot-dev-upgrade-center.egtest.cn:7777',
      //     changeOrigin: true
      //     /*pathRewrite: {
      //       '^/api': ''
      //     }*/
      // }
    },
    historyApiFallback: {
      index: url.parse(options.dev ? '/assets/' : publicPath).pathname
    }
  },
  devtool: options.dev ? '#eval-source-map' : '#source-map'
})
