/*!
 * name: next-time-chunk
 * url: https://github.com/afeiship/next-time-chunk
 * version: 1.0.0
 * license: MIT
 */

(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');

  nx.timeChunk = function(inItems, inCallback, inLimit) {
    var timer;
    var items = nx.slice(inItems, inCallback);
    var start = function() {
      for (var i = 0; i < Math.min(inLimit || 1, inItems.length); i++) {
        var obj = inItems.shift();
        var idx = items.indexOf(obj);
        inCallback(idx, obj);
      }
    };

    return function() {
      timer = setInterval(function() {
        if (inItems.length === 0) {
          clearInterval(timer);
          inCallback(inItems);
        }
        start();
      }, 200);
    };
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.timeChunk;
  }
})();
