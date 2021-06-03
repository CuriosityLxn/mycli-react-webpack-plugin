const RunningWebpack = require('./lib/run');
const runner = new RunningWebpack(); // 启动 RunningWebpack 实例

process.on('message', message => {
  const msg = JSON.parse(message);

  if (msg.type && msg.cwdPath) {
    runner.listen(msg).then(
      () => process.send(JSON.stringify({ type: 'end' })),
      err => process.send(JSON.stringify({ type: 'error', err }))
    );
  }
});
