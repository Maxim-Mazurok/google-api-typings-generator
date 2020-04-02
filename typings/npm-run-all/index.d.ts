declare module 'npm-run-all' {
  function DefaultFunction(
    x: Array<string | undefined> | undefined,
    y: {}
  ): Promise<void>;
  export = DefaultFunction;
}
