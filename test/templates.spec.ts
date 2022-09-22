import {readFileSync} from 'node:fs';
import path, {join} from 'node:path';
import doT from 'dot';
import dedent from 'dedent';
import {fileURLToPath} from 'node:url';
import {TemplateData} from '../src/template/index.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

beforeAll(() => {
  doT.templateSettings.strip = false;
});

describe('readme', () => {
  it('works', () => {
    const template = readFileSync(
      join(__dirname, '..', 'src', 'template', 'readme.dot'),
      'utf-8'
    );
    const data: TemplateData = {
      restDescription: {
        name: 'my-name',
        title: 'My Types',
        version: 'v1beta',
        documentationLink: 'http://docs.io',
        auth: {
          oauth2: {
            scopes: {
              'http://my.scope': {description: 'my scope'},
              'http://your.scope': {description: 'your scope'},
            },
          },
        },
        resources: {
          firstResource: {
            methods: {
              firstMethod: {
                description: 'Method Number One',
                httpMethod: 'GET',
                path: 'some/path/1',
                id: 'thirdNamespace.firstMethod',
              },
            },
          },
        },
      },
      restDescriptionSource: 'http://x.com',
      namespaces: ['admin', 'directory'], // TODO: need to actually add this to template data I guess
      majorAndMinorVersion: '0.0',
      packageName: 'my-name-v1beta',
    };

    const result = doT.compile(template)(data);

    expect(result).toMatchSnapshot();
  });

  it.skip('use me for small tests during development', () => {
    const template = dedent`
      gapi.client.load('{{=it.url}}', () => {
        // now we can use:{{~ it.namespaces :namespace }}
        // gapi.client.{{=namespace}}{{~}}
      });
    `;
    const data = {
      url: 'http://x.com',
      namespaces: ['admin', 'directory'],
    };
    const result = doT.compile(template)(data);

    const expected = dedent`
      gapi.client.load('http://x.com', () => {
        // now we can use:
        // gapi.client.admin
        // gapi.client.directory
      });
    `;
    expect(result).toBe(expected);
  });
});
