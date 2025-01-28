import {SH} from './auto-publish/sh.js';

const sh = new SH();

void (async () => {
  const files = (await sh.runSh('npx -y ls-ignore --paths')).stdout
    .split('\n')
    .filter(x => x.trim() !== '')
    .filter(x => !(x.startsWith('test/restDocs') && x.endsWith('.json')))
    .filter(x => !x.startsWith('test/restDocs/results/'))
    .filter(x => !x.startsWith('test/restDocs/__snapshots__/'));
  await sh.runSh(`npx -y cspell ${files.join(' ')}`);
})();
