import * as fs from 'fs';
import * as path from 'path';
import * as ts from 'typescript';

/**
 * Dynamically extracts all global type names (interfaces, type aliases, classes)
 * from TypeScript's own lib.*.d.ts files.
 *
 * These names represent types that exist in the global scope and can be
 * shadowed by Google API schema definitions within generated namespaces.
 */
export function extractTypescriptGlobalTypeNames(): Set<string> {
  const typescriptDirectory = path.dirname(require.resolve('typescript'));
  const libraryFiles = fs
    .readdirSync(typescriptDirectory)
    .filter(
      (file: string) => file.startsWith('lib.') && file.endsWith('.d.ts'),
    );

  const globalTypeNames = new Set<string>();
  const program = ts.createProgram(
    libraryFiles.map((file: string) => path.join(typescriptDirectory, file)),
    {target: ts.ScriptTarget.ESNext, noLib: true},
  );

  for (const sourceFile of program.getSourceFiles()) {
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
