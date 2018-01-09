import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const commonExtractCss = new ExtractTextPlugin('common.css'),
  projectExtractCss = new ExtractTextPlugin('app.css')

const CLIENT_PATH = path.resolve(process.cwd(), './')

export default {
  name: 'client',
  devtool: 'cheap-module-source-map',
  context: CLIENT_PATH,
  target: 'web',
  entry: ['./src/index.js'],
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    publicPath: '/',
    pathinfo: true,
    filename: 'assets/js/bundle.js',
    chunkFilename: 'assets/js/[name].chunk.js',
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      '@': path.resolve(CLIENT_PATH, './src'),
      '~': path.resolve(CLIENT_PATH, './'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: CLIENT_PATH,
        options: {
          ignore: false,
          useEslintrc: true,
        },
      },
      {
        oneOf: [
          {
            test: /\.(png|jpe?g|gif|bmp|svg)$/,
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'assets/media/[name].[hash:8].[ext]',
            },
          },
          {
            test: /\.(png|woff|woff2|eot|ttf|svg)$/,
            loader: 'url-loader?limit=100000',
          },
          {
            test: /\.(js|jsx)$/,
            loader: 'babel-loader',
            include: CLIENT_PATH,
            options: {
              compact: false,
              cacheDirectory: true,
            },
          },
          {
            test: /\.css$/,
            use: projectExtractCss.extract({
              fallback: 'style-loader',
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 1,
                    modules: true,
                    sourceMap: true,
                    camelCase: true,
                    localIdentName: '[path][name]__[local]--[hash:base64:8]',
                  },
                },
              ],
            }),
          },
          {
            test: /\.less$/,
            use: commonExtractCss.extract({
              fallback: 'style-loader',
              use: [
                'css-loader',
                {
                  loader: 'less-loader',
                  options: { modifyVars: { 'primary-color': 'black' } },
                },
              ],
            }),
          },
          {
            exclude: [/\.js$/, /\.html$/, /\.json$/],
            loader: 'file-loader',
            options: {
              name: 'assets/media/[name].[hash:8].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: process.env.NODE_ENV,
    }),
    commonExtractCss,
    projectExtractCss,
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(CLIENT_PATH, 'public/index.html'),
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    hot: true,
    port: 3000,
  },
}
