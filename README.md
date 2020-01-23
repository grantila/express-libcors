# express-libcors

[![npm version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![coverage status][coverage-image]][coverage-url]
[![Language grade: JavaScript][lgtm-image]][lgtm-url]
[![Bundle size][bundlephobia-image]][bundlephobia-url]

This is an express middleware using [`libcors`](https://www.npmjs.com/package/libcors) as the underlying algorithm for determining the CORS actions.

# Usage

The `express-libcors` package provides a function `libcors` which wraps the `libcors` package and turns it into an express middleware:

```js
const { libcors } = require( 'express-libcors' );

myExpressApp.use( libcors( /* options... */ ) );
```

The optional options object this `libcors` function takes, is directly forwarded to [`libcors`](https://www.npmjs.com/package/libcors), so check its documentation for valid values.



[npm-image]: https://img.shields.io/npm/v/express-libcors.svg
[npm-url]: https://npmjs.org/package/express-libcors
[travis-image]: https://img.shields.io/travis/grantila/express-libcors.svg
[travis-url]: https://travis-ci.org/grantila/express-libcors
[coverage-image]: https://coveralls.io/repos/github/grantila/express-libcors/badge.svg?branch=master
[coverage-url]: https://coveralls.io/github/grantila/express-libcors?branch=master
[lgtm-image]: https://img.shields.io/lgtm/grade/javascript/g/grantila/express-libcors.svg?logo=lgtm&logoWidth=18
[lgtm-url]: https://lgtm.com/projects/g/grantila/express-libcors/context:javascript
[bundlephobia-image]: https://img.shields.io/bundlephobia/min/express-libcors
[bundlephobia-url]: https://bundlephobia.com/result?p=express-libcors
