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

  end(): Promise<void> {
    return new Promise<void>(resolve => {
      this.stream.end(resolve);
    });
  }
}
