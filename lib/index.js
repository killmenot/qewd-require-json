'use strict';

const path = require('path');
const fs = require('fs');

module.exports = (options) => {
  options = options || {};

  const cwd = options.cwd || '';

  return (modulePath) => {
    const absoluteModulePath = path.join(cwd || process.cwd(), modulePath);
    const nodeEnv = (process.env.NODE_ENV || '').toLowerCase();
    const testEnv = (process.env.TEST_ENV || '').toLowerCase();

    const dirname = path.dirname(absoluteModulePath);
    const basename = path.basename(absoluteModulePath, '.json');

    let newAbsoluteModulePath;

    if (testEnv) {
      newAbsoluteModulePath = `${dirname}/${basename}.${testEnv}.json`;
    } else if (nodeEnv) {
      newAbsoluteModulePath = `${dirname}/${basename}.${nodeEnv}.json`;
    }

    try {
      fs.accessSync(newAbsoluteModulePath);
    } catch (err) {
      newAbsoluteModulePath = absoluteModulePath;
    }

    return require(newAbsoluteModulePath);
  };
};
