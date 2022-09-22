import {JestConfigWithTsJest} from 'ts-jest';

const config: JestConfigWithTsJest = {
  extensionsToTreatAsEsm: ['.ts'],
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  transform: {
    '^.+\\.ts$': ['ts-jest', {useESM: true}],
  },
  testRegex: '/test/.*(?<!\\.integration)\\.spec\\.ts$',
};

export default config;
