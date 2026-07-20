import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';

const require = createRequire(import.meta.url);

/**
 * Locates the directory containing TypeScript's lib.*.d.ts files.
 *
 * TypeScript 7+ (the native compiler) ships lib files inside the
 * platform-specific binary package (e.g. @typescript/typescript-linux-x64),
 * while earlier versions keep them next to the main JS entry point.
 */
function findTypescriptLibDirectory(): string {
  const candidateDirectories = [
    // TypeScript >= 7
    () =>
      path.join(
        path.dirname(
          require.resolve(
            `@typescript/typescript-${process.platform}-${process.arch}/package.json`,
          ),
        ),
        'lib',
      ),
    // TypeScript < 7
    () => path.dirname(require.resolve('typescript')),
  ];

  for (const getDirectory of candidateDirectories) {
    try {
      const directory = getDirectory();
      if (
        fs
          .readdirSync(directory)
          .some(file => file.startsWith('lib.') && file.endsWith('.d.ts'))
      ) {
        return directory;
      }
    } catch {
      // candidate not resolvable — try the next one
    }
  }
  throw new Error("Could not locate TypeScript's lib.*.d.ts files");
}

/**
 * Matches top-level (non-indented) interface, type alias, and class
 * declarations. Indentation-sensitive on purpose: declarations nested inside
 * namespaces (e.g. Intl) are indented and must not match, mirroring the
 * previous implementation which only visited top-level AST nodes.
 */
const TOP_LEVEL_TYPE_DECLARATION =
  /^(?:declare\s+)?(?:abstract\s+)?(?:interface|class|type)\s+([A-Za-z_$][A-Za-z0-9_$]*)/;

/**
 * Extracts all global type names (interfaces, type aliases, classes)
 * from TypeScript's own lib.*.d.ts files.
 *
 * These names represent types that exist in the global scope and can be
 * shadowed by Google API schema definitions within generated namespaces.
 * Includes ES built-ins, DOM types, Web Worker types, decorators, etc. —
 * because generated types are consumed in frontend projects where all of
 * these may be in scope.
 *
 * Implemented as a line-based text scan because TypeScript 7 (the native
 * compiler) no longer ships the JS compiler API (ts.createProgram et al.)
 * that the previous implementation used. Verified to produce the exact same
 * set of names as the AST-based implementation on TypeScript 6 lib files.
 */
export function extractTypescriptGlobalTypeNames(): Set<string> {
  const libraryDirectory = findTypescriptLibDirectory();

  const globalTypeNames = new Set<string>();
  for (const file of fs.readdirSync(libraryDirectory)) {
    if (!file.startsWith('lib.') || !file.endsWith('.d.ts')) {
      continue;
    }
    const contents = fs.readFileSync(path.join(libraryDirectory, file), 'utf8');
    for (const line of contents.split('\n')) {
      const match = TOP_LEVEL_TYPE_DECLARATION.exec(line);
      if (match) {
        globalTypeNames.add(match[1]);
      }
    }
  }
  return globalTypeNames;
}
