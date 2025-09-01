#!/usr/bin/env npx tsx

/**
 * AST Generation POC Demonstration
 * 
 * This script demonstrates the capabilities of the AST-based TypeScript generation
 * approach compared to the current string-based method.
 */

import { AstTypescriptWriter } from './src/ast-poc.js';

console.log('🚀 TypeScript AST Generation POC Demonstration\n');

// Example 1: Basic Interface Generation
console.log('📋 Example 1: Basic Interface Generation');
console.log('=========================================\n');

const basicWriter = new AstTypescriptWriter();
basicWriter.interface('GoogleApiResponse', (w) => [
  w.property('kind', 'string'),
  w.property('etag', 'string', false),
  w.property('items', 'any[]', false),
  w.property('nextPageToken', 'string', false),
]);

console.log(basicWriter.generate());

// Example 2: Complex API Structure
console.log('\n📋 Example 2: Complete API Namespace Structure');
console.log('===============================================\n');

const complexWriter = new AstTypescriptWriter();
complexWriter.declareNamespace('gapi', (gapi) => [
  gapi.namespace('client', (client) => [
    // Load methods
    client.method('load', [
      { parameter: 'discoveryDoc', type: 'string', required: true }
    ], 'Promise<void>'),
    
    client.method('load', [
      { parameter: 'name', type: 'string', required: true },
      { parameter: 'version', type: 'string', required: true }
    ], 'Promise<void>'),

    // Drive API example
    client.namespace('drive', (drive) => [
      drive.interface('FileResource', (file) => [
        file.method('list', [
          { parameter: 'params', type: 'any', required: false }
        ], 'Promise<any>'),
        
        file.method('get', [
          { parameter: 'params', type: '{ fileId: string; alt?: string }', required: true }
        ], 'Promise<any>'),
        
        file.method('create', [
          { parameter: 'params', type: 'any', required: true }
        ], 'Promise<any>'),
        
        file.method('update', [
          { parameter: 'params', type: 'any', required: true }
        ], 'Promise<any>'),
        
        file.method('delete', [
          { parameter: 'params', type: '{ fileId: string }', required: true }
        ], 'Promise<any>'),
      ]),

      drive.interface('PermissionResource', (permission) => [
        permission.method('list', [
          { parameter: 'params', type: '{ fileId: string }', required: true }
        ], 'Promise<any>'),
        
        permission.method('create', [
          { parameter: 'params', type: 'any', required: true }
        ], 'Promise<any>'),
      ]),
    ]),

    // Gmail API example  
    client.namespace('gmail', (gmail) => [
      gmail.interface('MessageResource', (message) => [
        message.method('list', [
          { parameter: 'params', type: '{ userId: string; q?: string }', required: true }
        ], 'Promise<any>'),
        
        message.method('get', [
          { parameter: 'params', type: '{ userId: string; id: string }', required: true }
        ], 'Promise<any>'),
        
        message.method('send', [
          { parameter: 'params', type: 'any', required: true }
        ], 'Promise<any>'),
      ]),

      gmail.interface('LabelResource', (label) => [
        label.method('list', [
          { parameter: 'params', type: '{ userId: string }', required: true }
        ], 'Promise<any>'),
        
        label.method('create', [
          { parameter: 'params', type: 'any', required: true }
        ], 'Promise<any>'),
      ]),
    ]),
  ])
]);

console.log(complexWriter.generate());

// Example 3: Type System Demonstration
console.log('\n📋 Example 3: Advanced Type System Features');
console.log('==========================================\n');

const typesWriter = new AstTypescriptWriter();
typesWriter.interface('AdvancedTypes', (w) => [
  // Basic types
  w.property('stringType', 'string'),
  w.property('numberType', 'number'),
  w.property('booleanType', 'boolean'),
  w.property('anyType', 'any'),
  
  // Optional types
  w.property('optionalString', 'string', false),
  w.property('optionalNumber', 'number', false),
  
  // Array types
  w.property('stringArray', 'string[]'),
  w.property('numberArray', 'number[]'),
  w.property('anyArray', 'any[]'),
  
  // Union types
  w.property('stringOrNumber', 'string | number'),
  w.property('multiUnion', 'string | number | boolean'),
  
  // Promise types
  w.property('stringPromise', 'Promise<string>'),
  w.property('voidPromise', 'Promise<void>'),
  w.property('anyPromise', 'Promise<any>'),
  
  // Custom types
  w.property('customType', 'GoogleApiResponse'),
  w.property('googleClientType', 'gapi.client.Request<any>'),
  
  // Nested anonymous types
  w.property('nestedObject', (nested) => 
    nested.anonymousType((n) => [
      n.property('innerProp', 'string'),
      n.property('innerNumber', 'number'),
      n.property('deepNested', (deep) => 
        deep.anonymousType((d) => [
          d.property('value', 'any'),
          d.property('metadata', 'string', false),
        ])
      ),
    ])
  ),
  
  // Method signatures
  w.method('simpleMethod', [], 'void'),
  
  w.method('methodWithParams', [
    { parameter: 'required', type: 'string', required: true },
    { parameter: 'optional', type: 'number', required: false },
  ], 'string'),
  
  w.method('complexMethod', [
    { parameter: 'config', type: '{ apiKey: string; version?: string }', required: true },
    { parameter: 'callback', type: '(result: any) => void', required: false },
  ], 'Promise<GoogleApiResponse>'),
]);

console.log(typesWriter.generate());

// Example 4: Special Cases and Edge Conditions
console.log('\n📋 Example 4: Special Cases and Edge Conditions');
console.log('===============================================\n');

const specialWriter = new AstTypescriptWriter();
specialWriter.interface('SpecialCases', (w) => [
  // Properties with special characters (automatically quoted)
  w.property('normal-property', 'string'),
  w.property('123invalid', 'string'),
  w.property('property-with-dashes', 'string'),
  w.property('property.with.dots', 'string'),
  w.property('property with spaces', 'string'),
  
  // Valid identifiers (not quoted)
  w.property('validProperty', 'string'),
  w.property('camelCase', 'string'),
  w.property('snake_case', 'string'),
  w.property('$dollarSign', 'string'),
  w.property('_underscore', 'string'),
]);

console.log(specialWriter.generate());

console.log('\n✨ Benefits Summary:');
console.log('==================\n');
console.log('✅ Type Safety: All AST nodes are type-checked at compile time');
console.log('✅ Validation: Invalid TypeScript structures are caught early');
console.log('✅ Consistency: Generated code follows TypeScript standards');
console.log('✅ Maintainability: Easy to extend and modify');
console.log('✅ Future-Proof: Automatic support for new TypeScript features');
console.log('✅ Error Prevention: Syntax errors eliminated during generation');
console.log('✅ Better Debugging: AST nodes can be inspected and validated');
console.log('✅ Linting Support: Generated code can be analyzed before emission\n');

console.log('🎯 Ready for production implementation!');