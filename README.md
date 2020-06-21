# next-time-chunk
> Split time to chunks for next.

![npm (scoped)](https://img.shields.io/npm/v/@feizheng/next-time-chunk)
![NPM](https://img.shields.io/npm/l/@feizheng/next-time-chunk)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/@feizheng/next-time-chunk)
![npm](https://img.shields.io/npm/dw/@feizheng/next-time-chunk)

## installation
```bash
npm install -S @feizheng/next-time-chunk
```

## usage
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

## resources
- https://www.cnblogs.com/ahthw/p/5117570.html

## copyright & license
> Code released under [the MIT license](https://github.com/afeiship/next-time-chunk/blob/master/LICENSE.txt).
