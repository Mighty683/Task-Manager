const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const minimist = require('minimist')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html'
})
let env = minimist(process.argv.slice(2)).env
let analyze = env && env.analyze
let plugins = [htmlPlugin]
if (analyze) {
  plugins.push(new BundleAnalyzerPlugin())
}

module.exports = {

  module: {
    rules: [
      { test: /\.html$/,
        use: [ { loader: 'html-loader' } ]
      },
      { test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' }
        ]
      },
      { test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  plugins: plugins,
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve('build'),
    hot: true
  }
}
