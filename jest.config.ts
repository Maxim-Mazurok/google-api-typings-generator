import {JestConfigWithTsJest} from 'ts-jest';
import {defaultsESM} from 'ts-jest/presets';

const defaultsESMPatched = defaultsESM;
defaultsESMPatched.transform!['^.+\\.tsx?$'] = ['ts-jest', {useESM: true}]; // TODO: remove this once https://github.com/kulshekhar/ts-jest/pull/2207 is released
// defaultsESMPatched.extensionsToTreatAsEsm =
//   defaultsESMPatched.extensionsToTreatAsEsm?.filter(x => x !== '.mts');

const config: JestConfigWithTsJest = {
  ...defaultsESMPatched,
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
  testRegex: '/test/.*(?<!\\.integration)\\.spec\\.ts$',
};

export default config;
