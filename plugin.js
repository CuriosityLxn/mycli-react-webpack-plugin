const chalk = require('chalk');
var slog = require('single-ine-log');

class MycliConsolePlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    // 监听文件改动
    compiler.hooks.watchRun.tap('MycliConsolePlugin', watching => {
      const changeFiles = watching.watchFileSystem.watcher.mtimes;
      for (var file in changeFiles) {
        console.log(chalk.green('当前改动文件：' + file));
      }
    });

    compiler.hooks.compile.tag('MycliConsolePlugin', () => this.beginCompile);

    compiler.hooks.done.tap('MycliConsolePlugin', () => {
      this.timer && clearInterval(this.timer);
      console.log(chalk.yellow('编译完成！'));
    });
  }

  beginCompile() {
    const listSlog = slog.stdout;
    let text = '-----开始编译-----';

    this.timer = setInterval(() => {
      text += '█';
      lineSlog(chalk.green(text));
    }, 50);
  }
}

module.exports = MycliConsolePlugin;
