import program from 'commander';
import {App} from './app';
import {getProxySettings, ProxySettings} from 'get-proxy-settings';

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
  .option('-a, --all', 'include previously versions', false)
  .option('-o, --out [path]', 'output directory', App.parseOutPath)
  .option(
    '-n, --new-revisions-only',
    'overwrite existing type only if revision is newer'
  )
  .parse(process.argv);

console.info(`Output directory: ${params.out}`);

(async () => {
  const proxy = (await getProxySettings()) as ProxySettings | null; // TODO: remove `as ...` when https://github.com/Azure/get-proxy-settings/issues/24 is fixed
  const bestProxy = (proxy && (proxy.https || proxy.http)) || undefined; // TODO: remove `proxy && ` when https://github.com/Azure/get-proxy-settings/issues/24 is fixed

  const app = new App(params.out, bestProxy);

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
