import gendiff from '../src/index.js';
import stylishRef from '../__fixtures__/stylishRef.js';
import plainRef from '../__fixtures__/plainRef.js';
import jsonRef from '../__fixtures__/jsonRef.js';

test('stylish JSON test', () => {
  expect(gendiff('./__fixtures__/file1.json', './__fixtures__/file2.json', 'stylish')).toEqual(stylishRef);
});

test('stylish YML test', () => {
  expect(gendiff('./__fixtures__/file1.yml', './__fixtures__/file2.yml', 'stylish')).toEqual(stylishRef);
});

test('stylish YAML test', () => {
  expect(gendiff('./__fixtures__/file1.yaml', './__fixtures__/file2.yaml', 'stylish')).toEqual(stylishRef);
});

test('stylish JSON YML test', () => {
  expect(gendiff('./__fixtures__/file1.json', './__fixtures__/file2.yml', 'stylish')).toEqual(stylishRef);
});

test('plain JSON YML test', () => {
  expect(gendiff('./__fixtures__/file1.json', './__fixtures__/file2.yml', 'plain')).toEqual(plainRef);
});

test('plain JSON json test', () => {
  expect(gendiff('./__fixtures__/file1.json', './__fixtures__/file2.json', 'plain')).toEqual(plainRef);
});

test('plain YML yml test', () => {
  expect(gendiff('./__fixtures__/file1.yml', './__fixtures__/file2.yml', 'plain')).toEqual(plainRef);
});

test('plain YAML YAML test', () => {
  expect(gendiff('./__fixtures__/file1.yaml', './__fixtures__/file2.yaml', 'plain')).toEqual(plainRef);
});

test('JSON json test', () => {
  expect(gendiff('./__fixtures__/file1.yml', './__fixtures__/file2.yml', 'json')).toEqual(jsonRef);
});

test('JSON YML test', () => {
  expect(gendiff('./__fixtures__/file1.json', './__fixtures__/file2.yml', 'json')).toEqual(jsonRef);
});

test('Default Format yml test', () => {
  expect(gendiff('./__fixtures__/file1.yml', './__fixtures__/file2.yml')).toEqual(stylishRef);
});

test('Default Format json test', () => {
  expect(gendiff('./__fixtures__/file1.json', './__fixtures__/file2.json')).toEqual(stylishRef);
});
