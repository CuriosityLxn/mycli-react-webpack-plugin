const webpack = require('webpack');
const RuxConsolePlugin = require('../plugins/rux-console-pulgin');
const devConfig = path => {
  return {
    devtool: 'cheap-module-eval-source-map',
    mode: 'development',
    devServer: {
      contentBase: path + '/dist',
      open: true,
      hot: true,
      historyApiFallback: true,
      publicPath: '/',
      port: 9000,
      inline: true,
      proxy: {} // 代理服务器有需要再配
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new RuxConsolePlugin({
        dec: 1
      })
    ]
  };
};

module.exports = devConfig;
