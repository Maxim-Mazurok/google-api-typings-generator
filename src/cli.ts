import {Option, program} from 'commander';
import {App} from './app.js';
import {getProxySettings} from 'get-proxy-settings';
import {getBannedTypes, getMaxLineLength} from './utils.js';

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
  .option(
    '-n, --new-revisions-only',
    'overwrite existing type only if revision is newer'
  )
  .option(
    '--cache-discovery-json <directory>',
    'temporary directory to cache discovery service JSON'
  )
  .parse(process.argv)
  .opts();

console.info(`Output directory: ${options.out}`);

(async () => {
  const proxy = await getProxySettings();
  const bestProxy = proxy ? proxy.https || proxy.http : undefined;

  const app = new App({
    discoveryJsonDirectory: options.cacheDiscoveryJson,
    proxy: bestProxy,
    typesDirectory: options.out,
    maxLineLength: getMaxLineLength(),
    bannedTypes: await getBannedTypes(),
    owners: [
      'Maxim Mazurok <https://github.com/Maxim-Mazurok>',
      'Nick Amoscato <https://github.com/namoscato>',
      'Declan Vong <https://github.com/declanvong>',
    ],
  });

  if (options.url) {
    app.processService(options.url, true, options.newRevisionsOnly).then(
      () => console.log('Done'),
      error => {
        console.error(error);
        throw error;
      }
    );
  } else {
    app
      .discover(options.service, options.all || false, options.newRevisionsOnly)
      .then(
        () => console.log('Done'),
        error => {
          console.error(error);
          throw error;
        }
      );
  }
})();
