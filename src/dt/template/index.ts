import path from 'path';
import fs from 'fs';
import doT, {RenderFunction} from 'dot';
import {StreamWriter} from '../../writer';
import {Configuration} from '../app';

type RestDescription = gapi.client.discovery.RestDescription;

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

  public write(
    filePath: string,
    api: RestDescription & {
      majorAndMinorVersion?: string;
      owners?: Configuration['owners'];
    }
  ) {
    const stream = fs.createWriteStream(filePath);
    const writer = new StreamWriter(stream);

    try {
      writer.write(this.template(api));
    } finally {
      writer.end();
    }
  }
}
