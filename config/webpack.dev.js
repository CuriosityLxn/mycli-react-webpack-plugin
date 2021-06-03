const webpack = require('webpack');
const MycliConsolePlugin = require('../plugin');
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
      new MycliConsolePlugin({
        dec: 1
      })
    ]
  };
};

module.exports = devConfig;
