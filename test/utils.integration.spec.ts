import {sleep} from '../src/utils.js';

describe('sleep', () => {
  it('about 1s', () => {
    const start = process.hrtime.bigint();
    sleep(1);
    const end = process.hrtime.bigint();
    const sleptForNanoseconds = end - start;
    expect(sleptForNanoseconds).toBeGreaterThan(900000000); // more than 0.5s
    expect(sleptForNanoseconds).toBeLessThan(2000000000); // less than 2s
  });
});
