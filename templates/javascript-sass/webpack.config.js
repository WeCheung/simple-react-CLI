const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const webpack = require('webpack')
const autoprefixer = require('autoprefixer')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// CSS 压缩插件
const OptimizeCSSAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
// JS 压缩插件
const TerserWebpackPlugin = require('terser-webpack-plugin')
// 优化 webpack 打印信息
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')


const config = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './src/'),
    publicPath: '/',
    port: 3000,
    stats: {
      colors: true
    },
    hot: true,
    quiet: true
  },
  entry: ['./src/index.tsx'],
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'js/[name].js',
  },
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
  },
  module: {
    // noParse: [],
    rules: [
      {
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$/,//打包的文件类型
        use: [
          {
            loader: 'url-loader',//使用url-loader对文件打包
            options: {
              name:'[name].[ext]',//通过占位符，设置打包后文件的名字，
              outputPath: 'images/',
              limit: 2048 //多少个字节内把图片转换为base64，1kb=1024byte
            }
          }
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              require.resolve('@babel/preset-react'),
              [require.resolve('@babel/preset-env'), {modules: false}]
            ],
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.css$/,
        exclude: [path.resolve(__dirname, 'node_modules')],
        use: [
          // 把 css文件 抽取到单独的目录
          {
            loader: MiniCssExtractPlugin.loader,
          },
          // 'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            },
          },
        ],
        include: /\.module\.css$/
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          'css-loader'
        ],
        exclude: /\.module\.css$/
      },
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              // Prefer `dart-sass`
              implementation: require('sass'),
            },
          },
        ],
      }
    ]
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    // new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico',
      filename: 'index.html',
      // inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
      chunkFilename: '[name].[hash:5].css'
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss() {
          return [autoprefixer]
        }
      }
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      // CSS 压缩
      new OptimizeCSSAssetsWebpackPlugin(),
      // JS 压缩
      new TerserWebpackPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ],
  }
}

// 优化匹配路径
// const deps = [
//   'react/dist/react.min.js',
// ]
// const node_modules = path.join(__dirname, 'node_modules')

// deps.forEach((dep) => {
//   const depPath = path.resolve(node_modules, dep)
//   config.resolve.alias[dep.split(path.sep)[0]] = depPath
//   config.module.noParse.push(depPath)
// })

module.exports = config
