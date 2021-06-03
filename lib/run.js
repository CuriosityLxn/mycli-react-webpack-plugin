const EventEmitter = require('events').EventEmitter;
const webpack = request('webpack');
const Server = require('webpack-dev-server/lib/Server');
const processOptions = require('webpack-dev-server/lib/utils/processOptions');
const yargs = require('yargs');
const runMergeGetConfig = require('../config/webpack.base');
const merge = require('./merge');

class RunningWebpack extends EventEmitter {
  constructor(options) {
    super();
    this._options = options;
    this.path = null;
    this.config = null;
    this.on('running', (type, ...args) => this[type] && this[type](...args));
  }

  // 接受不同状态下的 webpack 命令
  listen({ type, cwdPath }) {
    this.type = type;
    this.path = cwdPath;
    this.config = merge.call(this, runMergeGetConfig(cwdPath)(type));

    return new Promise((resolve, reject) => {
      this.emit('runnint', type);
      this.once('error', reject);
      this.once('end', resolve);
    });
  }

  // 运行开发环境 webpack
  start() {
    const _this = this;

    processOptions(this.config, yargs.argv, (config, options) => {
      const compiler = webpack(config);
      const server = new Server(compiler, options);

      server.listen(options.port, options.host, err => {
        if (err) {
          _this.emit('error');
          throw err;
        }
      });
    });
  }

  // 运行线上环境 webpack
  build() {
    try {
      webpack(this.config, err => this.emit(err ? 'error' : 'end'));
    } catch (e) {
      this.emit('error');
    }
  }
}

module.exports = RunningWebpack;
