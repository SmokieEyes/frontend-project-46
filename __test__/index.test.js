import gendiff from '../src/index.js';
import resultJSON from '../__fixtures__/resultJSON.js';

test('JSON json test', () => {
  expect(gendiff('./__fixtures__/file1.json', './__fixtures__/file2.json')).toEqual(resultJSON);
});
