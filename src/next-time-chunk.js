(function () {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var nxChunk = nx.chunk || require('@feizheng/next-chunk');
  var nxFlatten = nx.flatten || require('@feizheng/next-flatten');
  var DEFAULT_OPTIONS = { chunk: 10, interval: 100, callback: nx.noop };


  nx.timeChunk = function (inItems, inOptions) {
    var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
    var dataChunks = nxChunk(inItems, options.chunk);
    var result = [];
    var timer = null;
    var done = false;

    var start = function (items) {
      var pItems = items.map(function (item) {
        return options.callback(item);
      });
      return Promise.all(pItems).then(function (res) {
        result.push(res);
        done = (dataChunks.length === 0);
        !done && start(dataChunks.shift());
      });
    };


    return new Promise(function (resolve, reject) {
      try {
        start(dataChunks.shift());
      } catch (err) {
        reject(err);
      }

      timer = setInterval(function () {
        if (done) {
          clearInterval(timer)
          resolve(nxFlatten(result));
        }
      }, options.interval);
    })
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.timeChunk;
  }
})();
