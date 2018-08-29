'use strict';

const path = require('path');
const requireJson = require('../..');

describe('qewd-require-json', () => {
  beforeAll(() => {
    const fixturesDir = path.join(process.cwd(), 'spec/fixtures');
    process.chdir(fixturesDir);
  });

  afterEach(() => {
    delete process.env.NODE_ENV;
    delete process.env.TEST_ENV;
  });

  it('should return default config', () => {
    const expected = {
      value: 'foo'
    };

    const actual = requireJson('./config.json');

    expect(actual).toEqual(expected);
  });

  it('should return config when NODE_ENV', () => {
    const expected = {
      value: 'foo.development'
    };

    process.env.NODE_ENV = 'development';
    const actual = requireJson('./config.json');

    expect(actual).toEqual(expected);
  });

  it('should return config when NODE_ENV (not found)', () => {
    const expected = {
      value: 'foo'
    };

    process.env.NODE_ENV = 'staging';
    const actual = requireJson('./config.json');

    expect(actual).toEqual(expected);
  });

  it('should return config when TEST_ENV', () => {
    const expected = {
      value: 'foo.integration'
    };

    process.env.TEST_ENV = 'integration';
    const actual = requireJson('./config.json');

    expect(actual).toEqual(expected);
  });

  it('should return config when TEST_ENV (not found)', () => {
    const expected = {
      value: 'foo'
    };

    process.env.TEST_ENV = 'unit';
    const actual = requireJson('./config.json');

    expect(actual).toEqual(expected);
  });

  it('should return config when both NODE_ENV and TEST_ENV', () => {
    const expected = {
      value: 'foo.integration'
    };

    process.env.NODE_ENV = 'development';
    process.env.TEST_ENV = 'integration';
    const actual = requireJson('./config.json');

    expect(actual).toEqual(expected);
  });
});
