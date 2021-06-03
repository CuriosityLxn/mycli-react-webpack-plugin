const TerserPlugin = require('terser-webpack-plugin');
const proConfig = {
  devtool: 'cheap-module-source-map',
  mode: 'production',
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      })
    ]
  }
};

module.exports = proConfig;
