import fs from 'node:fs';

export interface TextWriter {
  write(chunk?: string): void;

  end(): Promise<void>;
}

export class StreamWriter implements TextWriter {
  constructor(private stream: fs.WriteStream) {}

  write(chunk: string) {
    this.stream.write(chunk);
  }

  async end() {
    return new Promise<void>(resolve => {
      this.stream.end(resolve);
    });
  }
}
