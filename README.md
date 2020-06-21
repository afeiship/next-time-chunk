# next-time-chunk
> Split time to chunks for next.

[![npm][npm-image]][npm-url]
[![licence][licence-image]][license-url]


## Installation
```bash
npm install -S @feizheng/next-time-chunk
```

## Usage
```js
import '@feizheng/next-time-chunk';

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

## Resources
- https://www.cnblogs.com/ahthw/p/5117570.html

## Copyright and license

Code released under [the MIT license](https://github.com/afeiship/next-time-chunk/blob/master/LICENSE.txt).

[npm-image]: https://img.shields.io/npm/v/@feizheng/next-time-chunk.svg
[npm-url]: https://img.shields.io/npm/v/@feizheng/next-time-chunk
[licence-image]: https://img.shields.io/npm/l/@feizheng/next-time-chunk
[license-url]: https://github.com/afeiship/next-time-chunk/blob/master/LICENSE.txt
