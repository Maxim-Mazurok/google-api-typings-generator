declare module 'npm-run-all' {
  function DefaultFunction(
    x: Array<string | undefined> | undefined,
    y: object,
  ): Promise<void>;
  export default DefaultFunction;
}
