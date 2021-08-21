import * as fs from 'node:fs';

export interface TextWriter {
  write(chunk?: string): void;

  end(): void;
}

export class StreamWriter implements TextWriter {
  constructor(private stream: fs.WriteStream) {}

  write(chunk: string) {
    this.stream.write(chunk);
  }

  end() {
    this.stream.end();
  }
}
