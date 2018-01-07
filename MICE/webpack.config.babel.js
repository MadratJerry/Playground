import path from 'path'
import webpack from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'

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
            use: [
              'style-loader',
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  modules: true,
                  sourceMap: true,
                  camelCase: true,
                },
              },
            ],
          },
          {
            test: /\.less$/,
            loader: ['style-loader', 'css-loader', 'less-loader'],
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
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(CLIENT_PATH, 'public/index.html'),
    }),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3000,
  },
}
