const nx = require('@feizheng/next-js-core2');
require('../src/next-time-chunk');

var fetchApi = (item) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('data:', item);
      resolve(item);
    }, 1000);
  });
};

nx.timeChunk(
  [1, 2, 3, 4, 5],
  {
    callback: (data) => {
      return fetchApi(data);
    },
    chunk: 2
  }
).then(res => {
  console.log(res);
})
