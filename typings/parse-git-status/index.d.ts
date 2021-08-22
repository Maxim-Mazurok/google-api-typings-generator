declare module 'parse-git-status' {
  function DefaultFunction(x: string): Array<{
    x: string;
    y: string;
    to: string;
    from: string | null;
  }>;
  export = DefaultFunction;
}
