// cspell:word colordiff

import assert from 'node:assert';
import {execSync} from 'node:child_process';
import {readFileSync} from 'node:fs';
import {dirname, join} from 'node:path';
import {fileURLToPath} from 'node:url';
import {App} from '../../src/app.js';
import {RestDescription} from '../../src/discovery.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

['drive', 'sheets', 'calendar', 'admin'].forEach(apiName => {
  it(`${apiName} works`, async () => {
    const app = new App({
      typesDirectory: join(__dirname, 'results'),
      maxLineLength: 200,
      bannedTypes: [],
      owners: [
        'Maxim Mazurok <https://github.com/Maxim-Mazurok>',
        'Nick Amoscato <https://github.com/namoscato>',
        'Declan Vong <https://github.com/declanvong>',
      ],
    });

    const restDescription = JSON.parse(
      readFileSync(join(__dirname, `${apiName}.json`), 'utf-8')
    ) as RestDescription;

    await app.processService(
      restDescription,
      new URL(`http://localhost:3000/${apiName}.json`),
      false
    );

    const folder = `gapi.client.${apiName}`;
    const snapshotFolder = `${join(__dirname, 'snapshots', folder)}`;
    const resultFolder = `${join(__dirname, 'results', folder)}`;
    const diffCommand = `colordiff ${snapshotFolder} ${resultFolder}`; // need `sudo apt install colordiff`

    try {
      execSync(diffCommand);
    } catch (e) {
      // exit code 1 when there's some diff
      const diff = execSync(`${diffCommand} || print`, {
        encoding: 'utf-8',
      });
      console.log(diff);
      assert.fail('should be no diff between actual and snapshot');
    }
  });
});
