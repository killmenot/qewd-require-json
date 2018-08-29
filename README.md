# qewd-require-json: Load configuration JSON file based on environment value

[![Build Status](https://travis-ci.org/killmenot/qewd-require-json.svg?branch=master)](https://travis-ci.org/killmenot/qewd-require-json) [![Coverage Status](https://coveralls.io/repos/github/killmenot/qewd-require-json/badge.svg?branch=master)](https://coveralls.io/github/killmenot/qewd-require-json?branch=master)

## Usage

```
 |
  -- config.developent.json
  -- config.integration.json
  -- config.json
```

```js
const requireJson = require('qewd-require-json');

const config = requireJson('./config.json') // config.json loaded

process.env.NODE_ENV = 'development';
const config = requireJson('./config.json') // config.development.json loaded

process.env.NODE_ENV = 'staging';
process.env.TEST_ENV = 'integration';
const config = requireJson('./config.json') // config.integration.json loaded
```
