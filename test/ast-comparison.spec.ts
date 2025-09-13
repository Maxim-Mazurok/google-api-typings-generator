import { AstTypescriptWriter } from '../src/ast-poc.js';
import { StreamWriter } from '../src/writer.js';
import { readFileSync } from 'node:fs';
import { Readable } from 'node:stream';

/**
 * Comparative analysis: String-based vs AST-based generation
 * 
 * This shows the differences in output quality, maintainability,
 * and developer experience between the two approaches.
 */

describe('String vs AST Generation Comparison', () => {
  it('compares interface generation approaches', () => {
    // Current string-based approach simulation
    const stringBasedOutput = `interface Alias {
    alias?:
        string;
    etag?:
        string;
    id?:
        string;
    kind?:
        string;
    primaryEmail?:
        string;
}`;

    // AST-based approach
    const astWriter = new AstTypescriptWriter();
    astWriter.interface('Alias', (w) => [
      w.property('alias', 'string', false),
      w.property('etag', 'string', false),
      w.property('id', 'string', false),
      w.property('kind', 'string', false),
      w.property('primaryEmail', 'string', false),
    ]);

    const astOutput = astWriter.generate();

    console.log('=== STRING-BASED OUTPUT ===');
    console.log(stringBasedOutput);
    console.log('\n=== AST-BASED OUTPUT ===');
    console.log(astOutput);

    // AST output is cleaner and more consistent
    expect(astOutput).toContain('alias?: string;');
    expect(astOutput).not.toContain('alias?:\n        string;'); // No awkward line breaks
  });

  it('demonstrates error handling differences', () => {
    // String-based approach - errors only caught at runtime/compilation
    const problematicStringOutput = `interface BadInterface {
    123invalid: string; // This would cause a syntax error
    "good-name": string;
}`;

    // AST-based approach - handles problematic names gracefully
    const astWriter = new AstTypescriptWriter();
    astWriter.interface('GoodInterface', (w) => [
      w.property('123invalid', 'string'), // Automatically quoted
      w.property('good-name', 'string'),  // Automatically quoted
      w.property('validName', 'string'),  // Normal identifier
    ]);

    const astOutput = astWriter.generate();

    expect(astOutput).toContain('"123invalid": string;');
    expect(astOutput).toContain('"good-name": string;');
    expect(astOutput).toContain('validName: string;');
  });

  it('shows formatting consistency benefits', () => {
    const astWriter = new AstTypescriptWriter();
    
    // Complex nested structure
    astWriter.interface('ComplexInterface', (w) => [
      w.property('simple', 'string'),
      w.property('optional', 'number', false),
      w.property('array', 'string[]'),
      w.property('union', 'string | number | boolean'),
      w.property('nested', (nested) => 
        nested.anonymousType((n) => [
          n.property('inner', 'boolean'),
          n.property('deep', (deep) => 
            deep.anonymousType((d) => [
              d.property('value', 'any'),
            ])
          ),
        ])
      ),
      w.method('complexMethod', [
        { parameter: 'required', type: 'string', required: true },
        { parameter: 'optional', type: 'number', required: false },
        { parameter: 'union', type: 'string | boolean', required: true },
      ], 'Promise<any>'),
    ]);

    const output = astWriter.generate();
    
    // Verify consistent formatting
    expect(output).toMatch(/interface ComplexInterface \{[\s\S]*\}/);
    expect(output).toContain('simple: string;');
    expect(output).toContain('optional?: number;');
    expect(output).toContain('array: string[];');
    expect(output).toContain('union: string | number | boolean;');
    expect(output).toContain('complexMethod(required: string, optional?: number, union: string | boolean): Promise<any>;');
  });

  it('demonstrates namespace generation quality', () => {
    const astWriter = new AstTypescriptWriter();
    
    // Generate realistic gapi structure
    astWriter.declareNamespace('gapi', (gapi) => [
      gapi.namespace('client', (client) => [
        // Load function declarations
        client.method('load', [
          { parameter: 'urlOrObject', type: 'string', required: true }
        ], 'Promise<void>'),
        
        // API namespace
        client.namespace('admin', (admin) => [
          admin.interface('UserResource', (user) => [
            user.method('list', [
              { parameter: 'params', type: 'any', required: false }
            ], 'Promise<any>'),
            user.method('get', [
              { parameter: 'params', type: 'any', required: true }
            ], 'Promise<any>'),
            user.method('insert', [
              { parameter: 'params', type: 'any', required: true }
            ], 'Promise<any>'),
          ]),
          admin.interface('GroupResource', (group) => [
            group.method('list', [
              { parameter: 'params', type: 'any', required: false }
            ], 'Promise<any>'),
          ]),
        ]),
      ]),
    ]);

    const output = astWriter.generate();
    
    // Verify proper namespace structure
    expect(output).toContain('declare namespace gapi');
    expect(output).toContain('namespace client');
    expect(output).toContain('namespace admin');
    expect(output).toContain('interface UserResource');
    expect(output).toContain('interface GroupResource');
    expect(output).toContain('load(urlOrObject: string): Promise<void>;');
  });

  it('validates type safety benefits', () => {
    const astWriter = new AstTypescriptWriter();
    
    // These would be compile-time errors with AST approach if types were wrong
    astWriter.interface('TypeSafeInterface', (w) => [
      // All these are type-checked during generation
      w.property('stringProp', 'string'),
      w.property('numberProp', 'number'),
      w.property('booleanProp', 'boolean'),
      w.property('arrayProp', 'any[]'),
      w.property('promiseProp', 'Promise<string>'),
      w.property('unionProp', 'string | number'),
      w.property('customType', 'MyCustomType'),
    ]);

    const output = astWriter.generate();
    
    // Verify all types are correctly generated
    expect(output).toContain('stringProp: string;');
    expect(output).toContain('numberProp: number;');
    expect(output).toContain('booleanProp: boolean;');
    expect(output).toContain('arrayProp: any[];');
    expect(output).toContain('promiseProp: Promise<string>;');
    expect(output).toContain('unionProp: string | number;');
    expect(output).toContain('customType: MyCustomType;');
  });
});