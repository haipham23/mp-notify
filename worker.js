const SCWorker = require('socketcluster/scworker');

const news = require('./news');

class Worker extends SCWorker {
  // Override the run function.
  // It will be executed when the worker is ready.
  run() {
    const self = this;

    self.scServer.on('connection', (socket) => {
      let count = 0;
      const max = news.length - 1;

      const interval = setInterval(() => {
        socket.emit('news', { news: news[count] });

        count = count === max
          ? 0
          : count + 1;
      }, 3000);

      socket.on('disconnect', () => clearInterval(interval));
    });
  }
}

new Worker();
