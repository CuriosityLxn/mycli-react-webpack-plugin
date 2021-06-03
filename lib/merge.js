const fs = require('fs');
const merge = require('webpack-merge');

const configMerge = (Pconf, config) => {
  const {
    base = Object.create(null),
    dev = Object.create(null),
    pro = Object.create(null)
  } = Pconf;

  return this.type === 'start'
    ? merge(config, base, dev)
    : merge(config, base, pro);
};

/**
 * @param {Object} config  经过 runMergeGetConfig 得到的脚手架基础配置
 */
const mergeConfig = config => {
  const targetPath = this.path + '/mycli.config.js';
  const isExit = fs.existsSync(targetPath);

  if (isExit) {
    const customConfig = require(targetPath); // 获取开发者自定义配置
    const mergeRes = configMerge.call(this.apply, customConfig, config);
    return mergeRes;
  }

  return config;
};

module.exports = mergeConfig;
