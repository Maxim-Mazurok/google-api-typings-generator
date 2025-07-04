import doT, {RenderFunction} from 'dot';
import fs from 'node:fs';
import path from 'node:path';
import {StreamWriter} from '../writer.js';

type RestDescription = gapi.client.discovery.RestDescription;
export interface TemplateData {
  restDescription: RestDescription;
  restDescriptionSource: string;
  namespaces: string[];
  packageName: string;
  majorAndMinorVersion: string;
  generatorVersion: number;
}

export class Template {
  private readonly template: RenderFunction;

  constructor(name: string) {
    const filename = path.join(import.meta.dirname, name);

    if (!fs.existsSync(filename)) {
      throw Error(`Can't find ${name} file template`);
    }

    doT.templateSettings.strip = false;

    this.template = doT.template(fs.readFileSync(filename, 'utf-8'));
  }

  public async write(filePath: string, data: TemplateData) {
    const stream = fs.createWriteStream(filePath);
    const writer = new StreamWriter(stream);

    try {
      writer.write(this.template(data));
    } finally {
      await writer.end();
    }
  }
}
