'use strict';

const path = require('path');
const fs = require('fs');

function spread(absolutePath) {
  const nodeEnv = (process.env.NODE_ENV || '').toLowerCase();
  const testEnv = (process.env.TEST_ENV || '').toLowerCase();
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
}

module.exports = (options) => {
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
    const paths = [
      path.join('spec/support', modulePath),
      path.join('spec', modulePath),
      modulePath
    ]
      .map(p => path.join(cwd || process.cwd(), p))
      .map(spread)
      .reduce((x, y) => x.concat(y), []);

    for (let i = 0; i < paths.length; i++) {
      try {
        fs.accessSync(paths[i]);
        return require(paths[i]);
      } catch (err) {}
    }
  };
};
