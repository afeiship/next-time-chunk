(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('next-js-core2');

  nx.timeChunk = function(inItems, inCallback, inLimit) {
    var timer;
    var start = function() {
      for (var i = 0; i < Math.min(inLimit || 1, inItems.length); i++) {
        var obj = inItems.shift();
        inCallback(obj);
      }
    };

    return function() {
      timer = setInterval(function() {
        if (inItems.length === 0) {
          clearInterval(timer);
          return Promise.resolve(inItems);
        }
        start();
      }, 200);
    };
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = nx.timeChunk;
  }
})();
