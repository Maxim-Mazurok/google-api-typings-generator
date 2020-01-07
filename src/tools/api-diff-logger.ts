import { App, checkExists, excludedApi } from '../app';
import * as fs from 'fs';
import * as path from 'path';
import * as diff from 'diff';
import * as sortObject from 'deep-sort-object';

(async () => {
  const list: gapi.client.discovery.DirectoryList = await App.request('https://www.googleapis.com/discovery/v1/apis');
  if (!list.items) throw Error('Error loading APIs list');
  const apis = list.items
    .filter(api => excludedApi.indexOf(checkExists(api.name)) < 0);
  if (apis.length === 0) throw Error('No APIs found');

  for (const apiItem of apis) {
    if (!apiItem.id) {
      console.warn('No id for API', apiItem);
      continue;
    }
    if (!apiItem.discoveryRestUrl) {
      console.warn(`No discoveryRestUrl for API ${apiItem.id}`);
      continue;
    }

    console.log(`Getting ${apiItem.id}...`);

    let newApiObject;
    try {
      newApiObject = await App.request(apiItem.discoveryRestUrl) as gapi.client.discovery.RestDescription;
    } catch (e) {
      console.warn(e);
      continue;
    }
    const newApiString = JSON.stringify(sortObject(newApiObject), null, 2);
    const apiFileName = apiItem.id.replace(/[^a-zA-Z0-9]/g, '_') + '.json';

    let oldApiString = '';
    try {
      oldApiString = fs.readFileSync(path.join(__dirname, 'apis', apiFileName), { encoding: 'UTF-8' });
    } catch (e) {
      if (e.code !== 'ENOENT') console.warn(e);
      fs.writeFileSync(path.join(__dirname, 'apis', apiFileName), newApiString);
    }

    if (oldApiString !== '' && oldApiString !== newApiString && parseInt(newApiObject.revision) >= parseInt(JSON.parse(oldApiString).revision)) {
      fs.appendFileSync(path.join(__dirname, 'log', 'changes.txt'), `[${new Date().toISOString()}] ${newApiObject.id} changed\n`);

      const patch = diff.createPatch(apiFileName, oldApiString, newApiString, undefined, undefined, {
        ignoreWhitespace: false,
        newlineIsToken: true,
      });

      fs.appendFileSync(path.join(__dirname, 'log', 'diffs.txt'), `[${new Date().toISOString()}] ${newApiObject.id} changed:\n` + patch + '\n');

      fs.writeFileSync(path.join(__dirname, 'apis', apiFileName), newApiString);
    }
  }
})();
