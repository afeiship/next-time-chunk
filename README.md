# next-time-chunk
> Split time to chunks for next.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

## installation
```bash
npm install -S @jswork/next-time-chunk
```

## usage
```js
import '@jswork/next-time-chunk';

const fetchApi = (item) => {
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
});


// data: 1
// data: 2

// data: 3
// data: 4

// data: 5

// [ 1, 2, 3, 4, 5 ]
```

## resources
- https://www.cnblogs.com/ahthw/p/5117570.html

## license
Code released under [the MIT license](https://github.com/afeiship/next-time-chunk/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/next-time-chunk
[version-url]: https://npmjs.org/package/@jswork/next-time-chunk

[license-image]: https://img.shields.io/npm/l/@jswork/next-time-chunk
[license-url]: https://github.com/afeiship/next-time-chunk/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/next-time-chunk
[size-url]: https://github.com/afeiship/next-time-chunk/blob/master/dist/next-time-chunk.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/next-time-chunk
[download-url]: https://www.npmjs.com/package/@jswork/next-time-chunk
