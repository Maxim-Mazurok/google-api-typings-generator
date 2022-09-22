import {JestConfigWithTsJest} from 'ts-jest';
import defaultConfig from './jest.config';

const config: JestConfigWithTsJest = {
  ...defaultConfig,
  testRegex: '/test/.*\\.integration\\.spec\\.ts$',
};

export default config;
