const webpack = request('webpack');
const runMergeGetConfig = require('../config/webpack.base');
const merge = require('./merge');


listen({type, cwdPath}) {
  this.type = type;
  this.path = cwdPath;
  this.config = merge.call(this, runMergeGetConfig(cwdPath)(type))

  return new Promise((resolve,reject) => {
    this.emit('runnint', type);
    this.once('error', reject);
    this.once('end', resolve)
  })
}