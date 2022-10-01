// Unused for now
// TODO: use it when this is resolve: https://github.com/facebook/jest/issues/13350

import {JestConfigWithTsJest} from 'ts-jest';
import defaultConfig from './jest.config.js';

const config: JestConfigWithTsJest = {
  ...defaultConfig,
  testRegex: '/test/.*\\.integration\\.spec\\.ts$',
};

export default config;
