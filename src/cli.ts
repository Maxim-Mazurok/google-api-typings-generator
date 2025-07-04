import {program} from 'commander';
import {SH} from '../bin/auto-publish/sh.js';
import {App} from './app.js';
import {getRestDescription} from './discovery.js';
import {bannedTypes, getGeneratorVersion, getProxy} from './utils.js';

process.on('unhandledRejection', reason => {
  throw reason;
});

const options = program
  .option(
    '-u, --url [url]',
    'process only specific REST service definition by url',
    string => string.replace(/＄/g, '$'), // workaround to allow passing dollar sign in bash scripts arguments (escaping doesn't really work)
  )
  .option(
    '-s, --service [name]',
    'process only specific REST service definition by name',
  )
  .requiredOption('-o, --out [path]', 'output directory', App.parseOutPath)
  .option(
    '-n, --new-or-current-revisions-only',
    'overwrite existing type only if revision is newer', // need to overwrite even if it's the same revision, because our templates or generation logic may have changed, see https://github.com/Maxim-Mazurok/google-api-typings-generator/issues/1118
  )
  .option(
    '--cache-discovery-json <directory>', // needed so that we can upload JSON if we fail to process it
    'temporary directory to cache discovery service JSON',
  )
  .parse(process.argv)
  .opts<{
    url?: string;
    service?: string;
    out: string;
    newOrCurrentRevisionsOnly: boolean;
    cacheDiscoveryJson: string;
  }>();

console.info(`Output directory: ${options.out}`);

void (async () => {
  const [proxy, generatorVersion] = await Promise.all([
    getProxy(),
    getGeneratorVersion(new SH()),
  ]);

  const app = new App({
    discoveryJsonDirectory: options.cacheDiscoveryJson,
    proxy,
    typesDirectory: options.out,
    bannedTypes,
    owners: [
      'Maxim Mazurok <https://github.com/Maxim-Mazurok>',
      'Nick Amoscato <https://github.com/namoscato>',
      'Declan Vong <https://github.com/declanvong>',
    ],
    generatorVersion,
  });

  if (options.url) {
    console.log(`Using url: ${options.url}`);
    const url = new URL(options.url);
    const restDescription = await getRestDescription(url, proxy);
    await app.processService(
      restDescription,
      url,
      options.newOrCurrentRevisionsOnly,
    );
  } else {
    await app.discover(options.service, options.newOrCurrentRevisionsOnly);
  }
})();
