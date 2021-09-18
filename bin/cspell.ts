import {SH} from './auto-publish/sh.js';

(async () => {
  const sh = new SH();
  const files = (await sh.runSh('npx -y ls-ignore --paths')).stdout
    .split('\n')
    .filter(x => x.trim() !== '');
  await sh.runSh(`npx -y cspell ${files.join(' ')}`);
})();
