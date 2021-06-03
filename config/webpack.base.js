const merge = require('webpack-merge');

// TODO: webpack 打包部分可以用 @hlj/webpack 库优化

const Appconfig = path => ({
  entry: {
    main: './src/index.tsx'
  },
  output: {
    path: path + '/dist',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      '@': path + '/src'
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [require('autoprefixer')]
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|ttf|eot|woff|woff2)$/,
        use: {
          loader: 'url-loader',
          options: {
            esModule: false,
            name: '[name]_[hash].[ext]',
            outputPath: 'imgs/',
            limit: 2048
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          'css-hot-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [require('autoprefixer')]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.tsx?$/,
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: path + '/src',
        use: ['happypack/loader?id=babel']
      }
    ]
  },
  optimization: {
    /* 代码分割 */
    splitChunks: {
      chunks: 'all'
    }
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html'
    }),
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    /* 多线程编译 */
    new HappyPack({
      id: 'babel',
      loaders: ['babel-loader?cacheDirectory'],
      verbose: false
    })
  ]
});

const runMergeGetConfig = path => type =>
  type === 'start'
    ? merge(Appconfig(path), devConfig(path))
    : merge(Appconfig(path), proConfig);

module.exports = runMergeGetConfig;
