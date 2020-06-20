/*!
 * name: @feizheng/next-time-chunk
 * description: Split time to chunks for next.
 * homepage: https://github.com/afeiship/next-time-chunk
 * version: 1.0.0
 * date: 2020-06-20T12:52:35.653Z
 * license: MIT
 */

(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var DEFAULT_OPTIONS = { chunk: 10, interval: 200 };


  nx.timeChunk = function (inItems, inCallback, inOptions) {
    var timer;
    var items = nx.slice(inItems, inCallback);
    var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
    var chunkSize = Math.min(options.chunk, inItems.length);
    var start = function () {
      for (var i = 0; i < chunkSize; i++) {
        var obj = inItems.shift();
        var idx = items.indexOf(obj);
        inCallback(idx, obj);
      }
    };

    return function () {
      return new Promise(function (resolve) {
        timer = setInterval(function () {
          if (inItems.length === 0) {
            clearInterval(timer);
            resolve();
          }
          start();
        }, options.interval);
      });
    };
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.timeChunk;
  }
})();

//# sourceMappingURL=next-time-chunk.js.map
