/*!
 * name: @feizheng/next-time-chunk
 * description: Split time to chunks for next.
 * homepage: https://github.com/afeiship/next-time-chunk
 * version: 1.0.1
 * date: 2020-06-20T15:28:33.609Z
 * license: MIT
 */

(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var nxChunk = nx.chunk || require('@feizheng/next-chunk');
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

//# sourceMappingURL=next-time-chunk.js.map
