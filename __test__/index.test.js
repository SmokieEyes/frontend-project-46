import gendiff from '../src/index.js';
import resultJSON from '../__fixtures__/resultJSON.js';
import resultYAML from '../__fixtures__/resultYAML.js';

test('JSON json test', () => {
  expect(gendiff('./__fixtures__/file1.json', './__fixtures__/file2.json')).toEqual(resultJSON);
});

test('YAML yaml test', () => {
  expect(gendiff('./__fixtures__/file1.yml', './__fixtures__/file2.yml')).toEqual(resultYAML);
});