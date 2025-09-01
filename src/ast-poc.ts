import * as ts from 'typescript';

/**
 * AST-based TypeScript code generator - POC for Google API Typings Generator
 * 
 * This is a proof of concept showing how to replace the current string-based
 * TypescriptTextWriter with proper AST generation using TypeScript Compiler API.
 * 
 * Benefits:
 * - Type safety during code generation
 * - Automatic syntax validation
 * - Better maintainability
 * - Support for linting generated code
 * - Consistency with TypeScript standards
 */

export interface AstWriterCallback {
  (writer: AstTypescriptWriter): ts.Node | ts.Node[];
}

export class AstTypescriptWriter {
  private nodes: ts.Node[] = [];
  private comments: Map<ts.Node, string> = new Map();

  /**
   * Create an interface declaration
   * Equivalent to current TypescriptTextWriter.interface()
   */
  interface(name: string, callback: AstWriterCallback): ts.InterfaceDeclaration {
    const writer = new AstTypescriptWriter();
    const result = callback(writer);
    
    const members = Array.isArray(result) ? result : [result];
    const typeElements = members.filter((node): node is ts.TypeElement => 
      ts.isPropertySignature(node) || ts.isMethodSignature(node)
    );

    const interfaceDecl = ts.factory.createInterfaceDeclaration(
      undefined, // modifiers
      ts.factory.createIdentifier(name),
      undefined, // type parameters
      undefined, // heritage clauses
      typeElements
    );

    this.nodes.push(interfaceDecl);
    return interfaceDecl;
  }

  /**
   * Create a property signature for interfaces
   * Equivalent to current TypescriptTextWriter.property()
   */
  property(
    name: string, 
    type: string | ts.TypeNode | AstWriterCallback, 
    required = true
  ): ts.PropertySignature {
    let typeNode: ts.TypeNode;

    if (typeof type === 'string') {
      typeNode = this.createTypeFromString(type);
    } else if (typeof type === 'function') {
      const writer = new AstTypescriptWriter();
      const result = type(writer);
      typeNode = Array.isArray(result) ? 
        ts.factory.createTypeLiteralNode(result as ts.TypeElement[]) :
        result as ts.TypeNode;
    } else {
      typeNode = type;
    }

    const propertyName = this.formatPropertyName(name);
    const questionToken = required ? undefined : ts.factory.createToken(ts.SyntaxKind.QuestionToken);

    return ts.factory.createPropertySignature(
      undefined, // modifiers
      propertyName,
      questionToken,
      typeNode
    );
  }

  /**
   * Create a method signature
   * Equivalent to current TypescriptTextWriter.method()
   */
  method(
    name: string,
    parameters: Array<{
      parameter: string;
      type: string | ts.TypeNode;
      required: boolean;
    }>,
    returnType: string | ts.TypeNode
  ): ts.MethodSignature {
    const params = parameters.map(param => {
      const paramType = typeof param.type === 'string' ? 
        this.createTypeFromString(param.type) : 
        param.type;
      
      const questionToken = param.required ? 
        undefined : 
        ts.factory.createToken(ts.SyntaxKind.QuestionToken);

      return ts.factory.createParameterDeclaration(
        undefined, // modifiers
        undefined, // dotDotDotToken
        ts.factory.createIdentifier(param.parameter),
        questionToken,
        paramType
      );
    });

    const retType = typeof returnType === 'string' ? 
      this.createTypeFromString(returnType) : 
      returnType;

    return ts.factory.createMethodSignature(
      undefined, // modifiers
      ts.factory.createIdentifier(name),
      undefined, // questionToken
      undefined, // typeParameters
      params,
      retType
    );
  }

  /**
   * Add JSDoc comment 
   * Equivalent to current TypescriptTextWriter.comment()
   */
  comment(text: string): void {
    if (!text || text.trim() === '') return;
    
    // Store comment for the next node that will be created
    // In a full implementation, this would be applied during code generation
    this.comments.set(this.nodes[this.nodes.length - 1] || ({} as ts.Node), text);
  }

  /**
   * Create an anonymous type (object literal type)
   * Equivalent to current TypescriptTextWriter.anonymousType()
   */
  anonymousType(callback: AstWriterCallback): ts.TypeLiteralNode {
    const writer = new AstTypescriptWriter();
    const result = callback(writer);
    const members = Array.isArray(result) ? result : [result];
    
    return ts.factory.createTypeLiteralNode(
      members.filter((node): node is ts.TypeElement => 
        ts.isPropertySignature(node) || ts.isMethodSignature(node)
      )
    );
  }

  /**
   * Create a namespace declaration
   */
  namespace(name: string, callback: AstWriterCallback): ts.ModuleDeclaration {
    const writer = new AstTypescriptWriter();
    const result = callback(writer);
    const statements = Array.isArray(result) ? result : [result];

    const moduleDecl = ts.factory.createModuleDeclaration(
      undefined, // no modifiers for nested namespaces
      ts.factory.createIdentifier(name),
      ts.factory.createModuleBlock(statements as ts.Statement[]),
      ts.NodeFlags.Namespace
    );

    this.nodes.push(moduleDecl);
    return moduleDecl;
  }

  /**
   * Create a declare namespace declaration
   */
  declareNamespace(name: string, callback: AstWriterCallback): ts.ModuleDeclaration {
    const writer = new AstTypescriptWriter();
    const result = callback(writer);
    const statements = Array.isArray(result) ? result : [result];

    const moduleDecl = ts.factory.createModuleDeclaration(
      [ts.factory.createModifier(ts.SyntaxKind.DeclareKeyword)],
      ts.factory.createIdentifier(name),
      ts.factory.createModuleBlock(statements as ts.Statement[]),
      ts.NodeFlags.Namespace
    );

    this.nodes.push(moduleDecl);
    return moduleDecl;
  }

  /**
   * Generate the final TypeScript source code
   */
  generate(): string {
    const sourceFile = ts.factory.createSourceFile(
      this.nodes as ts.Statement[],
      ts.factory.createToken(ts.SyntaxKind.EndOfFileToken),
      ts.NodeFlags.None
    );

    const printer = ts.createPrinter({
      newLine: ts.NewLineKind.LineFeed,
      removeComments: false,
    });

    let result = printer.printFile(sourceFile);

    // Apply comments (simplified approach for POC)
    for (const [node, comment] of this.comments) {
      const nodeText = printer.printNode(ts.EmitHint.Unspecified, node, sourceFile);
      const commentedText = `/** ${comment} */\n${nodeText}`;
      result = result.replace(nodeText, commentedText);
    }

    return result;
  }

  /**
   * Get all nodes for embedding in larger structures
   */
  getNodes(): ts.Node[] {
    return [...this.nodes];
  }

  // Helper methods

  private createTypeFromString(type: string): ts.TypeNode {
    switch (type) {
      case 'string':
        return ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
      case 'number':
        return ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);
      case 'boolean':
        return ts.factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword);
      case 'any':
        return ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
      case 'void':
        return ts.factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword);
      default:
        // Handle array types
        if (type.endsWith('[]')) {
          const elementType = this.createTypeFromString(type.slice(0, -2));
          return ts.factory.createArrayTypeNode(elementType);
        }
        
        // Handle union types
        if (type.includes('|')) {
          const types = type.split('|').map(t => this.createTypeFromString(t.trim()));
          return ts.factory.createUnionTypeNode(types);
        }
        
        // Handle Promise types
        if (type.startsWith('Promise<') && type.endsWith('>')) {
          const innerType = type.slice(8, -1);
          return ts.factory.createTypeReferenceNode(
            ts.factory.createIdentifier('Promise'),
            [this.createTypeFromString(innerType)]
          );
        }
        
        // Default to type reference
        return ts.factory.createTypeReferenceNode(ts.factory.createIdentifier(type));
    }
  }

  private formatPropertyName(name: string): ts.PropertyName {
    if (name.includes('-') || !this.isValidIdentifier(name)) {
      return ts.factory.createStringLiteral(name);
    }
    return ts.factory.createIdentifier(name);
  }

  private isValidIdentifier(name: string): boolean {
    return /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(name);
  }
}

/**
 * Demonstrates generating the same output as the current system
 * but using AST generation instead of string concatenation
 */
export function demonstratGapiClientGeneration(): string {
  const writer = new AstTypescriptWriter();

  // Generate structures similar to the current system's output
  // Based on the snapshot from test/restDocs/__snapshots__/test.spec.ts.snap

  writer.declareNamespace('gapi', (gapiWriter) => [
    gapiWriter.namespace('client', (clientWriter) => [
      // Generate admin namespace with interfaces
      clientWriter.namespace('admin', (adminWriter) => [
        // Alias interface (from the snapshot)
        adminWriter.interface('Alias', (interfaceWriter) => [
          interfaceWriter.property('alias', 'string', false),
          interfaceWriter.property('etag', 'string', false), 
          interfaceWriter.property('id', 'string', false),
          interfaceWriter.property('kind', 'string', false),
          interfaceWriter.property('primaryEmail', 'string', false),
        ]),

        // Aliases interface
        adminWriter.interface('Aliases', (interfaceWriter) => [
          interfaceWriter.property('aliases', 'any[]', false),
          interfaceWriter.property('etag', 'string', false),
          interfaceWriter.property('kind', 'string', false),
        ]),

        // Asp interface with JSDoc
        adminWriter.interface('Asp', (interfaceWriter) => {
          // Add comment for codeId property
          const codeIdProp = interfaceWriter.property('codeId', 'number', false);
          interfaceWriter.comment('The unique ID of the ASP.');
          
          const creationTimeProp = interfaceWriter.property('creationTime', 'string', false);
          interfaceWriter.comment('The time when the ASP was created. Expressed in [Unix time](https://en.wikipedia.org/wiki/Epoch_time) format.');
          
          return [
            codeIdProp,
            creationTimeProp,
            interfaceWriter.property('etag', 'string', false),
            interfaceWriter.property('kind', 'string', false),
            interfaceWriter.property('lastTimeUsed', 'string', false),
            interfaceWriter.property('name', 'string', false),
            interfaceWriter.property('userKey', 'string', false),
          ];
        }),
      ])
    ])
  ]);

  return writer.generate();
}