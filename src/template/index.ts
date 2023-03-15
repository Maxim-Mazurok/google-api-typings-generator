import path from 'node:path';
import {fileURLToPath} from 'node:url';
import fs from 'node:fs';
import doT, {RenderFunction} from 'dot';
import {StreamWriter} from '../writer.js';
import {majorAndMinorVersion} from '../constants.js';

type RestDescription = gapi.client.discovery.RestDescription;
export interface TemplateDataToCollect {
  restDescription: RestDescription;
  restDescriptionSource: string;
  namespaces: string[];
  packageName: string;
}
export interface TemplateDataToWrite extends TemplateDataToCollect {
  majorAndMinorVersion: string;
}

export class Template {
  private readonly template: RenderFunction;

  constructor(name: string) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const filename = path.join(__dirname, name);

    if (!fs.existsSync(filename)) {
      throw Error(`Can't find ${name} file template`);
    }

    doT.templateSettings.strip = false;

    this.template = doT.template(fs.readFileSync(filename, 'utf-8'));
  }

  public async write(filePath: string, collectedData: TemplateDataToCollect) {
    const stream = fs.createWriteStream(filePath);
    const writer = new StreamWriter(stream);
    const data: TemplateDataToWrite = {
      ...collectedData,
      majorAndMinorVersion,
    };

    try {
      writer.write(this.template(data));
    } finally {
      await writer.end();
    }
  }
}
