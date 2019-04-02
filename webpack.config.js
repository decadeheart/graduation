var path = require('path')
var webpack = require('webpack')
const entryDir = path.join(__dirname, "/src/entry")
const copyWebpackPlugin = require("copy-webpack-plugin")

module.exports = {
  entry:{"main":path.join(entryDir,"main.js")},
  output: {
    path: __dirname + "/dist/js",
    filename: '[name].js'
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
    proxy: {
      '/api': {
          pathRewrite: {"^/api": ""},
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
