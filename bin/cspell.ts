import {runCspell} from '../src/cspell.js';

void runCspell().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
