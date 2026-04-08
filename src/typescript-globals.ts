import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import * as ts from 'typescript';

const require = createRequire(import.meta.url);

/**
 * Dynamically extracts all global type names (interfaces, type aliases, classes)
 * from TypeScript's own lib.*.d.ts files.
 *
 * These names represent types that exist in the global scope and can be
 * shadowed by Google API schema definitions within generated namespaces.
 * Includes ES built-ins, DOM types, Web Worker types, decorators, etc. —
 * because generated types are consumed in frontend projects where all of
 * these may be in scope.
 */
export function extractTypescriptGlobalTypeNames(): Set<string> {
  const typescriptDirectory = path.dirname(require.resolve('typescript'));
  const libraryFilePaths = fs
    .readdirSync(typescriptDirectory)
    .filter((file: string) => file.startsWith('lib.') && file.endsWith('.d.ts'))
    .map((file: string) => path.join(typescriptDirectory, file));

  const libraryFilePathSet = new Set(libraryFilePaths);

  const globalTypeNames = new Set<string>();
  const program = ts.createProgram(libraryFilePaths, {
    target: ts.ScriptTarget.ESNext,
    noLib: true,
  });

  for (const sourceFile of program.getSourceFiles()) {
    // Only process files we explicitly listed — skip resolved dependencies
    // like TypeScript's own index.d.ts (compiler API types)
    if (!libraryFilePathSet.has(sourceFile.fileName)) {
      continue;
    }

    ts.forEachChild(sourceFile, (node: ts.Node) => {
      if (
        (ts.isInterfaceDeclaration(node) ||
          ts.isTypeAliasDeclaration(node) ||
          ts.isClassDeclaration(node)) &&
        node.name
      ) {
        globalTypeNames.add(node.name.text);
      }
    });
  }
  return globalTypeNames;
}
