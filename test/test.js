var assert = require('assert');
var nx = require('next-js-core2');
require('../src/next-time-chunk');

//nx.timeChunk()
console.log('test time chunk!!!!');

var fetchDataApis = [1, 2, 3, 4, 5].map((item) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(item);
      resolve({ data: item });
    },100);
  });
});

nx.timeChunk(
  fetchDataApis,
  (data) => {
    console.log('itemdata...');
    console.log(data);
  },
  5
);
