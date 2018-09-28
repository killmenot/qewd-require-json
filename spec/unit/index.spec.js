'use strict';

const path = require('path');
const requireJsonFactory = require('../..');

describe('qewd-require-json', () => {
  let requireJson;

  beforeAll(() => {
    const cwd = path.join(process.cwd(), 'spec/fixtures/foo');
    process.chdir(cwd);
  });

  beforeEach(() => {
    requireJson = requireJsonFactory();
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

  it('should return config when options.cwd', () => {
    const expected = {
      value: 'bar'
    };

    const options = {
      cwd: path.join(process.cwd(), '../bar')
    };
    requireJson = requireJsonFactory(options);

    const actual = requireJson('./config.json');

    expect(actual).toEqual(expected);
  });

  it('should return config when cwd passed as string option', () => {
    const expected = {
      value: 'bar'
    };

    const options = path.join(process.cwd(), '../bar');
    requireJson = requireJsonFactory(options);

    const actual = requireJson('./config.json');

    expect(actual).toEqual(expected);
  });

  it('should return config from "spec" folder', () => {
    const expected = {
      value: 'baz.spec'
    };

    const options = path.join(process.cwd(), '../baz');
    requireJson = requireJsonFactory(options);

    const actual = requireJson('./config.json');

    expect(actual).toEqual(expected);
  });

  it('should return config from "spec/support" folder', () => {
    const expected = {
      value: 'quux.spec'
    };

    const options = path.join(process.cwd(), '../quux');
    requireJson = requireJsonFactory(options);

    const actual = requireJson('./config.json');

    expect(actual).toEqual(expected);
  });
});
