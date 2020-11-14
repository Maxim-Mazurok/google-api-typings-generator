// Use this script to generate "shadow" types for DT that reference "real" types published to @maxim_mazurok/gapi.client.*

import program from 'commander';
import {App} from './app';
import {getProxySettings} from 'get-proxy-settings';
import {getMaxLineLength} from '../utils';

process.on('unhandledRejection', reason => {
  throw reason;
});

const params = program
  .version('0.0.1')
  .option(
    '-u, --url [url]',
    'process only specific REST service definition by url'
  )
  .option(
    '-s, --service [name]',
    'process only specific REST service definition by name'
  )
  .option('-a, --all', 'include previous versions', false)
  .option('-o, --out [path]', 'output directory', App.parseOutPath)
  .parse(process.argv);

console.info(`Output directory: ${params.out}`);

(async () => {
  const proxy = await getProxySettings();
  const bestProxy = proxy ? proxy.https || proxy.http : undefined;

  const app = new App({
    proxy: bestProxy,
    dtTypesDirectory: params.out,
    maxLineLength: getMaxLineLength(),
    owners: [
      'Maxim Mazurok <https://github.com/Maxim-Mazurok>',
      'Nick Amoscato <https://github.com/namoscato>',
      'Declan Vong <https://github.com/declanvong>',
    ],
  });

  if (params.url) {
    app.processService(params.url, true).then(
      () => console.log('Done'),
      error => {
        console.error(error);
        throw error;
      }
    );
  } else {
    app.discover(params.service, params.all || false).then(
      () => console.log('Done'),
      error => {
        console.error(error);
        throw error;
      }
    );
  }
})();
