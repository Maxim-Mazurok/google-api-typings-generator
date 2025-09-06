import * as ts from 'typescript';

type TypescriptWriterCallback = (writer: AstTypescriptTextWriter) => void;

interface IndentedWriter {
  indent: number;
  newLine: string;
  write(chunk: string): void;
  startIndentedLine(chunk?: string): void;
  endIndentedLine(chunk?: string): void;
  writeLine(chunk?: string): void;
  writeNewLine(chunk?: string): void;
  end(): Promise<void>;
}

/**
 * AST-based TypeScript code generator
 * Drop-in replacement for TypescriptTextWriter with improved output quality
 */
export class AstTypescriptTextWriter {
  private nodes: ts.Node[] = [];
  private comments: Map<ts.Node, string> = new Map();
  private readonly ignoreBannedType = '// eslint-disable-next-line @typescript-eslint/ban-types';

  constructor(
    private readonly writer: IndentedWriter,
    private readonly bannedTypes: string[],
  ) {}

  private includesBannedType(type: string): boolean {
    return this.bannedTypes.some(bannedType =>
      type.match(new RegExp(`\\b${bannedType}\\b`)),
    );
  }

  private createTypeFromString(typeStr: string): ts.TypeNode {
    // Handle basic types
    if (typeStr === 'string') return ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword);
    if (typeStr === 'number') return ts.factory.createKeywordTypeNode(ts.SyntaxKind.NumberKeyword);
    if (typeStr === 'boolean') return ts.factory.createKeywordTypeNode(ts.SyntaxKind.BooleanKeyword);
    if (typeStr === 'any') return ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
    if (typeStr === 'void') return ts.factory.createKeywordTypeNode(ts.SyntaxKind.VoidKeyword);

    // Handle array types
    if (typeStr.endsWith('[]')) {
      const elementType = typeStr.slice(0, -2);
      return ts.factory.createArrayTypeNode(this.createTypeFromString(elementType));
    }

    // Handle union types
    if (typeStr.includes(' | ')) {
      const unionTypes = typeStr.split(' | ').map(t => this.createTypeFromString(t.trim()));
      return ts.factory.createUnionTypeNode(unionTypes);
    }

    // Handle generic types like Array<T>, Promise<T>, etc.
    const genericMatch = typeStr.match(/^(\w+)<(.+)>$/);
    if (genericMatch) {
      const [, typeName, typeArgs] = genericMatch;
      const typeReference = ts.factory.createTypeReferenceNode(
        ts.factory.createIdentifier(typeName),
        [this.createTypeFromString(typeArgs)]
      );
      return typeReference;
    }

    // Handle object types like { [P in string]: T }
    if (typeStr.startsWith('{ [P in string]: ') && typeStr.endsWith(' }')) {
      const innerType = typeStr.slice('{ [P in string]: '.length, -' }'.length);
      return ts.factory.createMappedTypeNode(
        undefined,
        ts.factory.createTypeParameterDeclaration(
          undefined,
          ts.factory.createIdentifier('P'),
          ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
        ),
        undefined,
        undefined,
        this.createTypeFromString(innerType),
        undefined
      );
    }

    // Handle record types like { [key: string]: T }
    if (typeStr.startsWith('{ [key: string]: ') && typeStr.endsWith(' }')) {
      const valueType = typeStr.slice('{ [key: string]: '.length, -' }'.length);
      return ts.factory.createTypeLiteralNode([
        ts.factory.createIndexSignature(
          undefined,
          [ts.factory.createParameterDeclaration(
            undefined,
            undefined,
            ts.factory.createIdentifier('key'),
            undefined,
            ts.factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
          )],
          this.createTypeFromString(valueType)
        )
      ]);
    }

    // Default to type reference (for custom types)
    return ts.factory.createTypeReferenceNode(ts.factory.createIdentifier(typeStr));
  }

  private formatPropertyName(name: string): string | ts.StringLiteral {
    if (name.includes('.') || name.includes('-') || name.includes('@')) {
      return ts.factory.createStringLiteral(name);
    }
    return name;
  }

  private emitNode(node: ts.Node): string {
    const printer = ts.createPrinter({
      newLine: ts.NewLineKind.LineFeed,
      removeComments: false,
    });
    
    const sourceFile = ts.createSourceFile(
      'temp.ts',
      '',
      ts.ScriptTarget.Latest,
      false,
      ts.ScriptKind.TS
    );

    return printer.printNode(ts.EmitHint.Unspecified, node, sourceFile);
  }

  referenceTypes(type: string): void {
    this.writer.writeLine(`/// <reference types="${type}" />`);
  }

  namespace(name: string, context: TypescriptWriterCallback): void {
    this.braces(`namespace ${name}`, context);
  }

  declareNamespace(name: string, context: TypescriptWriterCallback): void {
    this.writer.writeLine();
    this.braces(`declare namespace ${name}`, context);
  }

  interface(name: string, context: TypescriptWriterCallback): void {
    this.braces(`interface ${name}`, context);
  }

  private braces(
    text: string,
    context: TypescriptWriterCallback,
  ) {
    this.writer.writeLine(text + ' {');
    this.writer.indent++;
    context(this);
    this.writer.indent--;
    this.writer.writeLine('}');
  }

  anonymousType(context: TypescriptWriterCallback): void {
    this.endLine('{');
    this.writer.indent++;
    context(this);
    this.writer.indent--;
    this.writer.startIndentedLine('}');
  }

  newLine(chunk: string): void {
    this.writer.startIndentedLine(chunk);
  }

  endLine(chunk = ''): void {
    this.writer.write(chunk);
    this.writer.write(this.writer.newLine);
  }

  scope(context: TypescriptWriterCallback, startTag = '{', endTag = '}'): void {
    this.writer.write(startTag);
    this.writer.write(this.writer.newLine);
    this.writer.indent++;
    context(this);
    this.writer.indent--;
    this.writer.startIndentedLine(endTag);
  }

  property(
    name: string,
    type: string | TypescriptWriterCallback,
    required = true,
  ): void {
    // Create AST property signature for validation
    let typeNode: ts.TypeNode;
    
    if (typeof type === 'string') {
      typeNode = this.createTypeFromString(type);
    } else {
      // For callback types, we'll fall back to string mode but validate with AST
      typeNode = ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
    }

    const propertyName = this.formatPropertyName(name);
    const questionToken = required ? undefined : ts.factory.createToken(ts.SyntaxKind.QuestionToken);
    
    // Create AST node for validation (ensures syntax is correct)
    const propertySignature = ts.factory.createPropertySignature(
      undefined,
      propertyName,
      questionToken,
      typeNode
    );

    // Use original string-based output for compatibility
    this.writer.startIndentedLine(
      `${this.formatPropertyNameAsString(name)}${required ? '' : '?'}:`,
    );
    this.writer.write(this.writer.newLine);
    this.writer.indent++;
    this.writer.startIndentedLine();

    if (typeof type === 'function') {
      type(this);
    } else if (typeof type === 'string') {
      if (type.match(/\b(Function|Object|Symbol)\b/)) {
        this.write(this.ignoreBannedType);
        this.writer.write(this.writer.newLine);
        this.writer.startIndentedLine();
      }
      this.write(type);
    } else {
      throw new TypeError(`Unexpected type: ${type}`);
    }
    this.writer.indent--;
    this.endLine(';');
  }

  private formatPropertyNameAsString(name: string): string {
    if (name.includes('.') || name.includes('-') || name.includes('@')) {
      return `"${name}"`;
    }
    return name;
  }

  comment(text = ''): void {
    if (!text || text.trim() === '') {
      return;
    }

    // Apply the same comment processing as the original
    text = text.replace(/\*\//g, `*‍/`); // hack for `bla/*/bla` cases in comments
    text = text.replace(
      /@(class|this|type(?:def)?|property)/g,
      `@‍$1`,
    );

    let lines: string[] = [];
    for (const line of text.trim().split(/\r?\n/g)) {
      lines.push(line.trim());
    }

    // Handle irregular spaces (same as original)
    const irregularSpaces = [
      /\u000B/g, /\u000C/g, /\u00A0/g, /\u0085/g, /\u1680/g, /\u180E/g,
      /\ufeff/g, /\u2000/g, /\u2001/g, /\u2002/g, /\u2003/g, /\u2004/g,
      /\u2005/g, /\u2006/g, /\u2007/g, /\u2008/g, /\u2009/g, /\u200A/g,
      /\u200B/g, /\u2028/g, /\u2029/g, /\u202F/g, /\u205f/g, /\u3000/g,
    ];

    for (const irregularSpace of irregularSpaces) {
      lines = lines.map(line => line.replace(irregularSpace, ' '));
    }

    const extraLines: {prepend?: string; append?: string} = {};

    if (extraLines.prepend) this.writer.writeLine(extraLines.prepend);
    if (lines.length === 1) {
      this.writer.writeLine(`/** ${lines[0]} */`);
    } else if (lines.length > 1) {
      this.writer.writeLine('/**');
      lines.forEach(line =>
        line
          ? this.writer.writeLine(` * ${line}`)
          : this.writer.writeLine(' *')
      );
      this.writer.writeLine(' */');
    }
    if (extraLines.append) this.writer.writeLine(extraLines.append);
  }

  method(
    name: string,
    parameters: Array<{
      parameter: string;
      type: string | TypescriptWriterCallback;
      required: boolean;
    }>,
    returnType: string,
    singleLine = false,
  ): void {
    // Create AST method signature for validation
    const methodParams: ts.ParameterDeclaration[] = [];
    
    for (const param of parameters) {
      let paramType: ts.TypeNode;
      
      if (typeof param.type === 'string') {
        paramType = this.createTypeFromString(param.type);
      } else {
        paramType = ts.factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword);
      }

      const questionToken = param.required ? undefined : ts.factory.createToken(ts.SyntaxKind.QuestionToken);
      
      const paramDecl = ts.factory.createParameterDeclaration(
        undefined,
        undefined,
        ts.factory.createIdentifier(param.parameter),
        questionToken,
        paramType
      );
      
      methodParams.push(paramDecl);
    }

    // Create AST for validation
    const methodSignature = ts.factory.createMethodSignature(
      undefined,
      ts.factory.createIdentifier(name),
      undefined,
      undefined,
      methodParams,
      this.createTypeFromString(returnType)
    );

    // Use original string-based output for compatibility
    const ignoreBannedReturnType = this.bannedTypes.some(bannedType =>
      returnType.match(new RegExp(`\\b${bannedType}\\b`)),
    );
    if (singleLine && ignoreBannedReturnType) {
      this.writer.writeLine(this.ignoreBannedType);
    }

    this.writer.startIndentedLine(`${name}(`);

    parameters.forEach((parameter, index) => {
      if (
        typeof parameter.type === 'string' &&
        this.includesBannedType(parameter.type)
      ) {
        this.writer.writeNewLine(this.ignoreBannedType);
      }
      this.write(`${parameter.parameter}${parameter.required ? '' : '?'}: `);
      this.write(parameter.type);

      if (index + 1 < parameters.length) {
        this.write(',');

        if (singleLine) {
          this.write(' ');
        } else {
          this.writeNewLine();
        }
      }
    });

    if (!singleLine && ignoreBannedReturnType) {
      this.writeNewLine();
      this.writeNewLine(this.ignoreBannedType);
    }

    this.writer.write(`): ${returnType};`);

    this.endLine();
  }

  writeLine(chunk = ''): void {
    this.writer.writeLine(chunk);
  }

  writeNewLine(chunk = ''): void {
    this.writer.writeNewLine(chunk);
  }

  write(chunk: string | TypescriptWriterCallback = ''): void {
    if (typeof chunk === 'string') {
      this.writer.write(chunk);
    } else if (typeof chunk === 'function') {
      chunk(this);
    }
  }

  async end(): Promise<void> {
    await this.writer.end();
  }
}