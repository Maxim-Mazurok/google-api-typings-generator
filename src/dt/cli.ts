// Use this script to generate "shadow" types for DT that reference "real" types published to @maxim_mazurok/gapi.client.*

import {Option, program} from 'commander';
import {App} from './app.js';
import {getMaxLineLength, getProxy} from '../utils.js';

process.on('unhandledRejection', reason => {
  throw reason;
});

const options = program
  .version('0.0.1')
  .addOption(
    new Option(
      '-u, --url [url]',
      'process only specific REST service definition by url'
    ).env('URL') // workaround for passing dollar sign in bash
  )
  .option(
    '-s, --service [name]',
    'process only specific REST service definition by name'
  )
  .option('-a, --all', 'include previous versions', false)
  .option('-o, --out [path]', 'output directory', App.parseOutPath)
  .parse(process.argv)
  .opts();

console.info(`Output directory: ${options.out}`);

(async () => {
  const app = new App({
    proxy: await getProxy(),
    dtTypesDirectory: options.out,
    maxLineLength: getMaxLineLength(),
    owners: [
      'Maxim Mazurok <https://github.com/Maxim-Mazurok>',
      'Nick Amoscato <https://github.com/namoscato>',
      'Declan Vong <https://github.com/declanvong>',
    ],
  });

  if (options.url) {
    app.processService(options.url, true).then(
      () => console.log('Done'),
      error => {
        console.error(error);
        throw error;
      }
    );
  } else {
    app.discover(options.service, options.all || false).then(
      () => console.log('Done'),
      error => {
        console.error(error);
        throw error;
      }
    );
  }
})();
