var path = require('path')
var webpack = require('webpack')
const entryDir = path.join(__dirname, "/src/entry")
const baseDir = path.join(__dirname, "/src/base")
const copyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
  watch: true,
  entry:{
    "main":path.join(entryDir,"main.js"),
    "detail":path.join(entryDir,"detail.js"),
    "movieList":path.join(entryDir,"movieList.js"),
    "viewer":path.join(entryDir,"viewer.js"),
    "vendor":["vue", "element-ui","echarts",path.join(baseDir, "util.js"),path.join(baseDir, "api.js")],
  },
  output: {
    path: __dirname + "/dist/js",
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        },
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg|woff|ttf)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
        name: ["vendor", "manifest"],
    }),
    new copyWebpackPlugin([
      {from: "./src/assets", to: "../imgs"},
      {from: "./src/template", to: "../html"},
    ]),
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    host: "0.0.0.0",
    contentBase: "./dist",
    compress: true,
    port: 8080,
    disableHostCheck: true,
    hot: true,
    proxy: {
      '/api': {
          //pathRewrite: {"^/api": ""},
          target: 'http://localhost:9999',
          secure: false,
          changeOrigin: true,
        }
    }
  },

  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
