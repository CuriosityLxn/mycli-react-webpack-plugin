const merge = require('webpack-merge');

const runMergeGetConfig = path => type =>
  type === 'start'
    ? merge(Appconfig(path), devConfig(path))
    : merge(Appconfig(path), proConfig);

module.exports = runMergeGetConfig;
