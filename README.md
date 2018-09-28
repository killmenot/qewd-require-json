# qewd-require-json

Load QEWD configuration JSON files based on environment

[![Build Status](https://travis-ci.org/killmenot/qewd-require-json.svg?branch=master)](https://travis-ci.org/killmenot/qewd-require-json) [![Coverage Status](https://coveralls.io/repos/github/killmenot/qewd-require-json/badge.svg?branch=master)](https://coveralls.io/github/killmenot/qewd-require-json?branch=master) [![Dependency Status](https://david-dm.org/killmenot/qewd-require-json.svg)](https://david-dm.org/killmenot/qewd-require-json) [![npm version](https://img.shields.io/npm/v/qewd-require-json.svg)](https://www.npmjs.com/package/qewd-require-json)


## Usage

```
 |
 |-- bar
   |-- config.json
 |-- config.developent.json
 |-- config.integration.json
 |-- config.json
```

```js
const requireJsonFactory = require('qewd-require-json');
const requireJson = requireJsonFactory();

// basic
const config = requireJson('./config.json') // config.json loaded

// pass version via NODE_ENV
process.env.NODE_ENV = 'development';
const config = requireJson('./config.json') // config.development.json is loaded

// pass version via TEST_ENV
process.env.NODE_ENV = 'staging';
process.env.TEST_ENV = 'integration';
const config = requireJson('./config.json') // config.integration.json is loaded

// overwrite cwd via options
const options = { cwd: '/path/to/bar' }
const requireJson = requireJsonFactory(options);
const config = requireJson('./config.json') // config.json from bar folder is loaded
```


## LICENSE

    The MIT License (MIT)

    Copyright (c) Alexey Kucherenko

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.

