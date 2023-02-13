import { cwd } from 'node:process';
import { resolve } from 'node:path';
import { parsers } from './parsers.js';
import _ from 'lodash';

const getFilePath = (filepath) => resolve(cwd(), filepath);

const sortUnionKeys = (file1, file2) => _.sortBy(_.union(Object.keys(file1), Object.keys(file2)));

const getDiff = (file1, file2) => {  
  const samples = sortUnionKeys(file1, file2);
  const diff = samples.map((key) => {
    if (!Object.hasOwn(file1, key)) {
      return `   + ${key}:${file2[key]}`;
    } else if (!Object.hasOwn(file2, key)) {
      return `   - ${key}:${file1[key]}\n`;
    } else if (file1[key] !== file2[key]) {
      return `   - ${key}:${file1[key]}\n   + ${key}:${file2[key]}\n`;
    } else {
    return `     ${key}:${file1[key]}\n`
    }
  });
  return `{\n${diff.join('')}\n}`
  };

const gendiff = (filepath1, filepath2) => {
  const file1 = parsers(getFilePath(filepath1));
  const file2 = parsers(getFilePath(filepath2));
  return getDiff(file1, file2);
};

export default gendiff;
