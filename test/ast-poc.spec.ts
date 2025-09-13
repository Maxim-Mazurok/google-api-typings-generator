import { describe, it, expect } from 'vitest';
import { AstTypescriptWriter, demonstrateGapiClientGeneration } from '../src/ast-poc.js';

describe('AST-based TypeScript Generation POC', () => {
  describe('AstTypescriptWriter', () => {
    it('generates a simple interface', () => {
      const writer = new AstTypescriptWriter();
      
      writer.interface('TestInterface', (w) => [
        w.property('name', 'string'),
        w.property('age', 'number', false),
        w.property('isActive', 'boolean'),
      ]);

      const result = writer.generate();
      
      expect(result).toContain('interface TestInterface');
      expect(result).toContain('name: string;');
      expect(result).toContain('age?: number;');
      expect(result).toContain('isActive: boolean;');
    });

    it('handles property names with special characters', () => {
      const writer = new AstTypescriptWriter();
      
      writer.interface('TestInterface', (w) => [
        w.property('normal-name', 'string'),
        w.property('123invalid', 'string'),
        w.property('valid_name', 'string'),
      ]);

      const result = writer.generate();
      
      expect(result).toContain('"normal-name": string;');
      expect(result).toContain('"123invalid": string;');
      expect(result).toContain('valid_name: string;');
    });

    it('generates method signatures', () => {
      const writer = new AstTypescriptWriter();
      
      writer.interface('ApiResource', (w) => [
        w.method('get', [
          { parameter: 'id', type: 'string', required: true },
          { parameter: 'options', type: 'any', required: false },
        ], 'Promise<any>'),
        
        w.method('list', [], 'Promise<any[]>'),
      ]);

      const result = writer.generate();
      
      expect(result).toContain('get(id: string, options?: any): Promise<any>;');
      expect(result).toContain('list(): Promise<any[]>;');
    });

    it('generates nested anonymous types', () => {
      const writer = new AstTypescriptWriter();
      
      writer.interface('ComplexInterface', (w) => [
        w.property('nested', (nested) => 
          nested.anonymousType((n) => [
            n.property('innerProp', 'string'),
            n.property('innerNumber', 'number'),
          ])
        ),
      ]);

      const result = writer.generate();
      
      expect(result).toContain('nested: {');
      expect(result).toContain('innerProp: string;');
      expect(result).toContain('innerNumber: number;');
    });

    it('handles different type formats', () => {
      const writer = new AstTypescriptWriter();
      
      writer.interface('TypeTest', (w) => [
        w.property('stringArray', 'string[]'),
        w.property('union', 'string | number'),
        w.property('promise', 'Promise<void>'),
        w.property('any', 'any'),
        w.property('custom', 'CustomType'),
      ]);

      const result = writer.generate();
      
      expect(result).toContain('stringArray: string[];');
      expect(result).toContain('union: string | number;');
      expect(result).toContain('promise: Promise<void>;');
      expect(result).toContain('any: any;');
      expect(result).toContain('custom: CustomType;');
    });

    it('generates namespace structures', () => {
      const writer = new AstTypescriptWriter();
      
      writer.declareNamespace('gapi', (gapiWriter) => [
        gapiWriter.namespace('client', (clientWriter) => [
          clientWriter.interface('User', (w) => [
            w.property('id', 'string'),
            w.property('email', 'string'),
          ]),
        ])
      ]);

      const result = writer.generate();
      
      expect(result).toContain('declare namespace gapi');
      expect(result).toContain('namespace client');
      expect(result).toContain('interface User');
    });
  });

  describe('Google API generation demonstration', () => {
    it('generates gapi.client.admin structures', () => {
      const result = demonstrateGapiClientGeneration();
      
      // Check namespace structure
      expect(result).toContain('declare namespace gapi');
      expect(result).toContain('namespace client');
      expect(result).toContain('namespace admin');
      
      // Check interfaces
      expect(result).toContain('interface Alias');
      expect(result).toContain('interface Aliases');
      expect(result).toContain('interface Asp');
      
      // Check properties
      expect(result).toContain('alias?: string;');
      expect(result).toContain('etag?: string;');
      expect(result).toContain('aliases?: any[];');
      expect(result).toContain('codeId?: number;');
    });

    it('produces valid TypeScript syntax', () => {
      const result = demonstrateGapiClientGeneration();
      
      // Basic syntax validation
      expect(result).not.toContain('undefined');
      expect(result).not.toContain('[object Object]');
      
      // Check for proper semicolons and braces
      const braceCount = (result.match(/\{/g) || []).length;
      const closeBraceCount = (result.match(/\}/g) || []).length;
      expect(braceCount).toBe(closeBraceCount);
    });
  });

  describe('Comparison with current string-based approach', () => {
    it('demonstrates type safety benefits', () => {
      const writer = new AstTypescriptWriter();
      
      // This would be caught at compile time with AST approach
      // whereas string concatenation might produce invalid syntax
      writer.interface('SafeInterface', (w) => [
        w.property('validProperty', 'string'),
        // Invalid property names are handled gracefully
        w.property('123-invalid-but-handled', 'string'),
      ]);

      const result = writer.generate();
      expect(result).toContain('"123-invalid-but-handled": string;');
    });

    it('shows consistent formatting', () => {
      const writer = new AstTypescriptWriter();
      
      writer.interface('FormattedInterface', (w) => [
        w.property('prop1', 'string'),
        w.property('prop2', 'number', false),
        w.method('method1', [], 'void'),
      ]);

      const result = writer.generate();
      
      // Check that TypeScript's built-in formatter is applied
      expect(result).toMatch(/interface FormattedInterface \{\s+prop1: string;\s+prop2\?: number;\s+method1\(\): void;\s+\}/s);
    });
  });
});