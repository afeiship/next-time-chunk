(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');
  var DEFAULT_OPTIONS = { chunk: 10, interval: 200 };

  nx.timeChunk = function(inItems, inCallback, inOptions) {
    var timer;
    var items = nx.slice(inItems, inCallback);
    var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
    var start = function() {
      for (var i = 0; i < Math.min(options.chunk, inItems.length); i++) {
        var obj = inItems.shift();
        var idx = items.indexOf(obj);
        inCallback(idx, obj);
      }
    };

    return function() {
      return new Promise(function(resolve) {
        timer = setInterval(function() {
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
