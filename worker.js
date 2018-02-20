const SCWorker = require('socketcluster/scworker');

class Worker extends SCWorker {
  // Override the run function.
  // It will be executed when the worker is ready.
  run() {
    const self = this;

    self.scServer.on('connection', (socket) => {
      const interval = setInterval(() => {
        self.scServer.exchange.publish('news', { msg });
      }, 3000);

      socket.on('disconnect', () => clearInterval(interval));
    });
  }
}

new Worker();
