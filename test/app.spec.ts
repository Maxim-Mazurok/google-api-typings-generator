import {formatPropertyName} from '../src/app.js';

describe('formatPropertyName', () => {
  it('returns simple identifiers as-is', () => {
    expect(formatPropertyName('name')).toBe('name');
    expect(formatPropertyName('camelCase')).toBe('camelCase');
    expect(formatPropertyName('PascalCase')).toBe('PascalCase');
    expect(formatPropertyName('_private')).toBe('_private');
    expect(formatPropertyName('$dollar')).toBe('$dollar');
    expect(formatPropertyName('abc123')).toBe('abc123');
    expect(formatPropertyName('_')).toBe('_');
    expect(formatPropertyName('$')).toBe('$');
  });

  it('quotes names with dots', () => {
    expect(formatPropertyName('row.values')).toBe('"row.values"');
  });

  it('quotes names with hyphens', () => {
    expect(formatPropertyName('kind-key')).toBe('"kind-key"');
  });

  it('quotes names with at signs', () => {
    expect(formatPropertyName('user@domain')).toBe('"user@domain"');
  });

  it('quotes names with question marks', () => {
    expect(formatPropertyName('embedded?Chart')).toBe('"embedded?Chart"');
  });

  it('quotes names starting with a digit', () => {
    expect(formatPropertyName('0day')).toBe('"0day"');
    expect(formatPropertyName('123')).toBe('"123"');
  });

  it('quotes names with spaces', () => {
    expect(formatPropertyName('has space')).toBe('"has space"');
  });

  it('quotes names with other special characters', () => {
    expect(formatPropertyName('foo/bar')).toBe('"foo/bar"');
    expect(formatPropertyName('foo:bar')).toBe('"foo:bar"');
    expect(formatPropertyName('foo+bar')).toBe('"foo+bar"');
    expect(formatPropertyName('foo*bar')).toBe('"foo*bar"');
  });

  it('quotes empty string', () => {
    expect(formatPropertyName('')).toBe('""');
  });

  it('escapes double quotes inside property names', () => {
    expect(formatPropertyName('say"hello"')).toBe('"say\\"hello\\""');
  });

  it('escapes backslashes inside property names', () => {
    expect(formatPropertyName('back\\slash')).toBe('"back\\\\slash"');
  });

  it('preserves index signatures as-is', () => {
    expect(formatPropertyName('[key: string]')).toBe('[key: string]');
  });
});
