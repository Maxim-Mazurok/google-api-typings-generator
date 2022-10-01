import {JestConfigWithTsJest} from 'ts-jest';
import {defaultsESM} from 'ts-jest/presets';

const config: JestConfigWithTsJest = {
  ...defaultsESM,
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testRegex: '/test/.*(?<!\\.integration)\\.spec\\.ts$',
};

export default config;
