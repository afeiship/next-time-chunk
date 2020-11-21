/*!
 * name: @jswork/next-time-chunk
 * description: Split time to chunks for next.
 * homepage: https://github.com/afeiship/next-time-chunk
 * version: 1.0.0
 * date: 2020-11-21 09:25:41
 * license: MIT
 */

(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@jswork/next');
  var nxChunk = nx.chunk || require('@jswork/next-chunk');
  var DEFAULT_OPTIONS = { chunk: 10, interval: 100, callback: nx.noop };

  nx.timeChunk = function (inItems, inOptions) {
    var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
    var dataChunks = nxChunk(inItems, options.chunk);
    var result = [];
    var timer = null;
    var done = false;
    var start = function () {
      next(dataChunks.shift());
    };

    var next = function (items) {
      var promises = items.map(function (item) { return options.callback(item); });
      return Promise.all(promises).then(function (res) {
        result = result.concat(res);
        done = (dataChunks.length === 0);
        !done && start();
      });
    };

    return new Promise(function (resolve, reject) {
      try {
        start();
      } catch (err) {
        reject(err);
      }

      timer = setInterval(function () {
        if (done) {
          clearInterval(timer)
          resolve(result);
        }
      }, options.interval);
    })
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.timeChunk;
  }
})();
