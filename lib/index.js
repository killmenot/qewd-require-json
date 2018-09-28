'use strict';

const path = require('path');
const fs = require('fs');
const debug = require('debug')('qewd-require-json');

function join(modulePath, segment) {
  if (path.isAbsolute(modulePath)) {
    const dirname = path.dirname(modulePath);
    const basename = path.basename(modulePath);

    return path.join(dirname, segment, basename);
  }

  return path.join(segment, modulePath);
}

function processCwd(cwd) {
  return (p) => path.isAbsolute(p) ? p : path.join(cwd, p);
}

function spread(nodeEnv, testEnv) {
  return (absolutePath) => {
    const paths = [];

    const dirname = path.dirname(absolutePath);
    const basename = path.basename(absolutePath, '.json');

    if (testEnv) {
      paths.push(`${dirname}/${basename}.${testEnv}.json`);
    } else if (nodeEnv) {
      paths.push(`${dirname}/${basename}.${nodeEnv}.json`);
    }

    paths.push(absolutePath);

    return paths;
  };
}

module.exports = (options) => {
  debug('options: %j', options);

  if (typeof options === 'string') {
    options = {
      cwd: options
    };
  }

  if (typeof options === 'undefined') {
    options = {};
  }

  const cwd = options.cwd || '';

  return (modulePath) => {
    debug('module path: %s', modulePath);

    const nodeEnv = (process.env.NODE_ENV || '').toLowerCase();
    const testEnv = (process.env.TEST_ENV || '').toLowerCase();
    debug('NODE_ENV: %s', nodeEnv);
    debug('TEST_ENV: %s', testEnv);

    const currentCwd = cwd || process.cwd();
    const paths = [
      join(modulePath, 'spec/support'),
      join(modulePath, 'spec'),
      modulePath
    ]
      .map(processCwd(currentCwd))
      .map(spread(nodeEnv, testEnv))
      .reduce((x, y) => x.concat(y), []);

    debug('paths: %j', paths);

    for (let i = 0; i < paths.length; i++) {
      try {
        fs.accessSync(paths[i]);
        debug('require: %s', paths[i]);
        return require(paths[i]);
      } catch (err) {}
    }
  };
};
