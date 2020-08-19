import program from 'commander';
import {App} from './app';
import {getProxySettings, ProxySettings} from 'get-proxy-settings';
import {getMaxLineLength} from './utils';

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
  .option(
    '-n, --new-revisions-only',
    'overwrite existing type only if revision is newer'
  )
  .option(
    '--cache-discovery-json <directory>',
    'temporary directory to cache discovery service JSON'
  )
  .parse(process.argv);

console.info(`Output directory: ${params.out}`);

(async () => {
  const proxy = await getProxySettings();
  const bestProxy = proxy.https || proxy.http || undefined;

  const app = new App({
    discoveryJsonDirectory: params.cacheDiscoveryJson,
    proxy: bestProxy,
    typesDirectory: params.out,
    maxLineLength: getMaxLineLength(),
    owners: [
      'Maxim Mazurok <https://github.com/Maxim-Mazurok>',
      'Google API Typings Generator <https://github.com/google-api-typings-generator>',
      'Nick Amoscato <https://github.com/namoscato>',
      'Declan Vong <https://github.com/declanvong>',
    ],
  });

  if (params.url) {
    app.processService(params.url, true, params.newRevisionsOnly).then(
      () => console.log('Done'),
      error => {
        console.error(error);
        throw error;
      }
    );
  } else {
    app
      .discover(params.service, params.all || false, params.newRevisionsOnly)
      .then(
        () => console.log('Done'),
        error => {
          console.error(error);
          throw error;
        }
      );
  }
})();
