import gendiff from '../src/index.js';
import stylishRef from '../__fixtures__/stylishRef.js';

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

test('Default Format yml test', () => {
  expect(gendiff('./__fixtures__/file1.yml', './__fixtures__/file2.yml')).toEqual(stylishRef);
});

test('Default Format json test', () => {
  expect(gendiff('./__fixtures__/file1.json', './__fixtures__/file2.json')).toEqual(stylishRef);
});
