// Use this script to generate "shadow" types for DT that reference "real" types published to @maxim_mazurok/gapi.client.*

import {Option, program} from 'commander';
import {App} from './app.js';
import {getProxy} from '../utils.js';
import {getRestDescription} from '../discovery.js';

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
  .requiredOption('-o, --out [path]', 'output directory', App.parseOutPath)
  .parse(process.argv)
  .opts<{
    url?: string;
    service?: string;
    out: string;
  }>();

console.info(`Output directory: ${options.out}`);

void (async () => {
  const proxy = await getProxy();
  const app = new App({
    proxy,
    dtTypesDirectory: options.out,
    owners: [
      {
        name: 'Maxim Mazurok',
        githubUsername: 'Maxim-Mazurok',
      },
      {
        name: 'Nick Amoscato',
        githubUsername: 'namoscato', // cspell:words namoscato
      },
      {
        name: 'Declan Vong',
        githubUsername: 'declanvong',
      },
    ],
  });

  if (options.url) {
    const url = new URL(options.url);
    const restDescription = await getRestDescription(url, proxy);
    await app.processService(restDescription);
  } else {
    await app.discover(options.service);
  }
})();
