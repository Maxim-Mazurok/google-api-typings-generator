import doT, {RenderFunction} from 'dot';
import fs from 'node:fs';
import path from 'node:path';
import {StreamWriter} from '../../writer';

type RestDescription = gapi.client.discovery.RestDescription;
export interface DtTemplateData {
  restDescription: RestDescription;
  packageName: string;
  owners: string[];
  majorAndMinorVersion: string;
}

export class Template {
  private readonly template: RenderFunction;

  constructor(name: string) {
    const filename = path.join(__dirname, name);

    if (!fs.existsSync(filename)) {
      throw Error(`Can't find ${name} file template`);
    }

    doT.templateSettings.strip = false;

    this.template = doT.template(fs.readFileSync(filename, 'utf-8'));
  }

  public async write(filePath: string, data: DtTemplateData) {
    const stream = fs.createWriteStream(filePath);
    const writer = new StreamWriter(stream);

    try {
      writer.write(this.template(data));
    } finally {
      await writer.end();
    }
  }
}
