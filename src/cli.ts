import {program} from 'commander';
import {App} from './app.js';
import {getRestDescription} from './discovery.js';
import {getBannedTypes, getMaxLineLength, getProxy} from './utils.js';

process.on('unhandledRejection', reason => {
  throw reason;
});

const options = program
  .option(
    '-u, --url [url]',
    'process only specific REST service definition by url',
    string => string.replace(/＄/g, '$') // workaround to allow passing dollar sign in bash scripts arguments (escaping doesn't really work)
  )
  .option(
    '-s, --service [name]',
    'process only specific REST service definition by name'
  )
  .requiredOption('-o, --out [path]', 'output directory', App.parseOutPath)
  .option(
    '-n, --new-revisions-only',
    'overwrite existing type only if revision is newer'
  )
  .option(
    '--cache-discovery-json <directory>', // needed so that we can upload JSON if we fail to process it
    'temporary directory to cache discovery service JSON'
  )
  .parse(process.argv)
  .opts<{
    url?: string;
    service?: string;
    out: string;
    newRevisionsOnly: boolean;
    cacheDiscoveryJson: string;
  }>();

console.info(`Output directory: ${options.out}`);

const proxy = await getProxy();
const app = new App({
  discoveryJsonDirectory: options.cacheDiscoveryJson,
  proxy,
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
  console.log(`Using url: ${options.url}`);
  const url = new URL(options.url);
  const restDescription = await getRestDescription(url, proxy);
  await app.processService(restDescription, url, options.newRevisionsOnly);
} else {
  await app.discover(options.service, options.newRevisionsOnly);
}
