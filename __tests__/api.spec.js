const nx = require('@feizheng/next-js-core2');
require('../src/next-time-chunk');

describe('api.basic test', () => {
  test('nx.timeChunk', function (done) {
    var fetchApi = (item) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('data: ', item);
          resolve(item * 2);
        }, 100);
      });
    };

    nx.timeChunk(
      [1, 2, 3, 4, 5],
      {
        callback: (data) => {
          return fetchApi(data);
        },
        count: 2,
      }
    ).then((res) => {
      console.log(res);

      expect(res).toEqual([2, 4, 6, 8, 10])
      done();
    });

  });
});
