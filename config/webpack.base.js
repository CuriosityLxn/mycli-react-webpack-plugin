const merge = require('webpack-merge');

module.exports = path => type =>
  type === 'start'
    ? merge(Appconfig(path), devConfig(path))
    : merge(Appconfig(path), proConfig);
